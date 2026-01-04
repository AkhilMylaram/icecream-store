package com.icecream.auth.service;

import com.icecream.auth.dto.AuthResponse;
import com.icecream.auth.dto.LoginRequest;
import com.icecream.auth.dto.RefreshTokenRequest;
import com.icecream.auth.dto.SignupRequest;
import com.icecream.auth.entity.RefreshToken;
import com.icecream.auth.entity.User;
import com.icecream.auth.repository.RefreshTokenRepository;
import com.icecream.auth.repository.UserRepository;
import com.icecream.auth.security.JwtService;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Value("${application.security.jwt.refresh-token.expiration}")
    private long refreshExpiration;

    @Transactional
    public AuthResponse signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        var user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("USER")
                .active(true)
                .build();
        var savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(savedUser);
        var refreshToken = createRefreshToken(savedUser);
        return AuthResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken.getToken())
                .build();
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = createRefreshToken(user);
        return AuthResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken.getToken())
                .build();
    }

    private RefreshToken createRefreshToken(User user) {
        if (refreshTokenRepository.findByUser(user).isPresent()) {
            refreshTokenRepository.deleteByUser(user);
        }
        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .token(UUID.randomUUID().toString())
                .expiresAt(Instant.now().plusMillis(refreshExpiration))
                .revoked(false)
                .build();
        return refreshTokenRepository.save(refreshToken);
    }

    public AuthResponse refreshToken(RefreshTokenRequest request) {
        String requestRefreshToken = request.getRefreshToken();
        return refreshTokenRepository.findByToken(requestRefreshToken)
                .filter(token -> !token.isRevoked())
                .filter(token -> token.getExpiresAt().isAfter(Instant.now()))
                .map(refreshToken -> {
                    var user = refreshToken.getUser();
                    var accessToken = jwtService.generateToken(user);
                    return AuthResponse.builder()
                            .accessToken(accessToken)
                            .refreshToken(requestRefreshToken)
                            .build();
                })
                .orElseThrow(() -> new RuntimeException("Refresh token is not in database or expired!"));
    }

    @Transactional
    public void logout(String refreshToken) {
        var token = refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Refresh token not found"));
        token.setRevoked(true);
        refreshTokenRepository.save(token);
    }

    public boolean validateToken(String token) {
        // Validation logic - extract username and check
        // In a real microservice receiving just a token, we might decode it.
        // For now, this is simple.
        try {
            String username = jwtService.extractUsername(token);
            // Optionally check validity against DB or just signature
            return username != null && jwtService.isTokenValid(token, User.builder().email(username).build()); // Simplified
                                                                                                                // user
                                                                                                                // details
        } catch (Exception e) {
            return false;
        }
    }
}
