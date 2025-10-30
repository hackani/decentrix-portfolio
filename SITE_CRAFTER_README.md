# Site Crafter - IT Services Website

A comprehensive website for Site Crafter, an IT services providing firm, featuring both public landing page and authenticated dashboard.

## 🚀 Features

### Public Landing Page (`/landing`)
- **Hero Section**: Eye-catching introduction with call-to-action
- **About Section**: Company information with parallax background
- **Services Section**: Showcase of IT services offered
- **Projects Section**: Portfolio of completed projects
- **Team Section**: Team member profiles
- **Contact Form**: Working contact form with email integration
- **Responsive Design**: Mobile-friendly layout

### Authentication System
- **Login Page** (`/login`): Secure authentication with demo credentials
- **Protected Routes**: Dashboard pages require authentication
- **Session Management**: Persistent login state using localStorage

### Dashboard Pages (Authenticated Users)
- **Home Dashboard** (`/dashboard`): Overview with stats and recent projects
- **About Page** (`/dashboard/about`): Detailed company information
- **Services Page** (`/dashboard/services`): Comprehensive service offerings
- **Pricing Page** (`/dashboard/pricing`): Service packages and pricing plans
- **Contact Page** (`/dashboard/contact`): Contact information and form

## 🔐 Demo Credentials

```
Email: admin@sitecrafter.com
Password: admin123
```

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Heroicons (SVG)
- **Email**: Nodemailer for contact form
- **State Management**: React Context API

## 📁 Project Structure

```
src/
├── app/
│   ├── api/contact/route.ts          # Contact form API endpoint
│   ├── dashboard/                    # Protected dashboard pages
│   │   ├── page.tsx                  # Dashboard home
│   │   ├── about/page.tsx            # About page
│   │   ├── services/page.tsx         # Services page
│   │   ├── pricing/page.tsx          # Pricing page
│   │   └── contact/page.tsx          # Contact page
│   ├── landing/page.tsx              # Public landing page
│   ├── login/page.tsx                # Login page
│   ├── layout.tsx                    # Root layout with AuthProvider
│   └── page.tsx                      # Redirects to landing
├── components/
│   ├── AnimatedBackground.tsx        # Animated background component
│   ├── DashboardLayout.tsx           # Dashboard layout with sidebar
│   ├── FloatingShapes.tsx            # Floating animation shapes
│   ├── ParallaxSection.tsx           # Parallax scrolling component
│   ├── ScrollableProjects.tsx        # Projects showcase
│   └── ScrollableTeam.tsx            # Team members showcase
├── contexts/
│   └── AuthContext.tsx               # Authentication context
├── data/
│   └── siteData.json                 # Site content and configuration
└── types/
    ├── contact.ts                    # Contact form types
    └── siteData.ts                   # Site data types
```

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to `http://localhost:3000`

## 📱 Pages Overview

### Public Pages
- **`/`** - Redirects to landing page
- **`/landing`** - Public landing page with company information
- **`/login`** - Authentication page

### Protected Pages (Require Login)
- **`/dashboard`** - Main dashboard with overview
- **`/dashboard/about`** - Company information and mission
- **`/dashboard/services`** - Detailed service offerings
- **`/dashboard/pricing`** - Pricing plans and packages
- **`/dashboard/contact`** - Contact information and form

## 🎨 Design Features

- **Modern UI**: Clean, professional design with blue and purple gradient theme
- **Responsive**: Mobile-first design that works on all devices
- **Animations**: Smooth transitions and hover effects using Framer Motion
- **Interactive Elements**: Hover effects, form validation, and loading states
- **Accessibility**: Proper semantic HTML and keyboard navigation

## 📧 Contact Form

The contact form is fully functional and includes:
- Form validation
- Loading states
- Success/error messages
- Email integration via Nodemailer
- API endpoint at `/api/contact`

## 🔧 Customization

### Site Data
All content is managed through `src/data/siteData.json`:
- Company information
- Services and pricing
- Team members
- Projects portfolio
- Contact information

### Styling
- Colors and themes can be modified in `tailwind.config.ts`
- Component styles are in individual component files
- Global styles are in `src/app/globals.css`

## 🚀 Deployment

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Start Production Server**
   ```bash
   npm start
   ```

## 📝 Notes

- Authentication is currently demo-based (localStorage)
- For production, integrate with a proper authentication service
- Contact form requires email service configuration
- All images are stored in the `public/` directory
- The site is fully responsive and optimized for performance

## 🤝 Support

For any questions or support, please contact:
- Email: kanishkchaudhary2005@gmail.com
- Phone: +91 7016525208

---

**Site Crafter** - Transforming Ideas into Digital Reality


