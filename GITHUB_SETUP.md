# GitHub Setup Instructions

## Option 1: Create repo on GitHub.com (Recommended)

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon in the top right, then select **New repository**
3. Fill in:
   - **Repository name**: `portfolio` (or your preferred name)
   - **Description**: (optional)
   - **Visibility**: Choose **Public** or **Private**
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **Create repository**
5. GitHub will show you commands. Run these in your terminal:

```bash
cd "/Users/Art/Library/Mobile Documents/com~apple~CloudDocs/Webs/Portfolio"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## Option 2: Using GitHub CLI (if installed)

If you have GitHub CLI installed:

```bash
cd "/Users/Art/Library/Mobile Documents/com~apple~CloudDocs/Webs/Portfolio"
gh repo create portfolio --public --source=. --remote=origin --push
```

## Future Updates

After making changes, commit and push:

```bash
git add .
git commit -m "Your commit message"
git push
```

## Notes

- The `.gitignore` file already excludes `node_modules/` and `dist/`, so these won't be pushed to GitHub
- Your source images are in `public/images/` and will be included in the repo
- For production builds, run `npm run build` locally—the built files go to `dist/` which is ignored

