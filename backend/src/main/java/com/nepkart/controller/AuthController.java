package com.nepkart.controller;

import com.nepkart.dto.LoginRequestDTO;
import com.nepkart.service.AuthService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody LoginRequestDTO loginRequest,
                                                      HttpSession session) {
        System.out.println("Login attempt - Username: " + loginRequest.getUsername());
        System.out.println("Login attempt - Password provided: " + (loginRequest.getPassword() != null && !loginRequest.getPassword().isEmpty()));
        
        if (authService.authenticate(loginRequest.getUsername(), loginRequest.getPassword())) {
            // Create session
            session.setAttribute("admin", true);
            session.setAttribute("username", loginRequest.getUsername());
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Login successful");
            response.put("sessionId", session.getId());
            System.out.println("Login successful for user: " + loginRequest.getUsername());
            return ResponseEntity.ok(response);
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Invalid username or password");
            System.out.println("Login failed for user: " + loginRequest.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
    
    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout(HttpSession session) {
        session.invalidate();
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Logged out successfully");
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/check")
    public ResponseEntity<Map<String, Object>> checkAuth(HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        Boolean isAdmin = (Boolean) session.getAttribute("admin");
        if (isAdmin != null && isAdmin) {
            response.put("authenticated", true);
            response.put("username", session.getAttribute("username"));
        } else {
            response.put("authenticated", false);
        }
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "ok");
        response.put("message", "Auth service is running");
        return ResponseEntity.ok(response);
    }
}
