# Deployment Guide - Cards Against Humanity

This guide walks you through deploying the Cards Against Humanity game to a Digital Ocean Droplet using Docker.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Architecture Overview](#architecture-overview)
- [Step 1: Set Up Digital Ocean Droplet](#step-1-set-up-digital-ocean-droplet)
- [Step 2: Configure Domain](#step-2-configure-domain)
- [Step 3: Prepare Server](#step-3-prepare-server)
- [Step 4: Deploy Application](#step-4-deploy-application)
- [Step 5: Set Up SSL](#step-5-set-up-ssl)
- [Maintenance](#maintenance)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

- Digital Ocean account
- Domain name (for SSL/HTTPS)
- Basic command line knowledge
- Git installed locally

## Architecture Overview

The deployment consists of:

- **Nginx** - Reverse proxy with SSL termination (ports 80/443)
- **Backend App** - Express + Socket.IO server (internal port 8080)
- **Redis** - Session store and Socket.IO adapter (internal port 6379)
- **Certbot** - Automatic SSL certificate renewal

All services run in Docker containers orchestrated by docker-compose.

---

## Step 1: Set Up Digital Ocean Droplet

### Create a Droplet

1. Log into [Digital Ocean](https://cloud.digitalocean.com)
2. Click "Create" → "Droplets"
3. Choose configuration:
   - **Image**: Ubuntu 24.04 LTS
   - **Plan**: Basic
   - **CPU Options**: Regular (2GB RAM / 1 CPU) - $12/mo recommended
   - **Disk**: Regular SSD (50GB included)
   - **Datacenter**: Choose closest to your users
   - **Authentication**: SSH keys (recommended) or password
   - **Hostname**: Something like `cah-game-server`

4. Click "Create Droplet"
5. Note the droplet's IP address (e.g., `164.90.XXX.XXX`)

### Initial Server Setup

SSH into your new droplet:

```bash
ssh root@YOUR_DROPLET_IP
```

Update the system:

```bash
apt update && apt upgrade -y
```

Install Docker:

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install docker-compose
apt install docker-compose -y

# Verify installation
docker --version
docker-compose --version
```

---

## Step 2: Configure Domain

### Add DNS Records

In your domain registrar or DNS provider:

1. Add an **A Record**:
   - Name: `@` (or your subdomain like `game`)
   - Value: Your droplet's IP address
   - TTL: 3600

2. Add a **CNAME Record** OR second **A Record** (optional, for www):
   - **Option A (CNAME)**: Name: `www`, Value: `yourdomain.com`, TTL: 3600
   - **Option B (A Record)**: Name: `www`, Value: Your droplet's IP address, TTL: 3600
   - Note: Some DNS providers don't accept `@` for CNAME - use your full domain or create a second A record

### Verify DNS Propagation

Wait a few minutes, then verify:

```bash
# Check from your local machine
dig yourdomain.com
nslookup yourdomain.com
```

The IP should match your droplet's IP.

---

## Step 3: Prepare Server

### Clone Repository

On your droplet:

```bash
# Clone your repository
git clone https://github.com/yourusername/cards-against-humanity.git
cd cards-against-humanity
```

### Configure Environment

Create production environment file:

```bash
cp .env.production.template .env
nano .env
```

Edit the following values:

```bash
# Generate secure secrets
SESSION_SECRET=$(openssl rand -hex 32)
ADMIN_KEY=$(openssl rand -hex 16)

# Set your domain(s)
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

Save and exit (Ctrl+X, Y, Enter in nano).

### Verify Configuration

```bash
# Check that required variables are set
cat .env | grep -E "SESSION_SECRET|ADMIN_KEY|ALLOWED_ORIGINS"
```

Make sure none show "REPLACE_WITH_..." values.

---

## Step 4: Deploy Application

### Run Initial Deployment

```bash
# Make deployment script executable (if not already)
chmod +x deployment/deploy.sh

# Run deployment
./deployment/deploy.sh
```

This will:
- Check environment configuration
- Build Docker images
- Start all services
- Run health checks

### Verify Services

Check that all containers are running:

```bash
docker-compose -f docker-compose.prod.yml ps
```

You should see:
- `cah-nginx` - running
- `cah-app` - running
- `cah-redis` - running
- `cah-certbot` - running

### Test HTTP Access

```bash
# From your local machine
curl http://yourdomain.com
```

You should get a response (HTTP, not HTTPS yet).

---

## Step 5: Set Up SSL

### Initialize SSL Certificates

On your droplet:

```bash
# Make SSL script executable (if not already)
chmod +x deployment/init-ssl.sh

# Run SSL initialization
./deployment/init-ssl.sh yourdomain.com your-email@example.com
```

This script will:
1. Request SSL certificate from Let's Encrypt
2. Configure nginx with SSL
3. Set up automatic certificate renewal

### Verify HTTPS

```bash
# From your local machine
curl https://yourdomain.com
```

You should see your application over HTTPS!

### Test WebSocket Connection

Open your browser to `https://yourdomain.com` and verify:
- Homepage loads
- You can create/join games
- Real-time updates work

---

## Maintenance

### View Logs

```bash
# All services
docker-compose -f docker-compose.prod.yml logs -f

# Specific service
docker-compose -f docker-compose.prod.yml logs -f app
docker-compose -f docker-compose.prod.yml logs -f nginx
docker-compose -f docker-compose.prod.yml logs -f redis
```

### Update Application

#### Automated Deployment (Recommended)

The repository includes a GitHub Actions workflow that automatically deploys when you push to `main`:

1. Push changes to `main` branch
2. GitHub Actions runs all tests
3. If tests pass, deploys to production automatically
4. Zero-downtime deployment

**Setup:** See [CI-CD-SETUP.md](CI-CD-SETUP.md) for configuration instructions.

#### Manual Deployment

When you need to deploy manually:

```bash
./deployment/update.sh
```

This script:
- Pulls latest code
- Rebuilds the app image
- Restarts with zero downtime
- Runs health checks

### Restart Services

```bash
# Restart all services
docker-compose -f docker-compose.prod.yml restart

# Restart specific service
docker-compose -f docker-compose.prod.yml restart app
```

### Stop Services

```bash
docker-compose -f docker-compose.prod.yml down
```

### Redis Management

```bash
# Access Redis CLI
docker-compose -f docker-compose.prod.yml exec redis redis-cli

# Inside Redis:
# - View all keys: KEYS *
# - Get key info: TYPE keyname
# - Delete all data: FLUSHALL
# - Exit: exit
```

### SSL Certificate Renewal

Certificates auto-renew every 12 hours. To manually renew:

```bash
docker-compose -f docker-compose.prod.yml run --rm certbot renew
docker-compose -f docker-compose.prod.yml restart nginx
```

---

## Troubleshooting

### Application Won't Start

1. Check logs:
   ```bash
   docker-compose -f docker-compose.prod.yml logs app
   ```

2. Verify environment variables:
   ```bash
   docker-compose -f docker-compose.prod.yml exec app env | grep -E "SESSION_SECRET|REDIS_HOST"
   ```

3. Check Redis connection:
   ```bash
   docker-compose -f docker-compose.prod.yml exec redis redis-cli ping
   # Should return: PONG
   ```

### SSL Certificate Issues

1. Check certbot logs:
   ```bash
   docker-compose -f docker-compose.prod.yml logs certbot
   ```

2. Verify DNS is correct:
   ```bash
   dig yourdomain.com
   ```

3. Ensure ports 80 and 443 are open:
   ```bash
   # On Digital Ocean, check firewall settings
   # Allow HTTP (80) and HTTPS (443)
   ```

4. Re-run SSL initialization:
   ```bash
   ./deployment/init-ssl.sh yourdomain.com your-email@example.com
   ```

### WebSocket Connection Fails

1. Check nginx configuration:
   ```bash
   docker-compose -f docker-compose.prod.yml exec nginx nginx -t
   ```

2. Verify ALLOWED_ORIGINS in .env matches your domain

3. Check browser console for errors

4. Ensure you're using HTTPS (required for WebSocket)

### Redis Data Lost After Restart

Redis data is persisted in a Docker volume. Check:

```bash
# List volumes
docker volume ls

# Inspect Redis data volume
docker volume inspect cards-against-humanity_redis-data
```

### Out of Memory

If the droplet runs out of memory:

1. Check memory usage:
   ```bash
   free -h
   docker stats
   ```

2. Consider upgrading droplet size in Digital Ocean

3. Add swap space:
   ```bash
   fallocate -l 2G /swapfile
   chmod 600 /swapfile
   mkswap /swapfile
   swapon /swapfile
   echo '/swapfile none swap sw 0 0' >> /etc/fstab
   ```

### Need to Reset Everything

```bash
# Stop and remove all containers, networks, and volumes
docker-compose -f docker-compose.prod.yml down -v

# Remove all data
rm -rf certbot/

# Start fresh
./deployment/deploy.sh
./deployment/init-ssl.sh yourdomain.com your-email@example.com
```

---

## Cost Estimate

**Monthly Costs:**
- Droplet (2GB): ~$12/mo
- SSL Certificate: Free (Let's Encrypt)
- Bandwidth: First 1TB free, then $0.01/GB

**Total: ~$12-15/month**

---

## Security Recommendations

1. **Enable UFW Firewall:**
   ```bash
   ufw allow OpenSSH
   ufw allow 80/tcp
   ufw allow 443/tcp
   ufw enable
   ```

2. **Set up automatic updates:**
   ```bash
   apt install unattended-upgrades
   dpkg-reconfigure --priority=low unattended-upgrades
   ```

3. **Regular backups:**
   - Use Digital Ocean's automated backups ($2.40/mo)
   - Or manually backup Redis data periodically

4. **Monitor logs regularly**

5. **Keep SESSION_SECRET and ADMIN_KEY secure**

---

## Additional Resources

- [Digital Ocean Documentation](https://docs.digitalocean.com/)
- [Docker Documentation](https://docs.docker.com/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [Nginx Documentation](https://nginx.org/en/docs/)

---

## Need Help?

Check the logs first:
```bash
docker-compose -f docker-compose.prod.yml logs -f
```

If you're stuck, open an issue on GitHub with:
- Error messages from logs
- Your deployment steps
- System information (`uname -a`, `docker version`)
