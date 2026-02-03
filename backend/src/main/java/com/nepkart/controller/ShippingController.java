package com.nepkart.controller;

import com.nepkart.service.ShippingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/shipping")
public class ShippingController {
    
    @Autowired
    private ShippingService shippingService;
    
    @PostMapping("/calculate")
    public ResponseEntity<Map<String, BigDecimal>> calculateShipping(@RequestBody List<Map<String, Object>> cartItems) {
        BigDecimal shippingCost = shippingService.calculateShippingCost(cartItems);
        return ResponseEntity.ok(Map.of("shippingCost", shippingCost));
    }
}
