# NEPKART - Figma Design Specification

This document provides a comprehensive design specification for recreating the NEPKART e-commerce platform in Figma.

## Design System

### Color Palette

#### Primary Colors
- **Orange Primary**: `#EA580C` (orange-600) - Main CTA buttons, highlights
- **Orange Hover**: `#C2410C` (orange-700) - Button hover states
- **Orange Light**: `#FFEDD5` (orange-100) - Backgrounds, badges
- **Orange Text**: `#9A3412` (orange-700) - Text accents

#### Secondary Colors
- **Red Primary**: `#DC2626` (red-600) - Destructive actions, errors
- **Red Light**: `#FEE2E2` (red-50) - Error backgrounds
- **Red Badge**: `#EF4444` (red-500) - Cart badge
- **Red Text**: `#991B1B` (red-800) - Error text

#### Neutral Colors
- **Gray 900**: `#111827` - Primary text
- **Gray 700**: `#374151` - Secondary text
- **Gray 600**: `#4B5563` - Tertiary text
- **Gray 300**: `#D1D5DB` - Borders
- **Gray 200**: `#E5E7EB` - Light borders
- **Gray 100**: `#F3F4F6` - Backgrounds
- **White**: `#FFFFFF` - Cards, backgrounds

#### Status Colors
- **Green**: `#10B981` (green-600) - Success states
- **Green Light**: `#D1FAE5` (green-100) - Success backgrounds
- **Green Text**: `#065F46` (green-800) - Success text
- **Blue**: `#3B82F6` (blue-600) - Info states
- **Blue Light**: `#DBEAFE` (blue-100) - Info backgrounds
- **Blue Text**: `#1E40AF` (blue-700) - Info text

### Typography

#### Font Families
- **Primary**: System font stack (Inter, -apple-system, BlinkMacSystemFont, etc.)
- **Monospace**: For SKU codes and technical data

#### Font Sizes
- **Display**: 48px (3xl) - Hero headings
- **H1**: 36px (3xl) - Page titles
- **H2**: 30px (2xl) - Section headings
- **H3**: 24px (xl) - Subsection headings
- **H4**: 18px (lg) - Card titles
- **Body Large**: 18px (lg) - Important body text
- **Body**: 16px (base) - Default body text
- **Body Small**: 14px (sm) - Secondary text
- **Caption**: 12px (xs) - Labels, metadata

#### Font Weights
- **Bold**: 700 - Headings, important text
- **Semibold**: 600 - Subheadings, labels
- **Medium**: 500 - Buttons, emphasis
- **Regular**: 400 - Body text

#### Line Heights
- **Tight**: 1.25 - Headings
- **Normal**: 1.5 - Body text
- **Relaxed**: 1.75 - Long-form content

### Spacing System

Based on Tailwind's spacing scale (4px base unit):
- **xs**: 4px (1)
- **sm**: 8px (2)
- **md**: 16px (4)
- **lg**: 24px (6)
- **xl**: 32px (8)
- **2xl**: 48px (12)
- **3xl**: 64px (16)

### Border Radius
- **Small**: 4px - Small elements
- **Medium**: 8px (lg) - Buttons, cards
- **Large**: 12px - Large cards
- **Full**: 9999px - Pills, badges

### Shadows
- **Small**: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
- **Medium**: `0 4px 6px -1px rgba(0, 0, 0, 0.1)`
- **Large**: `0 10px 15px -3px rgba(0, 0, 0, 0.1)`
- **XL**: `0 20px 25px -5px rgba(0, 0, 0, 0.1)` - Cards, modals

## Component Library

### Buttons

