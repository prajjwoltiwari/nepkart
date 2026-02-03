# Figma Setup Guide for NEPKART

This guide will help you convert the NEPKART React project into Figma designs.

## Option 1: Using the Design Specification (Recommended)

The `FIGMA_DESIGN_SPEC.md` file contains a comprehensive design specification with all colors, typography, spacing, and component details. Use this as a reference to manually recreate the designs in Figma.

### Steps:

1. **Open Figma** and create a new file
2. **Set up Design System**:
   - Go to the Assets panel
   - Create color styles for all colors listed in the spec
   - Create text styles for typography variants
   - Create effect styles for shadows

3. **Create Components**:
   - Button (with variants: primary, secondary, destructive)
   - Product Card
   - Form Input
   - Status Badge
   - Header
   - Order Card

4. **Create Pages**:
   - Home Page
   - Product Detail Page
   - Cart Page
   - Checkout Page
   - Admin - Inventory
   - Admin - Orders
   - Login Page

5. **Use Auto Layout**:
   - Apply Auto Layout to all components
   - Set up responsive constraints
   - Use frames for containers

## Option 2: Using the Figma Plugin Script

The `figma-plugin/generate-nepkart-designs.ts` file contains a plugin script that can automatically generate basic designs.

### Steps:

1. **Create a Figma Plugin**:
   - Open Figma Desktop app
   - Go to Plugins → Development → New Plugin
   - Choose "With UI & browser APIs"
   - Name it "NEPKART Design Generator"

2. **Add the Script**:
   - Copy the contents of `figma-plugin/generate-nepkart-designs.ts`
   - Paste into the `code.ts` file in your plugin
   - Save the plugin

3. **Run the Plugin**:
   - In Figma, go to Plugins → Development → NEPKART Design Generator
   - Click "Run"
   - The plugin will generate basic page structures

4. **Refine the Designs**:
   - The plugin creates basic structures
   - Use the design spec to add details, colors, and styling
   - Add images and refine layouts

## Option 3: Manual Recreation (Most Control)

For the most accurate recreation, manually build each page using the design specification.

### Quick Start Checklist:

- [ ] Create color palette from spec
- [ ] Set up text styles
- [ ] Create button component with variants
- [ ] Create product card component
- [ ] Build Home page with hero and products grid
- [ ] Build Product Detail page
- [ ] Build Cart page
- [ ] Build Checkout page
- [ ] Build Admin Inventory page
- [ ] Build Admin Orders page
- [ ] Build Login page
- [ ] Add interactions and prototypes
- [ ] Export assets

## Design Tokens Reference

### Colors (Hex Codes)
- Orange Primary: `#EA580C`
- Orange Hover: `#C2410C`
- Red Primary: `#DC2626`
- Gray 900: `#111827`
- Gray 700: `#374151`
- Gray 600: `#4B5563`
- Gray 300: `#D1D5DB`
- Gray 200: `#E5E7EB`
- Gray 100: `#F3F4F6`
- White: `#FFFFFF`

### Typography
- Font Family: Inter (or system font stack)
- Display: 48px, Bold
- H1: 36px, Bold
- H2: 30px, Bold
- H3: 24px, Bold
- Body: 16px, Regular
- Small: 14px, Regular
- Caption: 12px, Regular

### Spacing
- Base unit: 4px
- Common sizes: 4, 8, 16, 24, 32, 48, 64px

### Border Radius
- Small: 4px
- Medium: 8px
- Large: 12px
- Full: 9999px (for pills/badges)

## Tips for Accurate Recreation

1. **Use Auto Layout**: This will make your designs responsive and easier to maintain
2. **Create Components**: Build reusable components for buttons, cards, etc.
3. **Use Constraints**: Set up proper constraints for responsive behavior
4. **Match Spacing**: Use the 4px grid system consistently
5. **Add Interactions**: Create prototypes with hover states and transitions
6. **Export Assets**: Set up proper export settings for images and icons

## Next Steps

After creating the designs in Figma:

1. **Review**: Compare with the live application
2. **Iterate**: Make adjustments based on the actual implementation
3. **Document**: Add notes and annotations for developers
4. **Share**: Export or share the Figma file with your team

## Resources

- [Figma Auto Layout Guide](https://help.figma.com/hc/en-us/articles/5731389357079)
- [Figma Components Guide](https://help.figma.com/hc/en-us/articles/5579474822679)
- [Figma Design Tokens](https://www.figma.com/community/plugin/888356646278934516/Design-Tokens)

For detailed component specifications, refer to `FIGMA_DESIGN_SPEC.md`.
