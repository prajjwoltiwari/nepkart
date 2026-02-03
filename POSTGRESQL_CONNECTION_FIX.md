# PostgreSQL Connection Fix

## Problem
You're getting: `password authentication failed for user "satchit"`

## Solutions

### Solution 1: Connect as postgres user (Recommended)

Try connecting as the `postgres` superuser:

```bash
psql -U postgres
```

If it asks for a password, try:
- Empty password (just press Enter)
- Or: `postgres`
- Or: `9842` (your configured password)

---

### Solution 2: Connect without password (Peer Authentication)

If PostgreSQL uses peer authentication, try:

```bash
psql postgres
```

Or:

```bash
psql -U satchit postgres
```

This uses your macOS username for authentication.

---

### Solution 3: Reset PostgreSQL Password

If you need to set/reset the postgres user password:

```bash
# Stop PostgreSQL
brew services stop postgresql

# Start PostgreSQL in single-user mode
postgres --single -D /usr/local/var/postgres postgres
```

Then in the PostgreSQL prompt:
```sql
ALTER USER postgres WITH PASSWORD '9842';
\q
```

Then restart PostgreSQL:
```bash
brew services start postgresql
```

---

### Solution 4: Use Your macOS Username

Since PostgreSQL might be configured to use your macOS username, try:

**Update application.properties:**
```properties
spring.datasource.username=satchit
spring.datasource.password=
```

Or if you set a password for your user:
```properties
spring.datasource.username=satchit
spring.datasource.password=your_macos_password
```

---

## Quick Test Commands

```bash
# Try connecting as postgres user
psql -U postgres

# Try connecting with your username
psql -U satchit postgres

# List all databases
psql -U postgres -l

# Connect to specific database
psql -U postgres -d postgres
```

---

## Recommended: Update Backend Configuration

Based on your setup, try one of these configurations:

### Option A: Use postgres user
```properties
spring.datasource.username=postgres
spring.datasource.password=9842
```

### Option B: Use your macOS username (if peer auth works)
```properties
spring.datasource.username=satchit
spring.datasource.password=
```

### Option C: Use your macOS username with password
```properties
spring.datasource.username=satchit
spring.datasource.password=your_password
```