#### Primary Button
- **Background**: Orange-600 (#EA580C)
- **Text**: White
- **Padding**: 12px 24px (py-3 px-6)
- **Border Radius**: 8px
- **Font**: Semibold, 16px
- **Hover**: Orange-700 (#C2410C)
- **Disabled**: 50% opacity

#### Secondary Button
- **Background**: White
- **Text**: Gray-700
- **Border**: 1px Gray-300
- **Padding**: 12px 24px
- **Border Radius**: 8px
- **Hover**: Border Orange-600, Text Orange-600

#### Destructive Button
- **Background**: Red-600 (#DC2626)
- **Text**: White
- **Padding**: 12px 24px
- **Border Radius**: 8px
- **Hover**: Red-700

### Cards

#### Product Card
- **Width**: Responsive (1-4 columns)
- **Background**: White
- **Border**: 1px Gray-200
- **Border Radius**: 8px
- **Padding**: 16px
- **Shadow**: None (hover: Large shadow)
- **Image**: Aspect ratio 1:1, rounded top corners
- **Content**: Category badge, title, description (2 lines max), price, add button

#### Order Card
- **Background**: White
- **Border**: 1px Gray-200
- **Border Radius**: 8px
- **Padding**: 24px
- **Shadow**: None (hover: Large shadow)
- **Layout**: Two-column grid (customer info, order items)

### Forms

#### Input Fields
- **Background**: White
- **Border**: 1px Gray-300
- **Border Radius**: 8px
- **Padding**: 12px 16px (py-2 px-4)
- **Font**: Regular, 16px
- **Focus**: 2px ring Orange-500, border transparent
- **Placeholder**: Gray-500

#### Select Dropdowns
- **Background**: White
- **Border**: 1px Gray-300
- **Border Radius**: 8px
- **Padding**: 12px 16px
- **Font**: Semibold, 16px
- **Focus**: 2px ring Orange-500

#### Labels
- **Font**: Semibold, 14px
- **Color**: Gray-700
- **Margin Bottom**: 8px

### Badges

#### Status Badge
- **Padding**: 4px 12px (px-3 py-1)
- **Border Radius**: 9999px (full)
- **Font**: Semibold, 14px
- **Variants**:
  - In Stock: Green-100 bg, Green-700 text
  - Low Stock: Orange-100 bg, Orange-700 text
  - Out of Stock: Red-100 bg, Red-700 text
  - Received: Blue-100 bg, Blue-700 text
  - In Progress: Orange-100 bg, Orange-700 text
  - Shipped: Green-100 bg, Green-700 text

### Navigation

#### Header
- **Height**: Auto (min 64px)
- **Background**: White
- **Border**: 1px bottom Gray-200
- **Padding**: 16px
- **Sticky**: Top of viewport
- **Z-index**: 50
- **Layout**: Flex, space-between
- **Logo**: Height 56px (h-14)
- **Cart Button**: Orange-600 bg, white text, rounded-lg

## Page Layouts

### 1. Home Page

#### Hero Section
- **Height**: Auto (min 320px)
- **Background**: Himalayan banner image with gradient overlay
- **Gradient**: Orange-500 to Red-600, 75% opacity
- **Text**: White
- **Content**: 
  - Mountain icon (40px)
  - Heading: "Authentic Nepalese Products" (48px, bold)
  - Subheading: 20px, orange-50
- **Padding**: 80px vertical, 16px horizontal

#### Products Section
- **Padding**: 64px vertical
- **Container**: Max-width responsive, centered
- **Heading**: "Our Products" (30px, bold, Gray-900)
- **Category Filters**: 
  - Active: Orange-600 bg, white text
  - Inactive: White bg, Gray-700 text, Gray-300 border
  - Padding: 8px 24px, rounded-lg
- **Product Grid**: 
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3 columns
  - Large Desktop: 4 columns
  - Gap: 24px

#### Features Section
- **Background**: White
- **Padding**: 64px vertical
- **Layout**: 3 columns (responsive)
- **Icon**: 64px circle, Orange-100 bg, Orange-600 icon
- **Title**: 20px, bold
- **Description**: Gray-600

### 2. Product Detail Page

#### Layout
- **Container**: Max-width responsive
- **Grid**: 2 columns (responsive to 1 column on mobile)
- **Gap**: 48px

#### Image Section
- **Aspect Ratio**: 1:1
- **Border Radius**: 8px
- **Background**: Gray-100

#### Details Section
- **Category Badge**: Small, Orange-600 text, uppercase
- **Title**: 36px, bold, Gray-900
- **Price**: 30px, bold, Gray-900
- **Description**: 18px, Gray-600, relaxed line-height
- **Stock Badge**: Status badge component
- **Add to Cart Button**: Full width, Orange-600 bg
- **Product Details**: Bullet list with Orange-600 bullets

### 3. Cart Page

#### Empty State
- **Icon**: Shopping bag, 96px, Gray-300
- **Heading**: "Your cart is empty" (24px, bold)
- **Text**: Gray-600
- **CTA**: "Continue Shopping" button

#### Cart Items
- **Layout**: 2 columns (items: 2/3, summary: 1/3)
- **Item Card**:
  - Image: 96px × 96px, rounded-lg
  - Title: 18px, bold, link style
  - Price: 14px, Gray-600
  - Quantity Controls: Border, rounded-lg, minus/plus buttons
  - Remove: Red-600 icon button
  - Subtotal: 20px, bold, right-aligned

#### Order Summary
- **Background**: White
- **Border**: 1px Gray-200
- **Border Radius**: 8px
- **Padding**: 24px
- **Sticky**: Top 96px
- **Layout**: 
  - Subtotal: Gray-600 text
  - Shipping: "Free" or amount
  - Total: 20px, bold, border-top separator
- **CTA**: "Proceed to Checkout" button, full width

### 4. Checkout Page

#### Layout
- **Grid**: 2 columns (form: 2/3, summary: 1/3)
- **Form Sections**:
  - Shipping Information
  - Billing Address (with "Same as shipping" checkbox)
  - Payment Information

#### Form Fields
- **Grid**: 2 columns for name fields, 3 columns for city/state/zip
- **Card Number**: Auto-formatting based on card type
- **Expiration**: MM/YY format
- **CVV**: 3-4 digits based on card type
- **Validation**: Real-time feedback with red error text

#### Order Summary
- **Same as Cart**: Sticky sidebar
- **Additional**: Shipping cost, tax calculation
- **Total**: Grand total with all fees

#### Success State
- **Icon**: Check circle, 64px, Green-600
- **Heading**: "Order Confirmed!" (30px, bold)
- **Order ID**: Displayed prominently
- **CTA**: "Continue Shopping" button

### 5. Admin Dashboard (Inventory)

#### Header Stats
- **Layout**: 3 columns
- **Cards**: White bg, Gray-200 border, rounded-lg, 16px padding
- **Labels**: 14px, Gray-600
- **Values**: 30px, bold
- **Colors**: 
  - Total: Gray-900
  - Low Stock: Orange-600
  - Out of Stock: Red-600

#### Add Product Form
- **Layout**: 2-column grid
- **Fields**: SKU, Name, Category, Price, Stock, Low Stock Threshold, Weight, Origin, Description, Image
- **Image Upload**: File picker + preview (96px × 96px)
- **Actions**: Cancel (Gray), Create (Green-600)

#### Product Table
- **Layout**: Full-width table, horizontal scroll on mobile
- **Header**: Gray-50 bg, Gray-200 border-bottom
- **Rows**: 
  - Out of Stock: Red-50 bg
  - Low Stock: Orange-50 bg
- **Cells**: Inline editable inputs
- **Image Column**: 48px × 48px preview + upload button
- **Status Column**: Status badge
- **Actions Column**: Sticky right, "Save" button (Orange-600)

### 6. Admin Orders Page

#### Order Cards
- **Layout**: Vertical stack
- **Card**: White bg, Gray-200 border, rounded-lg, 24px padding
- **Header**: 
  - Order ID: 20px, bold
  - Status Badge: Inline
  - Date: 14px, Gray-600
- **Content**: 2-column grid
  - Customer Information: Name, email, phone, address
  - Order Items: Product name, SKU, quantity, price
- **Footer**: 
  - Totals: Right-aligned, subtotal/shipping/tax/total
  - Actions: Status dropdown, Delete button (Red-600)

### 7. Login Page

#### Layout
- **Background**: Gradient Orange-500 to Red-600, full screen
- **Card**: White bg, rounded-lg, shadow-xl, max-width 448px, centered
- **Padding**: 32px

#### Content
- **Logo**: 64px height, centered
- **Heading**: "Admin Login" (30px, bold, Gray-900)
- **Subheading**: Gray-600, 14px
- **Form**: 
  - Username field
  - Password field
  - Submit button (Orange-600, full width)
- **Error State**: Red-50 bg, Red-200 border, Red-700 text
- **Backend Status**: Yellow-50 bg, Yellow-200 border, Yellow-700 text

## Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md-lg)
- **Desktop**: 1024px - 1280px (lg-xl)
- **Large Desktop**: > 1280px (xl+)

## Assets

### Images
- **Logo**: `/nepkart-logo.png` - Height: 56px (header), 64px (login)
- **Hero Banner**: `/himalayan-banner.png` - Full width, cover
- **Placeholder Product**: `/placeholder-product.svg` - 1:1 aspect ratio

### Icons (Lucide React)
- **Mountain**: Hero section
- **Shopping Cart**: Cart button, add to cart
- **Arrow Left**: Back navigation
- **Check Circle**: Success states
- **Trash**: Delete actions
- **Plus/Minus**: Quantity controls

## Implementation Notes

1. **Container Width**: Max-width responsive container with 16px horizontal padding
2. **Sticky Elements**: Header (top), Order Summary (top + offset)
3. **Transitions**: All interactive elements have 150-300ms transitions
4. **Focus States**: 2px ring Orange-500 for accessibility
5. **Loading States**: Gray-600 text, "Loading..." message
6. **Error States**: Red-600 text, error message display
7. **Empty States**: Centered, icon + heading + description + CTA

## Figma Setup Instructions

1. **Create Design System File**:
   - Set up color styles for all colors listed above
   - Create text styles for all typography variants
   - Define effect styles for shadows
   - Create component library

2. **Create Pages**:
   - Home
   - Product Detail
   - Cart
   - Checkout
   - Admin - Inventory
   - Admin - Orders
   - Login

3. **Create Components**:
   - Button (Primary, Secondary, Destructive variants)
   - Product Card
   - Form Input
   - Form Select
   - Status Badge
   - Order Card
   - Header
   - Footer (if applicable)

4. **Set Up Auto Layout**:
   - Use Auto Layout for all components
   - Set up responsive constraints
   - Use frames for containers

5. **Create Variants**:
   - Button states (default, hover, disabled)
   - Badge variants (all status types)
   - Card variants (with/without image, different states)

6. **Add Interactions**:
   - Button hover states
   - Link interactions
   - Form field focus states

## Export Specifications

- **Images**: Export at 2x for retina displays
- **Icons**: SVG format preferred
- **Colors**: Use hex codes for consistency
- **Spacing**: Use 4px grid system
- **Typography**: Match font sizes exactly
