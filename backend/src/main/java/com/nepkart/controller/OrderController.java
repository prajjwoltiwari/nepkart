package com.nepkart.controller;

import com.nepkart.dto.CustomerDTO;
import com.nepkart.dto.OrderRequestDTO;
import com.nepkart.model.Customer;
import com.nepkart.model.Order;
import com.nepkart.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    
    @Autowired
    private OrderService orderService;
    
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        try {
            List<Order> orders = orderService.getAllOrders();
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            System.err.println("Error fetching orders: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .header("X-Error-Message", e.getMessage())
                .build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/order-id/{orderId}")
    public ResponseEntity<Order> getOrderByOrderId(@PathVariable String orderId) {
        return orderService.getOrderByOrderId(orderId)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Order> createOrder(@Valid @RequestBody OrderRequestDTO orderRequest) {
        try {
            CustomerDTO customerDTO = orderRequest.getCustomer();
            Customer customer = new Customer(
                customerDTO.getFirstName(),
                customerDTO.getLastName(),
                customerDTO.getEmail(),
                customerDTO.getPhone(),
                customerDTO.getAddress(),
                customerDTO.getCity(),
                customerDTO.getState(),
                customerDTO.getZipCode()
            );
            
            Order order = orderService.createOrder(customer, orderRequest.getProductQuantities());
            return ResponseEntity.status(HttpStatus.CREATED).body(order);
        } catch (RuntimeException e) {
            // Log the error for debugging
            System.err.println("Error creating order: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .header("X-Error-Message", e.getMessage())
                .build();
        }
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, 
                                                    @RequestBody Map<String, String> statusMap) {
        try {
            Order.OrderStatus status = Order.OrderStatus.valueOf(statusMap.get("status"));
            Order order = orderService.updateOrderStatus(id, status);
            return ResponseEntity.ok(order);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        try {
            orderService.deleteOrder(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
