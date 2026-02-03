package com.nepkart.service;

import com.nepkart.model.Product;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
public class ShippingService {
    
    // Weight-based shipping calculation
    public BigDecimal calculateShippingCost(List<Map<String, Object>> cartItems) {
        BigDecimal totalWeight = BigDecimal.ZERO;
        
        for (Map<String, Object> item : cartItems) {
            Integer quantity = (Integer) item.get("quantity");
            BigDecimal weight = (BigDecimal) item.get("weight");
            
            if (weight != null && quantity != null) {
                totalWeight = totalWeight.add(weight.multiply(BigDecimal.valueOf(quantity)));
            } else {
                // Default weight if not specified (0.5 kg)
                totalWeight = totalWeight.add(BigDecimal.valueOf(0.5).multiply(BigDecimal.valueOf(quantity)));
            }
        }
        
        // Shipping tiers based on weight
        if (totalWeight.compareTo(BigDecimal.valueOf(1)) < 0) {
            return BigDecimal.valueOf(5.99);
        } else if (totalWeight.compareTo(BigDecimal.valueOf(5)) < 0) {
            return BigDecimal.valueOf(12.99);
        } else if (totalWeight.compareTo(BigDecimal.valueOf(10)) < 0) {
            return BigDecimal.valueOf(19.99);
        } else {
            return BigDecimal.valueOf(29.99);
        }
    }
    
    public BigDecimal calculateShippingCostByProducts(List<Product> products, Map<Long, Integer> quantities) {
        BigDecimal totalWeight = BigDecimal.ZERO;
        
        for (Product product : products) {
            Integer quantity = quantities.get(product.getId());
            if (quantity != null && product.getWeight() != null) {
                totalWeight = totalWeight.add(
                    product.getWeight().multiply(BigDecimal.valueOf(quantity))
                );
            }
        }
        
        // Shipping tiers based on weight
        if (totalWeight.compareTo(BigDecimal.valueOf(1)) < 0) {
            return BigDecimal.valueOf(5.99);
        } else if (totalWeight.compareTo(BigDecimal.valueOf(5)) < 0) {
            return BigDecimal.valueOf(12.99);
        } else if (totalWeight.compareTo(BigDecimal.valueOf(10)) < 0) {
            return BigDecimal.valueOf(19.99);
        } else {
            return BigDecimal.valueOf(29.99);
        }
    }
}
