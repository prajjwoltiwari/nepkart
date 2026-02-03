package com.nepkart.service;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.Map;

@Service
public class TaxService {

    // 2026 Combined State & Local Sales Tax Rates (as of January 1, 2026)
    // Source: 2026 Sales Tax Rates - Sales Taxes by State.csv
    private static final Map<String, BigDecimal> STATE_RATES = new HashMap<>();
    
    static {
        // Initialize all 50 states + DC with 2026 combined state & local sales tax rates
        STATE_RATES.put("AL", new BigDecimal("0.0946")); // Alabama - 9.46%
        STATE_RATES.put("AK", new BigDecimal("0.0182")); // Alaska - 1.82%
        STATE_RATES.put("AZ", new BigDecimal("0.0852")); // Arizona - 8.52%
        STATE_RATES.put("AR", new BigDecimal("0.0946")); // Arkansas - 9.46%
        STATE_RATES.put("CA", new BigDecimal("0.0899")); // California - 8.99%
        STATE_RATES.put("CO", new BigDecimal("0.0789")); // Colorado - 7.89%
        STATE_RATES.put("CT", new BigDecimal("0.0635")); // Connecticut - 6.35%
        STATE_RATES.put("DE", new BigDecimal("0.0000")); // Delaware - 0.00%
        STATE_RATES.put("FL", new BigDecimal("0.0698")); // Florida - 6.98%
        STATE_RATES.put("GA", new BigDecimal("0.0749")); // Georgia - 7.49%
        STATE_RATES.put("HI", new BigDecimal("0.0450")); // Hawaii - 4.50%
        STATE_RATES.put("ID", new BigDecimal("0.0603")); // Idaho - 6.03%
        STATE_RATES.put("IL", new BigDecimal("0.0896")); // Illinois - 8.96%
        STATE_RATES.put("IN", new BigDecimal("0.0700")); // Indiana - 7.00%
        STATE_RATES.put("IA", new BigDecimal("0.0694")); // Iowa - 6.94%
        STATE_RATES.put("KS", new BigDecimal("0.0869")); // Kansas - 8.69%
        STATE_RATES.put("KY", new BigDecimal("0.0600")); // Kentucky - 6.00%
        STATE_RATES.put("LA", new BigDecimal("0.1011")); // Louisiana - 10.11%
        STATE_RATES.put("ME", new BigDecimal("0.0550")); // Maine - 5.50%
        STATE_RATES.put("MD", new BigDecimal("0.0600")); // Maryland - 6.00%
        STATE_RATES.put("MA", new BigDecimal("0.0625")); // Massachusetts - 6.25%
        STATE_RATES.put("MI", new BigDecimal("0.0600")); // Michigan - 6.00%
        STATE_RATES.put("MN", new BigDecimal("0.0814")); // Minnesota - 8.14%
        STATE_RATES.put("MS", new BigDecimal("0.0706")); // Mississippi - 7.06%
        STATE_RATES.put("MO", new BigDecimal("0.0844")); // Missouri - 8.44%
        STATE_RATES.put("MT", new BigDecimal("0.0000")); // Montana - 0.00%
        STATE_RATES.put("NE", new BigDecimal("0.0698")); // Nebraska - 6.98%
        STATE_RATES.put("NV", new BigDecimal("0.0824")); // Nevada - 8.24%
        STATE_RATES.put("NH", new BigDecimal("0.0000")); // New Hampshire - 0.00%
        STATE_RATES.put("NJ", new BigDecimal("0.0660")); // New Jersey - 6.60%
        STATE_RATES.put("NM", new BigDecimal("0.0767")); // New Mexico - 7.67%
        STATE_RATES.put("NY", new BigDecimal("0.0854")); // New York - 8.54%
        STATE_RATES.put("NC", new BigDecimal("0.0700")); // North Carolina - 7.00%
        STATE_RATES.put("ND", new BigDecimal("0.0709")); // North Dakota - 7.09%
        STATE_RATES.put("OH", new BigDecimal("0.0729")); // Ohio - 7.29%
        STATE_RATES.put("OK", new BigDecimal("0.0906")); // Oklahoma - 9.06%
        STATE_RATES.put("OR", new BigDecimal("0.0000")); // Oregon - 0.00%
        STATE_RATES.put("PA", new BigDecimal("0.0634")); // Pennsylvania - 6.34%
        STATE_RATES.put("RI", new BigDecimal("0.0700")); // Rhode Island - 7.00%
        STATE_RATES.put("SC", new BigDecimal("0.0749")); // South Carolina - 7.49%
        STATE_RATES.put("SD", new BigDecimal("0.0611")); // South Dakota - 6.11%
        STATE_RATES.put("TN", new BigDecimal("0.0961")); // Tennessee - 9.61%
        STATE_RATES.put("TX", new BigDecimal("0.0820")); // Texas - 8.20%
        STATE_RATES.put("UT", new BigDecimal("0.0742")); // Utah - 7.42%
        STATE_RATES.put("VT", new BigDecimal("0.0639")); // Vermont - 6.39%
        STATE_RATES.put("VA", new BigDecimal("0.0577")); // Virginia - 5.77%
        STATE_RATES.put("WA", new BigDecimal("0.0951")); // Washington - 9.51%
        STATE_RATES.put("WV", new BigDecimal("0.0659")); // West Virginia - 6.59%
        STATE_RATES.put("WI", new BigDecimal("0.0572")); // Wisconsin - 5.72%
        STATE_RATES.put("WY", new BigDecimal("0.0556")); // Wyoming - 5.56%
        STATE_RATES.put("DC", new BigDecimal("0.0600")); // District of Columbia - 6.00%
    }

