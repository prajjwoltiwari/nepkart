package com.nepkart.service;

import com.nepkart.model.*;
import com.nepkart.repository.CustomerRepository;
import com.nepkart.repository.OrderRepository;
import com.nepkart.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private CustomerRepository customerRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private ProductService productService;
    
    @Autowired
    private ShippingService shippingService;

    @Autowired
    private TaxService taxService;
    
    public List<Order> getAllOrders() {
        try {
            return orderRepository.findAll();
        } catch (Exception e) {
            System.err.println("Error in getAllOrders: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to retrieve orders: " + e.getMessage(), e);
        }
    }
    
    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }
    
    public Optional<Order> getOrderByOrderId(String orderId) {
        return orderRepository.findByOrderId(orderId);
    }
    
    public Order createOrder(Customer customer, Map<Long, Integer> productQuantities) {
        // Create or find customer
        Customer existingCustomer = customerRepository.findByEmail(customer.getEmail())
            .orElse(customer);
        
        if (existingCustomer.getId() == null) {
            existingCustomer = customerRepository.save(existingCustomer);
        }
        
        // Generate unique order ID
        String orderId = "NEP-" + System.currentTimeMillis();
        
        // Create order
        Order order = new Order(orderId, existingCustomer);
        
        // Add order items and decrement stock
        BigDecimal subtotal = BigDecimal.ZERO;
        for (Map.Entry<Long, Integer> entry : productQuantities.entrySet()) {
            Long productId = entry.getKey();
            Integer quantity = entry.getValue();
            
            Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));
            
            if (product.getStock() < quantity) {
                throw new RuntimeException("Insufficient stock for product: " + product.getName() + 
                    ". Available: " + product.getStock() + ", Requested: " + quantity);
            }
            
            OrderItem orderItem = new OrderItem(order, product, quantity);
            order.addOrderItem(orderItem);
            
            subtotal = subtotal.add(product.getPrice().multiply(BigDecimal.valueOf(quantity)));
            
            // Decrement stock immediately
            productService.decrementStock(productId, quantity);
        }
        
        // Calculate shipping
        List<Product> products = productQuantities.keySet().stream()
            .map(id -> productRepository.findById(id).orElse(null))
            .filter(p -> p != null)
            .toList();
        
        BigDecimal shippingCost = shippingService.calculateShippingCostByProducts(products, productQuantities);
        BigDecimal tax = taxService.calculateTax(subtotal, customer.getZipCode());
        
        order.setSubtotal(subtotal);
        order.setShippingCost(shippingCost);
        order.setTax(tax);
        order.calculateTotal();
        order.setStatus(Order.OrderStatus.RECEIVED); // New orders start as RECEIVED
        
        return orderRepository.save(order);
    }
    
    public Order updateOrderStatus(Long id, Order.OrderStatus status) {
        Order order = orderRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        
        order.setStatus(status);
        return orderRepository.save(order);
    }
    
    public void deleteOrder(Long id) {
        Order order = orderRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        
        // OrderItems will be deleted automatically due to cascade
        orderRepository.delete(order);
    }
}
