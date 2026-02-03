#!/bin/bash

# NEPKART - Start Servers Script
# This script helps you start both backend and frontend servers

echo "=========================================="
echo "NEPKART - Starting Servers"
echo "=========================================="
echo ""

# Check if PostgreSQL is running
echo "Checking PostgreSQL connection..."
if psql -U postgres -c '\q' 2>/dev/null; then
    echo "✅ PostgreSQL is running"
else
    echo "❌ PostgreSQL is not running or not accessible"
    echo "Please start PostgreSQL first"
    exit 1
fi

# Check if database exists
echo "Checking if nepkartdb exists..."
if psql -U postgres -lqt | cut -d \| -f 1 | grep -qw nepkartdb; then
    echo "✅ Database 'nepkartdb' exists"
else
    echo "❌ Database 'nepkartdb' does not exist"
    echo "Please create it first: CREATE DATABASE nepkartdb;"
    exit 1
fi

echo ""
echo "=========================================="
echo "Starting Backend Server..."
echo "=========================================="
echo "Backend will run on: http://localhost:8080"
echo ""

# Start backend in background
cd backend
mvn spring-boot:run &
BACKEND_PID=$!

echo "Backend started with PID: $BACKEND_PID"
echo "Waiting for backend to initialize..."
sleep 10

echo ""
echo "=========================================="
echo "Starting Frontend Server..."
echo "=========================================="
echo "Frontend will run on: http://localhost:3000"
echo ""

# Start frontend
cd ../frontend
npm start

# Cleanup on exit
trap "kill $BACKEND_PID" EXIT
