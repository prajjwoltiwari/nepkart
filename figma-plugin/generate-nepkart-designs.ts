// Figma Plugin Script to Generate NEPKART Designs
// This script can be run in Figma's Plugin environment
// To use: Create a new Figma Plugin and paste this code

// Color definitions matching the design system
const colors = {
  orange600: { r: 0.918, g: 0.345, b: 0.047 }, // #EA580C
  orange700: { r: 0.761, g: 0.255, b: 0.047 }, // #C2410C
  orange100: { r: 1, g: 0.933, b: 0.835 }, // #FFEDD5
  red600: { r: 0.863, g: 0.149, b: 0.149 }, // #DC2626
  red500: { r: 0.937, g: 0.267, b: 0.267 }, // #EF4444
  red50: { r: 1, g: 0.886, b: 0.886 }, // #FEE2E2
  gray900: { r: 0.067, g: 0.067, b: 0.153 }, // #111827
  gray700: { r: 0.216, g: 0.255, b: 0.318 }, // #374151
  gray600: { r: 0.294, g: 0.333, b: 0.388 }, // #4B5563
  gray300: { r: 0.820, g: 0.835, b: 0.859 }, // #D1D5DB
  gray200: { r: 0.898, g: 0.906, b: 0.922 }, // #E5E7EB
  gray100: { r: 0.953, g: 0.957, b: 0.965 }, // #F3F4F6
  white: { r: 1, g: 1, b: 1 },
  green600: { r: 0.063, g: 0.725, b: 0.506 }, // #10B981
  green100: { r: 0.820, g: 0.980, b: 0.898 }, // #D1FAE5
  green800: { r: 0.024, g: 0.373, b: 0.275 }, // #065F46
  blue600: { r: 0.231, g: 0.510, b: 0.965 }, // #3B82F6
  blue100: { r: 0.859, g: 0.918, b: 0.996 }, // #DBEAFE
  blue700: { r: 0.118, g: 0.251, b: 0.686 }, // #1E40AF
};

// Helper function to create a color style
function createColorStyle(name: string, color: { r: number; g: number; b: number }) {
  const paint: SolidPaint = {
    type: 'SOLID',
    color: color,
  };
  return paint;
}

// Helper function to create a text style
function createTextStyle(
  name: string,
  fontSize: number,
  fontWeight: number,
  lineHeight: { value: number; unit: 'PIXELS' | 'PERCENT' }
) {
  return {
    fontSize,
    fontWeight,
    lineHeight,
  };
}

// Create a button component
function createButton(
  parent: FrameNode,
  text: string,
  x: number,
  y: number,
  variant: 'primary' | 'secondary' | 'destructive' = 'primary'
): FrameNode {
  const button = figma.createFrame();
  button.name = `Button/${variant}`;
  button.x = x;
  button.y = y;
  
  // Set button properties based on variant
  if (variant === 'primary') {
    button.fills = [createColorStyle('orange600', colors.orange600)];
  } else if (variant === 'destructive') {
    button.fills = [createColorStyle('red600', colors.red600)];
  } else {
    button.fills = [{ type: 'SOLID', color: colors.white }];
    button.strokes = [{ type: 'SOLID', color: colors.gray300 }];
  }
  
  button.cornerRadius = 8;
  button.paddingLeft = 24;
  button.paddingRight = 24;
  button.paddingTop = 12;
  button.paddingBottom = 12;
  
  // Add text
  const textNode = figma.createText();
  textNode.characters = text;
  textNode.fontSize = 16;
  textNode.fontWeight = 600;
  textNode.fills = variant === 'secondary' 
    ? [{ type: 'SOLID', color: colors.gray700 }]
    : [{ type: 'SOLID', color: colors.white }];
  
  // Load font before setting text
  figma.loadFontAsync({ family: 'Inter', style: 'SemiBold' }).then(() => {
    button.appendChild(textNode);
  });
  
  button.layoutMode = 'HORIZONTAL';
  button.primaryAxisAlignItems = 'CENTER';
  button.counterAxisAlignItems = 'CENTER';
  
  parent.appendChild(button);
  return button;
}

