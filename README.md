# Full Stack Application - Backend & Frontend

## Overview

This is a full-stack web application template with a complete backend and frontend setup, designed for easy development and deployment. Created for the ENSOLVERS Technical Test.

## Architecture

- **Backend**: Containerized API with cache and database services
- **Frontend**: Modern web application with hot-reload development
- **Infrastructure**: Docker Compose orchestration for all services

## Prerequisites

Before running this project, ensure you have the following installed:

- **Docker** (version 20.10 or higher)
- **Docker Compose** (version 2.0 or higher)

To verify your installation:
```bash
docker --version
docker compose version
```

## Project Structure

```
grade-project-2/
├── backend/
│   ├── docker-compose.yml    # Backend services (api, cache, database)
│   ├── .env.example           # Backend environment template
│   └── ...
├── frontend/
│   ├── docker-compose.yml    # Frontend service
│   ├── .env.example           # Frontend environment template
│   └── ...
├── local-dev/                 # Local development scripts
│   ├── run.dev.sh             # Start development environment
│   ├── run.stop.sh            # Stop all services
│   ├── run.logs.sh            # View service logs
│   ├── run.status.sh          # Check service status
│   └── run.clean.sh           # Clean environment (removes volumes)
└── README.md
```

## Quick Start

### 1. First Time Setup

Make the scripts executable (only needed once):
```bash
chmod +x local-dev/run.dev.sh local-dev/run.stop.sh local-dev/run.logs.sh local-dev/run.clean.sh local-dev/run.status.sh
```

### 2. Start Development Environment

```bash
./local-dev/run.dev.sh
```

This script will:
- ✅ Check Docker installation and status
- ✅ Create `.env` files from `.env.example` (if they don't exist)
- ✅ Start backend services (cache, database, API)
- ✅ Perform health checks on all services
- ✅ Start frontend services
- ✅ Display service status and helpful commands
- ✅ Follow frontend logs (Ctrl+C to stop)

**Options:**
- `./local-dev/run.dev.sh --rebuild` or `./local-dev/run.dev.sh -r` - Rebuild containers before starting

### 3. Stop Development Environment

```bash
./local-dev/run.stop.sh
```

Or press `Ctrl+C` if `local-dev/run.dev.sh` is still running.

## Development Scripts

### 📋 View Logs

View logs from all services:
```bash
./local-dev/run.logs.sh
```

View logs from specific services:
```bash
./local-dev/run.logs.sh backend    # All backend services
./local-dev/run.logs.sh frontend   # Frontend only
./local-dev/run.logs.sh api        # API service only
./local-dev/run.logs.sh cache      # Cache service only
./local-dev/run.logs.sh database   # Database service only
```

### 🧹 Clean Environment

Remove all containers, volumes, and networks (fresh start):
```bash
./local-dev/run.clean.sh
```

⚠️ **Warning**: This will delete all data in your development databases!

### 🔄 Rebuild Containers

If you've made changes to Dockerfiles or dependencies:
```bash
./local-dev/run.dev.sh --rebuild
```

## Manual Docker Commands

If you prefer to run services manually:

### Backend Only
```bash
# Start
docker compose -f ./backend/docker-compose.yml up -d

# Stop
docker compose -f ./backend/docker-compose.yml down

# View logs
docker compose -f ./backend/docker-compose.yml logs -f
```

### Frontend Only
```bash
# Start
docker compose -f ./frontend/docker-compose.yml up -d

# Stop
docker compose -f ./frontend/docker-compose.yml down

# View logs
docker compose -f ./frontend/docker-compose.yml logs -f
```

## Environment Configuration

### Backend Configuration

Edit `backend/.env` to configure:
- `API_PORT` - API server port
- `DATABASE_PORT` - Database port
- `CACHE_PORT` - Cache server port
- Other backend-specific variables

### Frontend Configuration

Edit `frontend/.env` to configure:
- `FRONTEND_PORT` - Frontend development server port
- `NODE_ENV` - Node environment (development/production)
- `HOSTNAME` - Server hostname
- Other frontend-specific variables

## Troubleshooting

### Docker Not Running
```
[ERROR] Docker daemon is not running. Please start Docker.
```
**Solution**: Start Docker Desktop or Docker daemon

### Port Already in Use
```
Error: port is already allocated
```
**Solution**: 
1. Stop conflicting services
2. Change ports in `.env` files
3. Run `./run.clean.sh` to remove old containers

### Services Failed to Start
```
[ERROR] Backend services failed to start
```
**Solution**:
1. Check logs: `./local-dev/run.logs.sh backend`
2. Clean environment: `./local-dev/run.clean.sh`
3. Rebuild: `./local-dev/run.dev.sh --rebuild`

### Environment Files Missing
The script automatically creates `.env` files from `.env.example`. If you see warnings:
```
[WARNING] backend/.env.example not found, skipping...
```
**Solution**: Ensure `.env.example` files exist in backend/frontend directories

## Features

### Development Script Features
- ✅ **Pre-flight checks** - Validates Docker installation
- ✅ **Smart environment setup** - Only copies `.env` if missing
- ✅ **Health checks** - Ensures services are ready
- ✅ **Color-coded logging** - Easy to read output
- ✅ **Graceful shutdown** - Ctrl+C cleanup
- ✅ **Error handling** - Clear error messages
- ✅ **Service status** - Real-time service monitoring

### Production Deployment

For production deployment, refer to the production deployment guide (coming soon) or use:
```bash
./run.sh
```

## Contributing

When contributing to this project:
1. Ensure all services start successfully with `./local-dev/run.dev.sh`
2. Test your changes in development mode
3. Update documentation if adding new features
4. Follow the existing code style

## Author

**Miguel Benjamin Atencio Vargas**

## License

[Add your license information here]

---

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

## Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review service logs: `./local-dev/run.logs.sh`
3. Try cleaning the environment: `./local-dev/run.clean.sh`
4. Rebuild containers: `./local-dev/run.dev.sh --rebuild`
