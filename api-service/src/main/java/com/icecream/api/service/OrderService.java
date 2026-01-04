package com.icecream.api.service;

import com.icecream.api.dto.OrderDto;
import com.icecream.api.entity.Order;
import com.icecream.api.entity.OrderStatus;
import com.icecream.api.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public List<OrderDto> getOrdersByUser(String userEmail) {
        return orderRepository.findByUserEmail(userEmail).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public OrderDto createOrder(String userEmail, List<Long> productIds, BigDecimal total) {
        Order order = Order.builder()
                .userEmail(userEmail)
                .total(total)
                .status(OrderStatus.PENDING)
                .productIds(productIds)
                .build();
        Order savedOrder = orderRepository.save(order);
        return toDto(savedOrder);
    }

    private OrderDto toDto(Order order) {
        return OrderDto.builder()
                .id(order.getId())
                .userEmail(order.getUserEmail())
                .total(order.getTotal())
                .status(order.getStatus().name())
                .createdAt(order.getCreatedAt())
                .productIds(order.getProductIds())
                .build();
    }
}