# 💕 20th Anniversary Special Website

A beautiful, interactive web application celebrating 20 years of love and togetherness, with New Year 2026 wishes.

## 🎉 Features

### Interactive Activities
- **Mystery Surprise Box** - Shake your phone or move your mouse to reveal a special message (inspired by rishubaby)
- **Photo Carousel** - Swipe-enabled photo gallery with smooth transitions
- **Interactive Heart** - Tap/click 20 times to trigger a special confetti celebration
- **Music Player** - Beautiful player with vinyl record animation for anniversary song
- **Virtual Greeting Card** - Interactive envelope that opens to reveal a heartfelt message

### Appreciation Sections
- **Anniversary Counter** - Real-time display of years, days, and time together
- **Reasons We Love You** - Interactive flip cards showing 6 reasons they're special
- **Timeline** - Beautiful visual journey through 20 years of marriage
- **Personal Message** - Heartfelt note from boyfriend perspective thanking for Rishu
- **Wishes Section** - Beautiful animated wishes for the future
- **Photo Gallery** - Grid of photo placeholders with hover effects

### Design & UX
- **Hero Section** with animated floating hearts
- **Fully Responsive** - works perfectly on mobile, tablet, and desktop
- **Touch & Click Support** - optimized for both touch and mouse interactions
- **Smooth Animations** using Framer Motion
- **Sequential Flow** - Activities naturally lead from one to another
- **Accessible** with ARIA labels and semantic HTML
- **New Year 2026 Theme** - Celebration elements throughout

## 🚀 Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **React Confetti** - Celebration effects

## 📦 Installation & Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Customization

### Adding Photos

**For the Photo Carousel:**
1. Add your images to `public/photos/` directory
2. Name them `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, `photo4.jpg`, `photo5.jpg`, `photo6.jpg`
3. Recommended size: 1920x1280 pixels (4:3 ratio)

**For the Photo Gallery:**
1. Replace placeholders in the `PhotoGallerySection` component
2. Add images to the `public` folder

### Adding Your Anniversary Song

1. Place your song file at `public/anniversary-song.mp3`
2. Supported formats: MP3, WAV, OGG
3. Keep file size under 10MB for best performance

### Editing Messages

- Update the personal message in `app/components/PersonalMessageSection.tsx`
- Customize timeline events in `app/components/TimelineSection.tsx`
- Modify greeting card content in `app/components/VirtualGreetingCard.tsx`
- Edit appreciation reasons in `app/components/ReasonsWeLoveYou.tsx`

### Changing Colors

Modify the Tailwind color scheme in `app/globals.css` or component files

## 🌐 Deploying to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Click "Deploy" (Vercel auto-detects Next.js configuration)

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🎯 Usage Tips

- **Mobile Users**: The app is fully touch-optimized. Tap the heart 20 times for a special surprise!
- **Desktop Users**: Hover effects and animations work beautifully on desktop too
- **Accessibility**: The app follows ARIA guidelines and works with screen readers

## 📱 Mobile-First Design

The application is built with mobile users in mind:
- Touch-optimized interactions
- Responsive layouts that adapt to any screen size
- Fast load times with Next.js optimization
- Smooth scrolling and animations
- Prevents accidental zooming

## 🎊 Special Features

### Interactive Activities (Sequential Flow)
1. **Hero Section** - Start with animated hearts and New Year wishes
2. **Timeline** - Journey through 20 years of love
3. **Anniversary Counter** - See real-time days together
4. **Mystery Box** - Shake/move to reveal surprise message
5. **Photo Carousel** - Swipe through memory lane (6 photos)
6. **Interactive Heart** - Tap 20 times for confetti celebration
7. **Reasons We Love You** - 6 flip cards with appreciation messages
8. **Music Player** - Listen to your special anniversary song
9. **Virtual Greeting Card** - Open envelope for heartfelt message
10. **Photo Gallery** - Grid view of more memories
11. **Personal Message** - Deep gratitude and love letter
12. **Wishes** - Beautiful wishes for the future

### Mobile-First & Touch-Optimized
- Shake-to-reveal works on mobile devices (with device motion permission)
- Swipe gestures for photo carousel
- Touch-optimized buttons and interactions
- Responsive layouts that adapt to any screen size
- Prevents accidental zooming
- Large, easy-to-tap elements

### Celebration Elements
- Confetti animations on special interactions
- Floating hearts throughout
- Smooth page transitions
- Animated counters and timers
- Interactive flip cards
- Vinyl record spinning animation

## 🛠️ Development Commands

```bash
# Type checking (TypeScript)
npx tsc --noEmit

# Linting
npm run lint

# Build
npm run build
```

## 💝 About

Made with ❤️ for a special 20th anniversary celebration. This project showcases modern web development skills including:

- React & Next.js App Router
- TypeScript for type safety
- Tailwind CSS for responsive design
- Framer Motion for smooth animations
- Accessibility best practices
- Mobile-first responsive design
- Touch and click interaction handling
- Performance optimization

Perfect for non-tech-literate users - simple, beautiful, and easy to navigate!

## 📄 License

Made with love for a personal celebration 💕

