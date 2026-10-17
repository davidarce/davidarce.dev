# David Arce - Portfolio

Personal portfolio built with Astro, React islands and Tailwind CSS. Minimal editorial design with a light terminal accent.

## 🚀 Features

- **AI Enablement section** - tools, agentic software factories and impact, with a factory diagram
- **Multiple Themes** - System (follows the OS), Light, Matrix and Ocean, applied before first paint
- **Command Palette** - Cmd/Ctrl+K for navigation, links and theme switching
- **Experience Timeline** - data-driven from `src/data/experience.ts`
- **Responsive Design** - sticky top bar, vertical diagram on small screens

## 🛠️ Tech Stack

- **Framework**: Astro 5.x
- **UI Library**: React 19 (islands)
- **Styling**: Tailwind CSS 3 plus CSS design tokens in `src/styles/global.css`
- **Fonts**: Geist and Geist Mono
- **Package Manager**: pnpm
- **Deployment**: GitHub Pages

## 🗂️ Content

Edit `src/data/experience.ts`, `skills.ts` and `education.ts` to update the site.

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🎨 Themes

The portfolio includes 4 themes, defined as tokens in `src/styles/global.css`:
- **System** (default) - follows the OS light/dark preference
- **Light** - clean light mode with a blue accent
- **Matrix** - dark with a green accent
- **Ocean** - dark blue with a cyan accent

## 🚢 Deployment

This site is automatically deployed to GitHub Pages using GitHub Actions. Every push to the `main` or `master` branch triggers a new deployment.

The site is served at the custom domain: **https://davidarce.dev**

## 📄 License

© 2025 David Arce. All rights reserved.

## 🔗 Links

- **Portfolio**: https://davidarce.dev
- **GitHub**: https://github.com/davidarce
- **LinkedIn**: https://linkedin.com/in/davidarce92
