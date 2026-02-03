# Install Maven - Quick Guide

## You have:
✅ Java 17 installed  
✅ PostgreSQL installed  
❌ Maven NOT installed  

## Install Maven Now:

Run this command:

```bash
brew install maven
```

This will install Maven via Homebrew.

---

## After Installation:

Verify Maven is installed:
```bash
mvn --version
```

You should see something like:
```
Apache Maven 3.9.x
Maven home: /opt/homebrew/Cellar/maven/...
Java version: 17.0.18
```

---

## Then Start Your Servers:

### 1. Start Backend:
```bash
cd /Users/satchit/CURSOR/backend
mvn spring-boot:run
```

### 2. Start Frontend (in new terminal):
```bash
cd /Users/satchit/CURSOR/frontend
npm start
```

---

## That's it!

Once Maven is installed, you're ready to run the application!
