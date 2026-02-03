package com.nepkart.controller;

import com.nepkart.service.TaxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/tax")
public class TaxController {

    @Autowired
    private TaxService taxService;

    @GetMapping("/rate")
    public ResponseEntity<Map<String, BigDecimal>> getTaxRate(
            @RequestParam(required = false) String zip,
            @RequestParam(required = false) String state) {
        BigDecimal rate;
        // If state is provided, use it directly (more accurate)
        if (state != null && !state.trim().isEmpty()) {
            rate = taxService.getTaxRateForState(state);
        } else if (zip != null && !zip.trim().isEmpty()) {
            rate = taxService.getTaxRateForZip(zip);
        } else {
            rate = BigDecimal.ZERO;
        }
        return ResponseEntity.ok(Map.of("rate", rate));
    }
}

