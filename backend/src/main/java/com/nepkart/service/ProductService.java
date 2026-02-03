package com.nepkart.service;

import com.nepkart.model.Product;
import com.nepkart.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }
    
    public Optional<Product> getProductBySku(String sku) {
        return productRepository.findBySku(sku);
    }
    
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }
    
    public List<Product> searchProducts(String searchTerm) {
        return productRepository.searchProducts(searchTerm);
    }
    
    public List<Product> getLowStockProducts() {
        return productRepository.findLowStockProducts();
    }
    
    public List<Product> getOutOfStockProducts() {
        return productRepository.findOutOfStockProducts();
    }
    
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }
    
    public Product updateProduct(Long id, Product productDetails) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        
        product.setName(productDetails.getName());
        product.setCategory(productDetails.getCategory());
        product.setPrice(productDetails.getPrice());
        product.setStock(productDetails.getStock());
        product.setLowStockThreshold(productDetails.getLowStockThreshold());
        product.setWeight(productDetails.getWeight());
        product.setOrigin(productDetails.getOrigin());
        product.setDescription(productDetails.getDescription());
        product.setImageUrl(productDetails.getImageUrl());
        
        return productRepository.save(product);
    }
    
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
    
    public void decrementStock(Long productId, int quantity) {
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));
        
        product.decrementStock(quantity);
        productRepository.save(product);
    }
}