// Create a product card component
function createProductCard(
  parent: FrameNode,
  x: number,
  y: number,
  product: {
    name: string;
    category: string;
    price: number;
    image?: string;
    inStock: boolean;
  }
): FrameNode {
  const card = figma.createFrame();
  card.name = `Product Card/${product.name}`;
  card.x = x;
  card.y = y;
  card.fills = [{ type: 'SOLID', color: colors.white }];
  card.strokes = [{ type: 'SOLID', color: colors.gray200 }];
  card.cornerRadius = 8;
  card.layoutMode = 'VERTICAL';
  card.paddingLeft = 16;
  card.paddingRight = 16;
  card.paddingTop = 16;
  card.paddingBottom = 16;
  card.resize(280, 400);
  
  // Product image placeholder
  const imageFrame = figma.createFrame();
  imageFrame.name = 'Product Image';
  imageFrame.fills = [{ type: 'SOLID', color: colors.gray100 }];
  imageFrame.resize(248, 248);
  imageFrame.cornerRadius = 8;
  
  // Category badge
  const categoryText = figma.createText();
  categoryText.characters = product.category.toUpperCase();
  categoryText.fontSize = 12;
  categoryText.fontWeight = 600;
  categoryText.fills = [{ type: 'SOLID', color: colors.orange600 }];
  
  // Product name
  const nameText = figma.createText();
  nameText.characters = product.name;
  nameText.fontSize = 18;
  nameText.fontWeight = 700;
  nameText.fills = [{ type: 'SOLID', color: colors.gray900 }];
  
  // Price
  const priceText = figma.createText();
  priceText.characters = `$${product.price.toFixed(2)}`;
  priceText.fontSize = 24;
  priceText.fontWeight = 700;
  priceText.fills = [{ type: 'SOLID', color: colors.gray900 }];
  
  // Add to cart button
  const addButton = createButton(card, 'Add to Cart', 0, 0, 'primary');
  
  card.appendChild(imageFrame);
  card.appendChild(categoryText);
  card.appendChild(nameText);
  card.appendChild(priceText);
  card.appendChild(addButton);
  
  parent.appendChild(card);
  return card;
}

// Create header component
function createHeader(parent: FrameNode, y: number = 0): FrameNode {
  const header = figma.createFrame();
  header.name = 'Header';
  header.fills = [{ type: 'SOLID', color: colors.white }];
  header.strokes = [{ type: 'SOLID', color: colors.gray200 }];
  header.resize(1440, 64);
  header.y = y;
  header.layoutMode = 'HORIZONTAL';
  header.paddingLeft = 16;
  header.paddingRight = 16;
  header.paddingTop = 16;
  header.paddingBottom = 16;
  header.primaryAxisAlignItems = 'SPACE_BETWEEN';
  header.counterAxisAlignItems = 'CENTER';
  
  // Logo placeholder
  const logo = figma.createFrame();
  logo.name = 'Logo';
  logo.resize(120, 56);
  logo.fills = [{ type: 'SOLID', color: colors.gray100 }];
  
  // Cart button
  const cartButton = createButton(header, 'Cart', 0, 0, 'primary');
  
  header.appendChild(logo);
  header.appendChild(cartButton);
  
  parent.appendChild(header);
  return header;
}

// Create hero section
function createHeroSection(parent: FrameNode, y: number = 0): FrameNode {
  const hero = figma.createFrame();
  hero.name = 'Hero Section';
  hero.resize(1440, 400);
  hero.y = y;
  hero.fills = [
    {
      type: 'GRADIENT_LINEAR',
      gradientStops: [
        { position: 0, color: { r: 0.984, g: 0.455, b: 0.0 } }, // orange-500
        { position: 1, color: { r: 0.863, g: 0.149, b: 0.149 } }, // red-600
      ],
      gradientTransform: [[1, 0, 0], [0, 1, 0]],
    },
  ];
  hero.opacity = 0.75;
  
  // Content frame
  const content = figma.createFrame();
  content.name = 'Hero Content';
  content.layoutMode = 'VERTICAL';
  content.resize(800, 200);
  content.x = 16;
  content.y = 80;
  
  // Heading
  const heading = figma.createText();
  heading.characters = 'Authentic Nepalese Products';
  heading.fontSize = 48;
  heading.fontWeight = 700;
  heading.fills = [{ type: 'SOLID', color: colors.white }];
  
  // Subheading
  const subheading = figma.createText();
  subheading.characters = 'Discover handcrafted treasures and traditional delicacies from the heart of the Himalayas.';
  subheading.fontSize = 20;
  subheading.fontWeight = 400;
  subheading.fills = [{ type: 'SOLID', color: { r: 1, g: 0.98, b: 0.95 } }]; // orange-50
  
  content.appendChild(heading);
  content.appendChild(subheading);
  hero.appendChild(content);
  
  parent.appendChild(hero);
  return hero;
}

