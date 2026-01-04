package com.icecream.api.controller;

import com.icecream.api.dto.OrderDto;
import com.icecream.api.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<List<OrderDto>> getOrdersByUser(@RequestParam String userEmail) {
        return ResponseEntity.ok(orderService.getOrdersByUser(userEmail));
    }

    @PostMapping
    public ResponseEntity<OrderDto> createOrder(@RequestParam String userEmail,
                                               @RequestBody List<Long> productIds) {
        // In a real implementation, we would calculate the total based on the products
        // For now, we'll use a placeholder total
        return ResponseEntity.ok(orderService.createOrder(userEmail, productIds, java.math.BigDecimal.valueOf(0)));
    }
}