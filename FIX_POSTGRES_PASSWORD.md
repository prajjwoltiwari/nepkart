# Fix PostgreSQL Password Authentication

## Problem
Backend can't connect: `password authentication failed for user "postgres"`

## Solution: Set Password for postgres User

### Step 1: Connect to PostgreSQL
```bash
psql -U postgres
```

If that doesn't work, try:
```bash
psql postgres
```

### Step 2: Set Password for postgres User

Once connected, run:
```sql
ALTER USER postgres WITH PASSWORD '9842';
```

Or if you want a different password:
```sql
ALTER USER postgres WITH PASSWORD 'your_new_password';
```

Then update `application.properties` with the new password.

### Step 3: Verify Password Works

Exit PostgreSQL (`\q`), then test:
```bash
psql -U postgres -d nepkartdb
```

Enter password `9842` when prompted. If it works, you're good!

### Step 4: Restart Backend

```bash
cd /Users/satchit/CURSOR/backend
mvn spring-boot:run
```

---

## Alternative: Use Your macOS Username

If password authentication doesn't work, PostgreSQL might be using peer authentication. Try updating `application.properties`:

Change:
```properties
spring.datasource.username=postgres
spring.datasource.password=9842
```

To:
```properties
spring.datasource.username=satchit
spring.datasource.password=
```

Then restart the backend.
