package com.icecream.auth.controller;

import com.icecream.auth.service.AuthService;
// Import DTOs from Service or move them to dto package? 
// For simplicity I kept DTOs in Service file but they are not public there.
// I should have put them in separate files or made them public static.
// Let's assume I need to refactor AuthService to export DTOs or create them here.

// Wait, I declared them as package-private class in AuthService.java which is bad for Controller.
// I will create DTOs properly now.

import com.icecream.auth.dto.AuthResponse;
import com.icecream.auth.dto.LoginRequest;
import com.icecream.auth.dto.RefreshTokenRequest;
import com.icecream.auth.dto.SignupRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody SignupRequest request) {
        return ResponseEntity.ok(authService.signup(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@RequestBody RefreshTokenRequest request) {
        return ResponseEntity.ok(authService.refreshToken(request));
    }

    @GetMapping("/validate")
    public ResponseEntity<Boolean> validate(@RequestParam String token) {
        return ResponseEntity.ok(authService.validateToken(token));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestBody RefreshTokenRequest request) {
        authService.logout(request.getRefreshToken());
        return ResponseEntity.ok().build();
    }
}
