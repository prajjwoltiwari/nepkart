package com.nepkart.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Order {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    @NotBlank(message = "Order ID is required")
    private String orderId;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id", nullable = false)
    @NotNull(message = "Customer is required")
    @JsonIgnoreProperties({"orders"}) // Prevent circular reference
    private Customer customer;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<OrderItem> orderItems = new ArrayList<>();
    
    @Column(nullable = false, precision = 10, scale = 2)
    @NotNull(message = "Subtotal is required")
    @DecimalMin(value = "0.0", message = "Subtotal cannot be negative")
    private BigDecimal subtotal;
    
    @Column(nullable = false, precision = 10, scale = 2)
    @NotNull(message = "Shipping cost is required")
    @DecimalMin(value = "0.0", message = "Shipping cost cannot be negative")
    private BigDecimal shippingCost;

    @Column(nullable = false, precision = 10, scale = 2)
    @NotNull(message = "Tax is required")
    @DecimalMin(value = "0.0", message = "Tax cannot be negative")
    private BigDecimal tax = BigDecimal.ZERO;
    
    @Column(nullable = false, precision = 10, scale = 2)
    @NotNull(message = "Total is required")
    @DecimalMin(value = "0.0", message = "Total cannot be negative")
    private BigDecimal total;
    
    @Column(name = "order_date", nullable = false)
    private LocalDateTime orderDate;
    
    @Column(name = "status", nullable = false)
    private OrderStatus status;
    
    // Constructors
    public Order() {
        this.orderDate = LocalDateTime.now();
        this.status = OrderStatus.RECEIVED;
    }
    
    public Order(String orderId, Customer customer) {
        this.orderId = orderId;
        this.customer = customer;
        this.orderDate = LocalDateTime.now();
        this.status = OrderStatus.RECEIVED;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getOrderId() {
        return orderId;
    }
    
    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }
    
    public Customer getCustomer() {
        return customer;
    }
    
    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
    
    public List<OrderItem> getOrderItems() {
        return orderItems;
    }
    
    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }
    
    public void addOrderItem(OrderItem orderItem) {
        orderItems.add(orderItem);
        orderItem.setOrder(this);
    }
    
    public BigDecimal getSubtotal() {
        return subtotal;
    }
    
    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }
    
    public BigDecimal getShippingCost() {
        return shippingCost;
    }
    
    public void setShippingCost(BigDecimal shippingCost) {
        this.shippingCost = shippingCost;
    }

    public BigDecimal getTax() {
        return tax;
    }

    public void setTax(BigDecimal tax) {
        this.tax = tax;
    }
    
    public BigDecimal getTotal() {
        return total;
    }
    
    public void setTotal(BigDecimal total) {
        this.total = total;
    }
    
    public LocalDateTime getOrderDate() {
        return orderDate;
    }
    
    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }
    
    public OrderStatus getStatus() {
        return status;
    }
    
    public void setStatus(OrderStatus status) {
        this.status = status;
    }
    
    // Business Logic
    public void calculateTotal() {
        this.subtotal = orderItems.stream()
            .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        if (this.tax == null) {
            this.tax = BigDecimal.ZERO;
        }
        this.total = this.subtotal.add(this.shippingCost).add(this.tax);
    }
    
    public enum OrderStatus {
        RECEIVED,      // Order received from customer
        IN_PROGRESS,   // Order being processed/prepared
        SHIPPED        // Order has been shipped
    }
}
