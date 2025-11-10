# Quick Start Deployment Guide

Get your Cards Against Humanity game live in ~15 minutes.

## Prerequisites

✓ Digital Ocean account
✓ Domain name
✓ Basic terminal knowledge

---

## 1. Create Droplet

1. Log into Digital Ocean → Create Droplet
2. Ubuntu 24.04 LTS, Basic 2GB ($12/mo)
3. Add SSH key
4. Create → Note IP address

---

## 2. Set Up Server

```bash
# SSH into droplet
ssh root@YOUR_DROPLET_IP

# Install Docker
curl -fsSL https://get.docker.com | sh
apt install docker-compose -y

# Clone repo
git clone https://github.com/keif/cards-against-humanity.git
cd cards-against-humanity
```

---

## 3. Configure DNS

In your domain provider:
- **A Record**: `@` → Your droplet IP
- **CNAME**: `www` → `@`

Wait 5-10 minutes for propagation.

---

## 4. Configure App

```bash
# Create .env file
cp .env.production.template .env

# Generate secrets
echo "SESSION_SECRET=$(openssl rand -hex 32)" >> .env
echo "ADMIN_KEY=$(openssl rand -hex 16)" >> .env

# Edit domain
nano .env
# Set ALLOWED_ORIGINS=https://yourdomain.com
```

---

## 5. Deploy

```bash
# Deploy application
./deployment/deploy.sh

# Set up SSL (replace with your domain and email)
./deployment/init-ssl.sh yourdomain.com your-email@example.com
```

---

## 6. Test

Open `https://yourdomain.com` in your browser!

---

## Common Commands

```bash
# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Update app
./deployment/update.sh

# Restart services
docker-compose -f docker-compose.prod.yml restart

# Stop everything
docker-compose -f docker-compose.prod.yml down
```

---

## Troubleshooting

**App won't start?**
```bash
docker-compose -f docker-compose.prod.yml logs app
```

**SSL issues?**
- Check DNS: `dig yourdomain.com`
- Re-run: `./deployment/init-ssl.sh yourdomain.com email@example.com`

**WebSocket not working?**
- Must use HTTPS
- Check ALLOWED_ORIGINS in .env matches your domain

---

For detailed instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)
