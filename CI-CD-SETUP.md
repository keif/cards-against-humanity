# CI/CD Setup Guide

This guide explains how to set up automated deployments to your Digital Ocean server when you push to the `main` branch.

## Overview

The deployment workflow:
1. **Triggers** on push to `main` branch
2. **Runs tests** (all 275 tests must pass)
3. **Deploys** to production server via SSH
4. **Uses zero-downtime** deployment strategy

## GitHub Secrets Setup

You need to configure three secrets in your GitHub repository:

### 1. Navigate to GitHub Secrets

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

### 2. Add Required Secrets

#### `SSH_HOST`
- **Name:** `SSH_HOST`
- **Value:** `174.138.68.25`
- **Description:** IP address of your Digital Ocean droplet

#### `SSH_USER`
- **Name:** `SSH_USER`
- **Value:** `root`
- **Description:** SSH username for server access

#### `SSH_PRIVATE_KEY`
- **Name:** `SSH_PRIVATE_KEY`
- **Value:** Your private SSH key content
- **Description:** The private key that matches the public key on your server

**To get your SSH private key:**

```bash
# If using the keif-digitalocean key
cat ~/.ssh/keif-digitalocean
```

Copy the **entire output** including:
- `-----BEGIN OPENSSH PRIVATE KEY-----`
- All the key content
- `-----END OPENSSH PRIVATE KEY-----`

**Security Note:** Never share or commit this private key. GitHub Secrets are encrypted and only accessible to GitHub Actions.

## How the Workflow Works

### Workflow File Location
`.github/workflows/deploy.yml`

### Jobs

#### Job 1: Test
- Checks out code
- Installs Node.js 20 and pnpm
- Caches dependencies for faster builds
- Runs `pnpm test` (client + server tests)
- **Deployment only proceeds if all tests pass**

#### Job 2: Deploy
- Only runs if tests pass
- SSH into your Digital Ocean server
- Executes `~/cards-against-humanity/deployment/update.sh`
- Reports deployment status

### Deployment Script
The `deployment/update.sh` script handles:
1. Git pull latest code
2. Rebuild Docker app image
3. Zero-downtime container swap
4. Health check verification

## Testing the Setup

### 1. Verify Secrets Are Set

After adding the three secrets, verify them:
- Go to **Settings** → **Secrets and variables** → **Actions**
- You should see three secrets: `SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY`

### 2. Push to Main

Make a small change and push to `main`:

```bash
# Make a small change (e.g., add a comment)
echo "# Test CI/CD" >> README.md

# Commit and push
git add README.md
git commit -m "test: verify CI/CD pipeline"
git push origin main
```

### 3. Monitor Deployment

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. You'll see the workflow running
4. Click on the workflow run to see detailed logs

**Expected timeline:**
- Tests: ~2-3 minutes
- Deployment: ~30-60 seconds
- **Total: ~3-4 minutes**

## Notifications

### GitHub Actions Annotations
- ✅ Success: Green checkmark on commit
- ❌ Failure: Red X on commit
- Click the status icon to see detailed logs

### Email Notifications
Configure in your GitHub account settings:
1. Go to **Settings** (your account, not the repo)
2. Navigate to **Notifications**
3. Under **Actions**, enable "Send notifications for failed workflows only"

## Troubleshooting

### Tests Fail
- **Symptom:** Workflow stops at "Run Tests" step
- **Solution:** Run `pnpm test` locally to identify failing tests
- **Fix tests before pushing to `main`**

### SSH Connection Fails
- **Symptom:** "Deploy to Production" step fails with connection error
- **Possible causes:**
  - Wrong `SSH_HOST` (verify IP: 174.138.68.25)
  - Wrong `SSH_USER` (should be `root`)
  - Wrong or malformed `SSH_PRIVATE_KEY`
  - Server firewall blocking GitHub Actions IPs

**Verify SSH key locally:**
```bash
ssh -i ~/.ssh/keif-digitalocean root@174.138.68.25
```

If this works, the key is correct.

### Deployment Script Fails
- **Symptom:** SSH connects but deployment fails
- **Check server logs:**
```bash
ssh root@174.138.68.25
cd ~/cards-against-humanity
docker-compose -f docker-compose.prod.yml logs app
```

### Health Check Fails
- **Symptom:** Deployment completes but health check warning appears
- **Check app status:**
```bash
ssh root@174.138.68.25
cd ~/cards-against-humanity
docker-compose -f docker-compose.prod.yml ps
docker logs cah-app --tail=50
```

## Manual Deployment

You can still deploy manually anytime:

```bash
ssh root@174.138.68.25
cd ~/cards-against-humanity
./deployment/update.sh
```

## Workflow Customization

### Deploy on PR Merge Only
To deploy only when PRs are merged (not every push to main):

```yaml
on:
  pull_request:
    types: [closed]
    branches:
      - main
```

Then add a condition to the deploy job:
```yaml
if: github.event.pull_request.merged == true
```

### Add Slack Notifications
Install the Slack GitHub app and add to the workflow:

```yaml
- name: Notify Slack
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### Skip CI/CD
To push without triggering deployment, include `[skip ci]` in commit message:

```bash
git commit -m "docs: update README [skip ci]"
```

## Security Best Practices

1. **Never commit secrets** - Always use GitHub Secrets
2. **Rotate SSH keys** - Periodically generate new keys
3. **Limit SSH key permissions** - Use dedicated deploy keys when possible
4. **Monitor failed deployments** - Investigate all failures
5. **Review workflow runs** - Check the Actions tab regularly

## Next Steps

After successful deployment:
- ✅ Monitor the Actions tab for deployment status
- ✅ Verify site is accessible: https://phuckingcards.com
- ✅ Check server logs for any errors
- ✅ Set up uptime monitoring (UptimeRobot, etc.)

## Support

If you encounter issues:
1. Check the workflow logs in the Actions tab
2. Verify all three GitHub secrets are set correctly
3. Test SSH connection manually from your local machine
4. Review the deployment script logs on the server
