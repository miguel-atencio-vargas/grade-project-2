# Development Quick Reference

## Common Commands

### Start Development
```bash
./local-dev/run.dev.sh              # Start all services
./local-dev/run.dev.sh --rebuild    # Rebuild and start
```

### Stop Development
```bash
./local-dev/run.stop.sh             # Stop all services
# OR press Ctrl+C in local-dev/run.dev.sh terminal
```

### View Logs
```bash
./local-dev/run.logs.sh             # All logs
./local-dev/run.logs.sh backend     # Backend only
./local-dev/run.logs.sh frontend    # Frontend only
./local-dev/run.logs.sh api         # API only
```

### Clean Environment
```bash
./local-dev/run.clean.sh            # Remove all containers & volumes
```

## Service Ports

Check your `.env` files for actual port numbers:
- **Frontend**: `FRONTEND_PORT` (default: usually 3000)
- **API**: `API_PORT` (default: usually 3001)
- **Database**: `DATABASE_PORT`
- **Cache**: `CACHE_PORT`

## Troubleshooting Checklist

1. ✅ Is Docker running?
   ```bash
   docker info
   ```

2. ✅ Are ports available?
   ```bash
   lsof -i :3000  # Check specific port
   ```

3. ✅ Check service status
   ```bash
   docker compose -f ./backend/docker-compose.yml ps
   docker compose -f ./frontend/docker-compose.yml ps
   ```

4. ✅ View recent logs
   ```bash
   ./local-dev/run.logs.sh
   ```

5. ✅ Clean restart
   ```bash
   ./local-dev/run.clean.sh
   ./local-dev/run.dev.sh --rebuild
   ```

## Development Workflow

1. **Start services**: `./local-dev/run.dev.sh`
2. **Make changes**: Edit code (hot-reload enabled)
3. **View logs**: `./local-dev/run.logs.sh` in another terminal
4. **Test changes**: Access services via browser
5. **Stop services**: `Ctrl+C` or `./local-dev/run.stop.sh`

## File Locations

- Backend code: `./backend/`
- Frontend code: `./frontend/`
- Backend env: `./backend/.env`
- Frontend env: `./frontend/.env`
- Docker configs: `./backend/docker-compose.yml`, `./frontend/docker-compose.yml`

## Environment Files

### First Time Setup
The script auto-creates `.env` from `.env.example` if missing.

### Manual Setup
```bash
cp ./backend/.env.example ./backend/.env
cp ./frontend/.env.example ./frontend/.env
```

### Edit Configuration
```bash
# Backend
nano ./backend/.env

# Frontend
nano ./frontend/.env
```

## Docker Commands (Manual)

### Backend
```bash
# Start
docker compose -f ./backend/docker-compose.yml up -d

# Stop
docker compose -f ./backend/docker-compose.yml down

# Rebuild
docker compose -f ./backend/docker-compose.yml up -d --build

# Logs
docker compose -f ./backend/docker-compose.yml logs -f
```

### Frontend
```bash
# Start
docker compose -f ./frontend/docker-compose.yml up -d

# Stop
docker compose -f ./frontend/docker-compose.yml down

# Rebuild
docker compose -f ./frontend/docker-compose.yml up -d --build

# Logs
docker compose -f ./frontend/docker-compose.yml logs -f
```

## Common Issues

### "Docker daemon is not running"
→ Start Docker Desktop

### "Port already allocated"
→ Change port in `.env` or stop conflicting service

### "Services failed to start"
→ Run `./local-dev/run.logs.sh` to see errors
→ Try `./local-dev/run.clean.sh` then `./local-dev/run.dev.sh --rebuild`

### Changes not reflecting
→ Check if hot-reload is working
→ Try `./local-dev/run.dev.sh --rebuild`

## Tips

- Keep `./local-dev/run.dev.sh` running in one terminal
- Use another terminal for `./local-dev/run.logs.sh`
- Use `Ctrl+C` to gracefully stop services
- Run `./local-dev/run.clean.sh` for a fresh start
- Use `--rebuild` flag after dependency changes