// Create products grid
function createProductsGrid(parent: FrameNode, y: number = 0): FrameNode {
  const grid = figma.createFrame();
  grid.name = 'Products Grid';
  grid.resize(1440, 600);
  grid.y = y;
  grid.layoutMode = 'VERTICAL';
  grid.paddingLeft = 16;
  grid.paddingRight = 16;
  grid.paddingTop = 64;
  grid.paddingBottom = 64;
  
  // Section heading
  const heading = figma.createText();
  heading.characters = 'Our Products';
  heading.fontSize = 30;
  heading.fontWeight = 700;
  heading.fills = [{ type: 'SOLID', color: colors.gray900 }];
  
  // Category filters
  const filters = figma.createFrame();
  filters.name = 'Category Filters';
  filters.layoutMode = 'HORIZONTAL';
  filters.resize(1440, 40);
  filters.y = 40;
  
  const categories = ['All', 'Food', 'Clothing', 'Decor', 'Religious'];
  categories.forEach((cat, index) => {
    const filter = createButton(filters, cat, index * 120, 0, 'secondary');
  });
  
  // Products grid
  const productsFrame = figma.createFrame();
  productsFrame.name = 'Products';
  productsFrame.layoutMode = 'GRID';
  productsFrame.resize(1440, 500);
  productsFrame.y = 100;
  productsFrame.itemSpacing = 24;
  productsFrame.paddingLeft = 0;
  productsFrame.paddingRight = 0;
  
  // Sample products
  const sampleProducts = [
    { name: 'Wai Wai Noodles', category: 'Food', price: 2.99, inStock: true },
    { name: 'Churpi', category: 'Food', price: 8.99, inStock: true },
    { name: 'Dhaka Topi', category: 'Clothing', price: 24.99, inStock: true },
    { name: 'Copper Jug', category: 'Decor', price: 45.99, inStock: true },
  ];
  
  sampleProducts.forEach((product, index) => {
    createProductCard(productsFrame, (index % 4) * 300, Math.floor(index / 4) * 420, product);
  });
  
  grid.appendChild(heading);
  grid.appendChild(filters);
  grid.appendChild(productsFrame);
  
  parent.appendChild(grid);
  return grid;
}

// Main function to generate all designs
async function generateNepkartDesigns() {
  // Create a new page for NEPKART designs
  const page = figma.createPage();
  page.name = 'NEPKART Designs';
  figma.currentPage = page;
  
  // Create main frame for Home page
  const homeFrame = figma.createFrame();
  homeFrame.name = 'Home Page';
  homeFrame.resize(1440, 2000);
  homeFrame.fills = [{ type: 'SOLID', color: colors.white }];
  
  // Load fonts
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter', style: 'SemiBold' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
  
  // Create components
  const header = createHeader(homeFrame, 0);
  const hero = createHeroSection(homeFrame, 64);
  const productsGrid = createProductsGrid(homeFrame, 464);
  
  page.appendChild(homeFrame);
  
  // Create Product Detail page
  const productDetailFrame = figma.createFrame();
  productDetailFrame.name = 'Product Detail Page';
  productDetailFrame.resize(1440, 1200);
  productDetailFrame.fills = [{ type: 'SOLID', color: colors.white }];
  
  const productHeader = createHeader(productDetailFrame, 0);
  
  page.appendChild(productDetailFrame);
  
  // Create Cart page
  const cartFrame = figma.createFrame();
  cartFrame.name = 'Cart Page';
  cartFrame.resize(1440, 1200);
  cartFrame.fills = [{ type: 'SOLID', color: colors.white }];
  
  const cartHeader = createHeader(cartFrame, 0);
  
  page.appendChild(cartFrame);
  
  // Create Checkout page
  const checkoutFrame = figma.createFrame();
  checkoutFrame.name = 'Checkout Page';
  checkoutFrame.resize(1440, 1600);
  checkoutFrame.fills = [{ type: 'SOLID', color: colors.white }];
  
  const checkoutHeader = createHeader(checkoutFrame, 0);
  
  page.appendChild(checkoutFrame);
  
  // Create Admin pages
  const adminInventoryFrame = figma.createFrame();
  adminInventoryFrame.name = 'Admin - Inventory';
  adminInventoryFrame.resize(1440, 1200);
  adminInventoryFrame.fills = [{ type: 'SOLID', color: colors.white }];
  
  page.appendChild(adminInventoryFrame);
  
  const adminOrdersFrame = figma.createFrame();
  adminOrdersFrame.name = 'Admin - Orders';
  adminOrdersFrame.resize(1440, 1200);
  adminOrdersFrame.fills = [{ type: 'SOLID', color: colors.white }];
  
  page.appendChild(adminOrdersFrame);
  
  // Create Login page
  const loginFrame = figma.createFrame();
  loginFrame.name = 'Login Page';
  loginFrame.resize(1440, 900);
  loginFrame.fills = [
    {
      type: 'GRADIENT_LINEAR',
      gradientStops: [
        { position: 0, color: { r: 0.984, g: 0.455, b: 0.0 } },
        { position: 1, color: { r: 0.863, g: 0.149, b: 0.149 } },
      ],
    },
  ];
  
  page.appendChild(loginFrame);
  
  figma.notify('NEPKART designs generated successfully!');
  figma.closePlugin();
}

// Run the generator
generateNepkartDesigns();
