# VMTS Pro - Enterprise VMTS

A comprehensive, enterprise-grade VMTS built with Next.js 15, featuring role-based dashboards, real-time monitoring, and modern UI/UX design.

## 🌟 Features

### **Modern Technology Stack**
- **Next.js 15** with App Router for optimal performance
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS** with custom design system
- **shadcn/ui** components for consistent UI
- **Framer Motion** for smooth animations
- **Lucide React** for beautiful icons
- **Dark/Light Mode** support

### **Role-Based Portals**

#### 🏢 **Host Dashboard**
- Schedule and manage visitor appointments
- Real-time visitor status tracking
- Calendar integration for meeting management
- Invitation and approval workflow
- Visitor communication tools

#### 🛡️ **Security Dashboard**
- Real-time visitor monitoring
- Active visitor tracking with live counts
- Overdue visitor alerts and notifications
- Security alert management
- Badge assignment and tracking

#### 👥 **Visitor Portal**
- Self-service pre-registration
- Visit history and upcoming appointments
- Digital check-in capabilities
- Feedback submission system
- Visit guidelines and support

#### 📊 **Admin Dashboard**
- Comprehensive analytics and reporting
- User management (hosts, security staff)
- System health monitoring
- Data export capabilities
- Configuration and settings

#### 🖥️ **Self-Service Kiosk**
- Touch-friendly interface for visitor check-in
- QR code scanning for quick access
- Digital badge generation
- Accessibility features

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd nikhil_VMTS
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🏗️ Project Structure

```
src/
├── app/                     # Next.js App Router pages
│   ├── (auth)/             # Authentication routes
│   ├── host/               # Host portal pages
│   ├── security/           # Security dashboard pages  
│   ├── visitor/            # Visitor portal pages
│   ├── admin/              # Admin dashboard pages
│   ├── kiosk/              # Self-service kiosk pages
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles with CSS variables
├── components/
│   ├── ui/                 # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── tabs.tsx
│   │   └── badge.tsx
│   ├── layout/             # Layout components
│   │   ├── main-layout.tsx # Main app layout
│   │   ├── sidebar.tsx     # Role-based navigation
│   │   └── topbar.tsx      # Top navigation bar
│   ├── forms/              # Form components (planned)
│   ├── charts/             # Chart components (planned)
│   ├── theme-provider.tsx  # Theme context provider
│   └── theme-toggle.tsx    # Dark/light mode toggle
├── lib/
│   └── utils.ts            # Utility functions (cn helper)
├── types/
│   └── index.ts            # TypeScript type definitions
└── hooks/                  # Custom React hooks (planned)
```

## 🎨 Design System

### Color Scheme
- **Primary**: Enterprise blue tones
- **Secondary**: Professional grays
- **Success**: Green variants for positive actions
- **Warning**: Orange/yellow for attention items
- **Danger**: Red variants for critical alerts

### Components
- **Cards**: Consistent spacing and shadows
- **Buttons**: Multiple variants (primary, outline, ghost)
- **Badges**: Status indicators with color coding
- **Forms**: Accessible inputs with proper labeling
- **Navigation**: Role-based with visual hierarchy

### Typography
- **Headings**: Clear hierarchy with proper contrast
- **Body**: Readable font sizes and line heights
- **Labels**: Descriptive and accessible

## 🛣️ Roadmap

### Phase 1: ✅ **Foundation & Core UI**
- [x] Project setup with Next.js 15
- [x] shadcn/ui component integration
- [x] Role-based navigation system
- [x] Dark/light theme support
- [x] Responsive design foundation

### Phase 2: 🚧 **Enhanced Features**
- [ ] Advanced form components with validation
- [ ] Real-time notifications system
- [ ] File upload components
- [ ] Calendar integration
- [ ] QR code generation and scanning

### Phase 3: 📋 **Data & Analytics**
- [ ] Charts and visualization components
- [ ] Advanced filtering and search
- [ ] Data export functionality
- [ ] Comprehensive reporting dashboard

### Phase 4: 🔐 **Security & Integration**
- [ ] Authentication system
- [ ] Role-based access control
- [ ] API integration patterns
- [ ] Security audit logging

### Phase 5: 📱 **Mobile & Kiosk**
- [ ] Mobile-optimized interfaces
- [ ] Touch-friendly kiosk mode
- [ ] Progressive Web App features
- [ ] Offline support capabilities

## 🧩 Component Architecture

### Layout System
```typescript
MainLayout (role-based wrapper)
├── Sidebar (navigation)
├── Topbar (search, notifications, user)
└── Main content area
```

### Theme System
```typescript
ThemeProvider (next-themes)
├── CSS Variables (light/dark)
├── Tailwind configuration
└── Component variants
```

## 🎯 Key Features Implemented

1. **Enterprise Landing Page**
   - Animated hero section
   - Role-based portal selection
   - Modern gradient design
   - Responsive layout

2. **Host Dashboard**
   - Visitor statistics overview
   - Today's schedule management
   - Quick action buttons
   - Tabbed visitor management

3. **Security Dashboard** 
   - Real-time visitor monitoring
   - Alert management system
   - Overdue visitor tracking
   - Security metrics

4. **Visitor Portal**
   - Pre-registration form
   - Visit history tracking
   - Feedback system
   - Help and support

5. **Admin Dashboard**
   - System overview metrics
   - User management tools
   - Analytics visualization
   - System health monitoring

## 🔧 Customization

### Adding New Components
```bash
# Add shadcn/ui components
npx shadcn-ui@latest add [component-name]
```

### Extending Types
```typescript
// src/types/index.ts
export interface CustomType {
  // Your custom properties
}
```

### Theme Customization
```typescript
// tailwind.config.ts
// Modify the theme object to customize colors, spacing, etc.
```

## 📱 Responsive Design

- **Desktop**: Full sidebar navigation with detailed content
- **Tablet**: Collapsible navigation with optimized layouts  
- **Mobile**: Bottom navigation with simplified interfaces
- **Kiosk**: Large touch targets and accessibility features

## ♿ Accessibility Features

- **WCAG Compliance**: Proper contrast ratios and semantic HTML
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and descriptions
- **Focus Management**: Visible focus indicators
- **Color Independence**: Information not conveyed by color alone

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Docker
```dockerfile
# Dockerfile included for containerized deployment
```

### Traditional Hosting
```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋‍♂️ Support

For support, please contact the development team or create an issue in the repository.

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies.**