    public BigDecimal getTaxRateForZip(String zip) {
        String state = guessStateFromZip(zip);
        if (state == null) return BigDecimal.ZERO;
        return STATE_RATES.getOrDefault(state, BigDecimal.ZERO);
    }
    
    // Overloaded method to get tax rate by state code directly
    public BigDecimal getTaxRateForState(String stateCode) {
        if (stateCode == null) return BigDecimal.ZERO;
        return STATE_RATES.getOrDefault(stateCode.toUpperCase(), BigDecimal.ZERO);
    }

    public BigDecimal calculateTax(BigDecimal subtotal, String zip) {
        if (subtotal == null) return BigDecimal.ZERO;
        BigDecimal rate = getTaxRateForZip(zip);
        return subtotal.multiply(rate).setScale(2, RoundingMode.HALF_UP);
    }

    // Improved ZIP code to state mapping based on ZIP code ranges
    private String guessStateFromZip(String zipRaw) {
        if (zipRaw == null) return null;
        String zip = zipRaw.trim();
        if (zip.length() < 1) return null;

        // Extract first 1-3 digits for better accuracy
        int zipPrefix;
        try {
            zipPrefix = Integer.parseInt(zip.substring(0, Math.min(3, zip.length())));
        } catch (NumberFormatException e) {
            return null;
        }

        // ZIP code ranges by state (first 3 digits)
        if (zipPrefix >= 100 && zipPrefix <= 149) return "NY"; // New York
        if (zipPrefix >= 150 && zipPrefix <= 196) return "PA"; // Pennsylvania
        if (zipPrefix >= 197 && zipPrefix <= 199) return "DE"; // Delaware
        if (zipPrefix >= 200 && zipPrefix <= 205) return "DC"; // District of Columbia
        if (zipPrefix >= 206 && zipPrefix <= 219) return "MD"; // Maryland
        if (zipPrefix >= 220 && zipPrefix <= 246) return "VA"; // Virginia
        if (zipPrefix >= 247 && zipPrefix <= 269) return "WV"; // West Virginia
        if (zipPrefix >= 270 && zipPrefix <= 289) return "NC"; // North Carolina
        if (zipPrefix >= 290 && zipPrefix <= 299) return "SC"; // South Carolina
        if (zipPrefix >= 300 && zipPrefix <= 319) return "GA"; // Georgia
        if (zipPrefix >= 320 && zipPrefix <= 349) return "FL"; // Florida
        if (zipPrefix >= 350 && zipPrefix <= 369) return "AL"; // Alabama
        if (zipPrefix >= 370 && zipPrefix <= 385) return "TN"; // Tennessee
        if (zipPrefix >= 386 && zipPrefix <= 397) return "MS"; // Mississippi
        if (zipPrefix >= 398 && zipPrefix <= 399) return "GA"; // Georgia
        if (zipPrefix >= 400 && zipPrefix <= 429) return "KY"; // Kentucky
        if (zipPrefix >= 430 && zipPrefix <= 459) return "OH"; // Ohio
        if (zipPrefix >= 460 && zipPrefix <= 479) return "IN"; // Indiana
        if (zipPrefix >= 480 && zipPrefix <= 499) return "MI"; // Michigan
        if (zipPrefix >= 500 && zipPrefix <= 529) return "IA"; // Iowa
        if (zipPrefix >= 530 && zipPrefix <= 549) return "WI"; // Wisconsin
        if (zipPrefix >= 550 && zipPrefix <= 569) return "MN"; // Minnesota
        if (zipPrefix >= 570 && zipPrefix <= 579) return "SD"; // South Dakota
        if (zipPrefix >= 580 && zipPrefix <= 589) return "ND"; // North Dakota
        if (zipPrefix >= 590 && zipPrefix <= 599) return "MT"; // Montana
        if (zipPrefix >= 600 && zipPrefix <= 629) return "IL"; // Illinois
        if (zipPrefix >= 630 && zipPrefix <= 659) return "MO"; // Missouri
        if (zipPrefix >= 660 && zipPrefix <= 679) return "KS"; // Kansas
        if (zipPrefix >= 680 && zipPrefix <= 699) return "NE"; // Nebraska
        if (zipPrefix >= 700 && zipPrefix <= 715) return "LA"; // Louisiana
        if (zipPrefix >= 716 && zipPrefix <= 729) return "AR"; // Arkansas
        if (zipPrefix >= 730 && zipPrefix <= 749) return "OK"; // Oklahoma
        if (zipPrefix >= 750 && zipPrefix <= 799) return "TX"; // Texas
        if (zipPrefix >= 800 && zipPrefix <= 819) return "CO"; // Colorado
        if (zipPrefix >= 820 && zipPrefix <= 839) return "WY"; // Wyoming
        if (zipPrefix >= 840 && zipPrefix <= 849) return "UT"; // Utah
        if (zipPrefix >= 850 && zipPrefix <= 869) return "AZ"; // Arizona
        if (zipPrefix >= 870 && zipPrefix <= 889) return "NM"; // New Mexico
        if (zipPrefix >= 890 && zipPrefix <= 899) return "NV"; // Nevada
        if (zipPrefix >= 900 && zipPrefix <= 969) return "CA"; // California
        if (zipPrefix >= 967 && zipPrefix <= 968) return "HI"; // Hawaii
        if (zipPrefix >= 970 && zipPrefix <= 979) return "OR"; // Oregon
        if (zipPrefix >= 980 && zipPrefix <= 999) return "WA"; // Washington
        if (zipPrefix >= 995 && zipPrefix <= 999) return "AK"; // Alaska
        
        // Handle single-digit prefixes (New England and others)
        if (zipPrefix >= 0 && zipPrefix <= 27) return "MA"; // Massachusetts
        if (zipPrefix >= 28 && zipPrefix <= 29) return "RI"; // Rhode Island
        if (zipPrefix >= 30 && zipPrefix <= 38) return "NH"; // New Hampshire
        if (zipPrefix >= 39 && zipPrefix <= 49) return "ME"; // Maine
        if (zipPrefix >= 50 && zipPrefix <= 54) return "VT"; // Vermont
        
        // Fallback for single digit
        char first = zip.charAt(0);
        return switch (first) {
            case '0', '1', '2' -> "MA"; // Massachusetts
            case '3' -> "NH"; // New Hampshire
            case '4' -> "ME"; // Maine
            case '5' -> "VT"; // Vermont
            default -> null;
        };
    }
}
