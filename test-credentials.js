// Quick test script to verify credentials
const fs = require('fs')
const path = require('path')

// Read .env.local manually
const envPath = path.join(__dirname, '.env.local')
const envContent = fs.readFileSync(envPath, 'utf8')

const env = {}
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/)
  if (match) {
    env[match[1]] = match[2].replace(/^["']|["']$/g, '')
  }
})

console.log('Testing Configuration...\n')

// Check uploads directory
const uploadsDir = path.join(__dirname, 'public', 'uploads')
const uploadsExists = fs.existsSync(uploadsDir)
console.log('Uploads Directory:', uploadsExists ? '✓ Exists' : '✗ Missing')

if (uploadsExists) {
  const files = fs.readdirSync(uploadsDir).filter(f => f !== '.gitkeep')
  console.log(`  Files: ${files.length} uploaded`)
}

console.log('\n--- Instagram Config ---')
console.log('Access Token:', env.INSTAGRAM_ACCESS_TOKEN ? '✓ Set' : '✗ Missing (stored in localStorage)')
console.log('Business Account ID:', env.INSTAGRAM_BUSINESS_ACCOUNT_ID ? `✓ Set (${env.INSTAGRAM_BUSINESS_ACCOUNT_ID})` : '✗ Missing (auto-discovered)')

console.log('\n--- Make.com Webhooks ---')
const contentWebhook = env.MAKE_CONTENT_WEBHOOK
const isConfigured = contentWebhook && !contentWebhook.includes('YOUR_')
console.log('Content Webhook:', isConfigured ? '✓ Configured' : '✗ Not configured')
