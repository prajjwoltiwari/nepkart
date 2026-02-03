# Install Maven on macOS

## Option 1: Install via Homebrew (Recommended)

```bash
brew install maven
```

After installation, verify:
```bash
mvn --version
```

You should see something like:
```
Apache Maven 3.9.x
Maven home: /usr/local/Cellar/maven/...
Java version: 17.x.x
```

---

## Option 2: Install Maven Manually

1. Download Maven from: https://maven.apache.org/download.cgi
2. Extract the archive
3. Add to PATH in `~/.zshrc`:
   ```bash
   export PATH="/path/to/maven/bin:$PATH"
   ```
4. Reload: `source ~/.zshrc`

---

## Option 3: Use Maven Wrapper (No Installation Needed)

If the project has Maven Wrapper, you can use:
```bash
./mvnw spring-boot:run
```

Or on macOS/Linux:
```bash
chmod +x mvnw
./mvnw spring-boot:run
```

---

## After Installing Maven

Run the backend:
```bash
cd /Users/satchit/CURSOR/backend
mvn spring-boot:run
```
