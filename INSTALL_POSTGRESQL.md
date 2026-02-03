# Install PostgreSQL on macOS

## Option 1: Install via Homebrew (Recommended)

### Step 1: Install PostgreSQL
```bash
brew install postgresql@15
```

Or install latest version:
```bash
brew install postgresql
```

### Step 2: Start PostgreSQL Service
```bash
brew services start postgresql@15
```

Or for latest version:
```bash
brew services start postgresql
```

### Step 3: Verify Installation
```bash
psql --version
```

You should see: `psql (PostgreSQL) 15.x` or similar

### Step 4: Set Up Initial Database
```bash
psql postgres
```

Then create your user and database:
```sql
CREATE USER postgres WITH PASSWORD '9842';
ALTER USER postgres CREATEDB;
CREATE DATABASE nepkartdb OWNER postgres;
\q
```

---

## Option 2: Install PostgreSQL.app (GUI)

1. Download from: https://postgresapp.com/
2. Install the app
3. Open PostgreSQL.app
4. Click "Initialize" to create a new server
5. The default user is your macOS username

---

## Option 3: Use Docker (If you have Docker)

```bash
docker run --name nepkart-postgres \
  -e POSTGRES_PASSWORD=9842 \
  -e POSTGRES_DB=nepkartdb \
  -p 5432:5432 \
  -d postgres:15
```

---

## After Installation: Create Database

Once PostgreSQL is installed and running:

```bash
psql postgres
```

Then run:
```sql
CREATE DATABASE nepkartdb;
\c nepkartdb
```

Then run all the CREATE TABLE commands from `backend/database/STEP_BY_STEP.txt`

---

## Quick Check Commands

```bash
# Check if PostgreSQL is running
brew services list | grep postgresql

# Check PostgreSQL version
psql --version

# Connect to PostgreSQL
psql -U postgres

# List databases
psql -U postgres -l
```
