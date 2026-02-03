package com.nepkart.model;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class OrderStatusConverter implements AttributeConverter<Order.OrderStatus, String> {

    @Override
    public String convertToDatabaseColumn(Order.OrderStatus status) {
        if (status == null) {
            return "RECEIVED";
        }
        return status.name();
    }

    @Override
    public Order.OrderStatus convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty()) {
            return Order.OrderStatus.RECEIVED;
        }
        
        try {
            return Order.OrderStatus.valueOf(dbData);
        } catch (IllegalArgumentException e) {
            // Handle old status values by mapping them to new ones
            return switch (dbData.toUpperCase()) {
                case "PENDING" -> Order.OrderStatus.RECEIVED;
                case "PROCESSING" -> Order.OrderStatus.IN_PROGRESS;
                case "DELIVERED" -> Order.OrderStatus.SHIPPED;
                case "CANCELLED" -> Order.OrderStatus.RECEIVED;
                default -> Order.OrderStatus.RECEIVED; // Default fallback
            };
        }
    }
}
