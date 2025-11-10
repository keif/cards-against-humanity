#!/bin/bash
# Initialize SSL certificates with Let's Encrypt

set -e

echo "================================"
echo "SSL Certificate Initialization"
echo "================================"
echo

# Check if domain is provided
if [ -z "$1" ]; then
    echo "Error: Domain name is required"
    echo "Usage: ./init-ssl.sh your-domain.com email@example.com"
    exit 1
fi

if [ -z "$2" ]; then
    echo "Error: Email is required for Let's Encrypt"
    echo "Usage: ./init-ssl.sh your-domain.com email@example.com"
    exit 1
fi

DOMAIN=$1
EMAIL=$2

echo "Domain: $DOMAIN"
echo "Email: $EMAIL"
echo

# Create required directories
echo "Creating certificate directories..."
mkdir -p certbot/conf certbot/www

# Download recommended TLS parameters
if [ ! -f "certbot/conf/options-ssl-nginx.conf" ]; then
    echo "Downloading recommended TLS parameters..."
    curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > certbot/conf/options-ssl-nginx.conf
fi

if [ ! -f "certbot/conf/ssl-dhparams.pem" ]; then
    echo "Downloading DH parameters..."
    curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > certbot/conf/ssl-dhparams.pem
fi

# Update nginx config with domain
echo
echo "Updating nginx configuration with domain: $DOMAIN"
sed -i.bak "s/your-domain.com/$DOMAIN/g" nginx/conf.d/default.conf
rm nginx/conf.d/default.conf.bak

# Create temporary nginx config for initial certificate
echo
echo "Creating temporary nginx configuration..."
cat > nginx/conf.d/default.conf.temp << EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 200 'Waiting for SSL certificate...';
        add_header Content-Type text/plain;
    }
}
EOF

# Backup original config and use temp
mv nginx/conf.d/default.conf nginx/conf.d/default.conf.ssl
mv nginx/conf.d/default.conf.temp nginx/conf.d/default.conf

# Start nginx for certificate challenge
echo
echo "Starting nginx for certificate challenge..."
docker-compose -f docker-compose.prod.yml up -d nginx

# Wait for nginx to be ready
echo "Waiting for nginx to start..."
sleep 5

# Request certificate
echo
echo "Requesting SSL certificate from Let's Encrypt..."
docker-compose -f docker-compose.prod.yml run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN \
    -d www.$DOMAIN

# Check if certificate was issued
if [ ! -d "certbot/conf/live/$DOMAIN" ]; then
    echo
    echo "Error: Certificate was not issued"
    echo "Please check the certbot logs above for errors"
    exit 1
fi

# Restore SSL nginx config
echo
echo "Certificate obtained successfully!"
echo "Restoring SSL nginx configuration..."
mv nginx/conf.d/default.conf nginx/conf.d/default.conf.temp
mv nginx/conf.d/default.conf.ssl nginx/conf.d/default.conf

# Restart nginx with SSL config
echo "Restarting nginx with SSL configuration..."
docker-compose -f docker-compose.prod.yml restart nginx

echo
echo "================================"
echo "SSL initialization complete!"
echo "================================"
echo
echo "Your certificates are located in: certbot/conf/live/$DOMAIN/"
echo "Certificates will auto-renew every 12 hours"
