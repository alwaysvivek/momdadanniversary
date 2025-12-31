# 🚀 Quick Deployment Guide

## Deploy to Vercel (Easiest - Recommended)

### Option 1: Via Vercel Dashboard
1. Visit [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New" → "Project"
3. Import your GitHub repository `alwaysvivek/momdadanniversary`
4. Vercel will auto-detect Next.js - just click "Deploy"
5. Wait 2-3 minutes for deployment
6. Copy the deployment URL and share with parents! 🎉

### Option 2: Via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd /path/to/momdadanniversary
vercel

# Follow prompts, then get your deployment URL
```

## Test Locally First

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Visit http://localhost:3000 in your browser
# Test on mobile by visiting http://YOUR_IP:3000 from phone
```

## Build for Production

```bash
# Create production build
npm run build

# Test production build locally
npm start
```

## What Parents Will See

1. **Hero Section** - Beautiful greeting with floating hearts
2. **Timeline** - Their 20-year journey visualized
3. **Interactive Heart** - Tap 20 times for confetti surprise!
4. **Photo Gallery** - Beautiful placeholder cards (can be replaced with real photos)
5. **Personal Message** - Your heartfelt message thanking them for Rishu
6. **Wishes** - Beautiful animated well-wishes
7. **Footer** - Date and celebration message

## Tips for Parents

- **Mobile users**: Just tap anywhere to interact
- **Desktop users**: Click and hover for effects
- **Special surprise**: Tap the heart button 20 times!
- **Smooth scrolling**: Click "Begin the Journey" to scroll down

## Customization (Optional)

### Add Real Photos
1. Add photos to `public/photos/` folder
2. Update `app/components/PhotoGallerySection.tsx`
3. Replace placeholder emoji with `<Image src="/photos/yourphoto.jpg" ... />`

### Add Background Music
1. Add `celebration.mp3` to `public/` folder
2. The music player button will automatically work

### Change Colors
- Edit `app/globals.css` for global color themes
- Edit individual component files for specific sections

## Vercel Deployment URL Format

Your site will be available at:
- `https://momdadanniversary.vercel.app` (or similar)
- Custom domain can be added later in Vercel settings

## Performance

- ✅ Static Generation (super fast loading)
- ✅ Optimized images and fonts
- ✅ Mobile-first responsive design
- ✅ Works offline after first load

## Support

If something doesn't work:
1. Check browser console for errors (F12)
2. Ensure all dependencies are installed (`npm install`)
3. Try clearing browser cache
4. Rebuild the project (`npm run build`)

## Sharing with Parents

1. Get your Vercel deployment URL (e.g., `momdadanniversary.vercel.app`)
2. Test it on your phone first
3. Send them the link via WhatsApp/SMS
4. Best viewed on New Year's Day (Jan 1, 2026)! 🎊

---

**Made with ❤️ for Mom & Dad's 20th Anniversary**
