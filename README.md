# 🎨 Rong Pencil Art Academy

Official web application for **Rong Pencil Art Academy** — an institute dedicated to nurturing artistic talent, fine arts, painting, photography, and creative craftsmanship.

---

## ✨ Features

- 🖼️ **Art & Craft Sale Gallery**: Interactive artwork showcase with real-time status (Available / Sold Out) and direct WhatsApp purchase inquiries powered by Directus CMS.
- 📢 **Dynamic Notice Board**: Live announcements, news, and notifications fetched from Directus headless CMS.
- 👨‍🎨 **Artist Showcase**: Dedicated profiles and galleries for Senior, Junior, and Guest Artists.
- 🎓 **Teacher & Student Portfolios**: Directory pages for School Teachers, Community Teachers, and Student work.
- 🖌️ **Specialized Art Categories**: Dedicated sections for Painting, Photography, and Exhibitions.
- 📝 **Admission & Contact Info**: Direct inquiries, phone communication links, location details, and terms.
- 📱 **Fully Responsive UI**: Mobile-first design with smooth navigation and Tailwind CSS styling.

---

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) (Static Site Generation / Dynamic Routes)
- **UI Components**: [Vue 3](https://vuejs.org/) (SFC setup components for interactive UI elements)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Flowbite Typography
- **CMS / Backend**: [Directus CMS](https://directus.io/) (Headless API for dynamic sales & notices)
- **Integrations**: Vue plugin for Astro (`@astrojs/vue`), Tailwind plugin (`@astrojs/tailwind`), Vite PWA

---

## 📁 Project Structure

```text
rong-pencil-art-academy/
├── public/                # Static assets (logos, images, favicon)
├── src/
│   ├── components/        # Vue & Astro components
│   │   ├── MainHeader.vue # Sticky navigation bar with desktop & mobile menus
│   │   ├── Footer.astro   # Footer component
│   │   ├── SaleGallery.vue# Directus-powered art sale gallery with WhatsApp integration
│   │   ├── NoticeBoard.vue# Dynamic notice board component
│   │   └── ...
│   ├── layouts/           # Astro site layouts (Layout.astro)
│   └── pages/             # Page routes
│       ├── index.astro       # Home page
│       ├── gallery.astro     # Main gallery
│       ├── painting.astro    # Painting section
│       ├── photography.astro # Photography section
│       ├── exhibition.astro  # Exhibition section
│       ├── sale.astro        # Art & Craft sale page
│       ├── admission.astro   # Admission page
│       ├── artist/           # Artist category pages & dynamic routes
│       ├── teacher/          # Teacher category pages & dynamic routes
│       ├── student/          # Student category pages & dynamic routes
│       └── notice/           # Notice list & detail pages
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- `npm` or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone git@github.com:suvodip35/rong-pencil-art-academy.git
   cd rong-pencil-art-academy
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

---

## 🧞 Available Commands

All commands are run from the project root directory:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local development server at `http://localhost:3000` |
| `npm run build` | Builds the production-ready static site into the `./dist/` directory |
| `npm run preview` | Previews the production build locally before deployment |
| `npm run astro ...` | Executes Astro CLI commands |

---

## 📞 Contact & Support

For direct communication or inquiries regarding art academy admissions or purchasing artwork:
- **Phone**: +91 8926391059 / +91 8609657661
- **Website**: [Rong Pencil Art Academy](https://wa.me/918926391059)
