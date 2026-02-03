package com.nepkart.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    @NotBlank(message = "SKU is required")
    private String sku;
    
    @Column(nullable = false)
    @NotBlank(message = "Product name is required")
    private String name;
    
    @Column(nullable = false)
    @NotBlank(message = "Category is required")
    private String category; // Food, Clothing, Decor
    
    @Column(nullable = false, precision = 10, scale = 2)
    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    private BigDecimal price;
    
    @Column(nullable = false)
    @NotNull(message = "Stock is required")
    @Min(value = 0, message = "Stock cannot be negative")
    private Integer stock;
    
    @Column(name = "low_stock_threshold", nullable = false)
    @NotNull(message = "Low stock threshold is required")
    @Min(value = 0, message = "Low stock threshold cannot be negative")
    private Integer lowStockThreshold;
    
    @Column(nullable = false, precision = 5, scale = 2)
    @NotNull(message = "Weight is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Weight must be greater than 0")
    private BigDecimal weight; // in kg
    
    @Column(nullable = false)
    @NotBlank(message = "Origin is required")
    private String origin;
    
    @Column(length = 1000)
    private String description;
    
    @Column(name = "image_url", columnDefinition = "TEXT")
    private String imageUrl;
    
    // Constructors
    public Product() {
    }
    
    public Product(String sku, String name, String category, BigDecimal price, 
                   Integer stock, Integer lowStockThreshold, BigDecimal weight, String origin) {
        this.sku = sku;
        this.name = name;
        this.category = category;
        this.price = price;
        this.stock = stock;
        this.lowStockThreshold = lowStockThreshold;
        this.weight = weight;
        this.origin = origin;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getSku() {
        return sku;
    }
    
    public void setSku(String sku) {
        this.sku = sku;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public BigDecimal getPrice() {
        return price;
    }
    
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    
    public Integer getStock() {
        return stock;
    }
    
    public void setStock(Integer stock) {
        this.stock = stock;
    }
    
    public Integer getLowStockThreshold() {
        return lowStockThreshold;
    }
    
    public void setLowStockThreshold(Integer lowStockThreshold) {
        this.lowStockThreshold = lowStockThreshold;
    }
    
    public BigDecimal getWeight() {
        return weight;
    }
    
    public void setWeight(BigDecimal weight) {
        this.weight = weight;
    }
    
    public String getOrigin() {
        return origin;
    }
    
    public void setOrigin(String origin) {
        this.origin = origin;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    
    // Business Logic Methods
    public boolean isOutOfStock() {
        return stock == 0;
    }
    
    public boolean isLowStock() {
        return stock > 0 && stock <= lowStockThreshold;
    }
    
    public void decrementStock(int quantity) {
        if (this.stock >= quantity) {
            this.stock -= quantity;
        } else {
            throw new IllegalArgumentException("Insufficient stock. Available: " + this.stock);
        }
    }
}
