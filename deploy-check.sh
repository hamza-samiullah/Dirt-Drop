#!/bin/bash

echo "🚀 Vercel Deployment Checklist"
echo "================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "❌ Git not initialized"
    echo "   Run: git init"
    exit 1
else
    echo "✅ Git initialized"
fi

# Check if .env.example exists
if [ -f .env.example ]; then
    echo "✅ .env.example exists"
else
    echo "❌ .env.example missing"
fi

# Check if .gitignore exists
if [ -f .gitignore ]; then
    echo "✅ .gitignore exists"
else
    echo "❌ .gitignore missing"
fi

# Check if vercel.json exists
if [ -f vercel.json ]; then
    echo "✅ vercel.json exists"
else
    echo "❌ vercel.json missing"
fi

# Check if uploads directory exists
if [ -d public/uploads ]; then
    echo "✅ public/uploads directory exists"
else
    echo "❌ public/uploads directory missing"
fi

echo ""
echo "📋 Next Steps:"
echo "1. git add ."
echo "2. git commit -m 'Ready for Vercel deployment'"
echo "3. git remote add origin https://github.com/YOUR_USERNAME/dirt-drop.git"
echo "4. git push -u origin main"
echo "5. Go to https://vercel.com/new and import your repo"
echo "6. Add environment variables (see VERCEL_DEPLOY.md)"
echo "7. Deploy!"
echo ""
echo "📖 Full guide: VERCEL_DEPLOY.md"
