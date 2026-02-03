package com.nepkart.service;

import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    // Hardcoded admin credentials (in production, use proper authentication)
    private static final String ADMIN_USERNAME = "admin";
    private static final String ADMIN_PASSWORD = "nepkart2026";
    
    public boolean authenticate(String username, String password) {
        if (username == null || password == null) {
            return false;
        }
        // Trim whitespace and compare
        return ADMIN_USERNAME.equals(username.trim()) && ADMIN_PASSWORD.equals(password.trim());
    }
    
    public boolean isValidSession(String sessionToken) {
        // Simple session validation - in production, use proper session management
        return "admin_session".equals(sessionToken);
    }
}
