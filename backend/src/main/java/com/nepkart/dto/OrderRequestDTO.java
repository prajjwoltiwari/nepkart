package com.nepkart.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import java.util.Map;

public class OrderRequestDTO {
    
    @Valid
    private CustomerDTO customer;
    
    @NotEmpty(message = "Product quantities are required")
    private Map<Long, Integer> productQuantities;
    
    public CustomerDTO getCustomer() {
        return customer;
    }
    
    public void setCustomer(CustomerDTO customer) {
        this.customer = customer;
    }
    
    public Map<Long, Integer> getProductQuantities() {
        return productQuantities;
    }
    
    public void setProductQuantities(Map<Long, Integer> productQuantities) {
        this.productQuantities = productQuantities;
    }
}
