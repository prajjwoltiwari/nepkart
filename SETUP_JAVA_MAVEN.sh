#!/bin/bash

# Setup Java and Maven for NEPKART

echo "=========================================="
echo "Setting up Java and Maven"
echo "=========================================="
echo ""

# Check if Java is installed
if command -v java &> /dev/null; then
    echo "✅ Java is installed"
    java -version
else
    echo "❌ Java is not installed"
    echo "Installing Java 17..."
    brew install openjdk@17
    
    # Link Java
    sudo ln -sfn /opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk
    
    # Add to PATH
    echo 'export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
    echo 'export JAVA_HOME="/opt/homebrew/opt/openjdk@17"' >> ~/.zshrc
    
    echo "✅ Java installed. Please restart your terminal or run: source ~/.zshrc"
fi

echo ""

# Check if Maven is installed
if command -v mvn &> /dev/null; then
    echo "✅ Maven is installed"
    mvn --version
else
    echo "❌ Maven is not installed"
    echo "Installing Maven..."
    brew install maven
    echo "✅ Maven installed"
fi

echo ""
echo "=========================================="
echo "Setup Complete!"
echo "=========================================="
echo ""
echo "To start the backend, run:"
echo "  cd /Users/satchit/CURSOR/backend"
echo "  mvn spring-boot:run"
echo ""
