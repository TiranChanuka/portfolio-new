# 🌌 Cosmic Portfolio

<div align="center">
  <img src="public/window.svg" alt="Portfolio Logo" width="150" />
  <h3>Modern 3D Portfolio with Three.js & Next.js</h3>
  
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
  ![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
</div>

## ✨ Features

- 🌟 **Interactive 3D Experiences** - Stunning Three.js visualizations including:

  - Dynamic starry background
  - Interactive solar system skills visualization
  - Animated floating elements

- 💼 **Comprehensive Portfolio Sections**

  - 🚀 Hero with animated 3D background
  - 📱 Projects with interactive hover effects
  - 🛠️ Skills visualized as a 3D solar system
  - 👤 About with timeline layout
  - 📬 Contact with validated form

- 🎨 **Modern Design Elements**

  - Gradient text effects
  - Backdrop blur components
  - Responsive layouts for all devices
  - Dark/Light theme toggle

- ⚡ **Technical Excellence**
  - Built with Next.js 15 and App Router
  - TypeScript for type safety
  - Optimized 3D rendering
  - Error boundaries and fallbacks

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- NPM or Yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🧪 Technologies

This portfolio showcases skills with modern web technologies:

- **Frontend**: React 19, Next.js 15, TypeScript
- **3D Rendering**: Three.js, React Three Fiber, Drei
- **Animation**: Framer Motion
- **Styling**: Tailwind CSS, CSS variables
- **Authentication**: NextAuth.js
- **Form Validation**: React Hook Form, Zod

## 📁 Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # UI components
│   ├── hero.tsx         # Main hero with 3D background
│   ├── StarryBackground.tsx  # 3D animated star field
│   ├── CategorySolarSystems.tsx # Interactive skills visualization
│   └── ...              # Other UI components
├── lib/                 # Utility functions and contexts
└── public/              # Static assets
```

## 🎯 Key Features Explained

### 3D Solar System Skills Visualization

The portfolio features a unique skills visualization that represents different skill categories as planetary systems, with:

- Sun at the center representing core expertise
- Planets sized by skill proficiency
- Orbital distance indicating experience level
- Interactive tooltips with detailed information
- Full 3D controls (rotate, zoom, pan)

### Customizable Portfolio

The portfolio is designed to be easily customizable with:

- Modifiable project data
- Customizable skills section
- Adaptable personal information
- Editable contact details

## 🔧 Customization

You can easily adapt this portfolio for your own use by:

1. Updating skills data in `page.tsx` and skills-context.tsx
2. Adding your projects directly in projects-section.tsx
3. Modifying theme colors in Tailwind config
4. Editing personal information in about-section.tsx and contact-section.tsx

## 📱 Responsive Design

The portfolio is fully responsive with:

- Mobile-first approach
- Tailored 3D performance for mobile devices
- Adaptive layouts for all screen sizes
- Touch-friendly interactions

## 🌐 Deployment

Deploy your own version on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fportfolio)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Three.js community for 3D rendering inspiration
- Next.js team for the incredible framework
- All open-source contributors who make projects like this possible
