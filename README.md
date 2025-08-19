# NS-Todolist

A modern, full-stack todo list application built with **Nuxt 3** frontend and **Strapi v5** as the headless CMS backend. This project demonstrates the seamless integration between modern frontend frameworks and headless CMS solutions, showcasing CRUD operations, real-time updates, and beautiful UI components.

## ✨ Features

- 📝 **Complete Todo Management** - Create, read, update, and delete todos
- 🎨 **Modern UI** - Built with Shadcn/ui components and Tailwind CSS
- 🌓 **Dark/Light Mode** - Toggle between themes with persistent storage
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- 🔄 **Real-time Updates** - Instant synchronization with Strapi backend
- 🚀 **SSR/SPA Support** - Leverages Nuxt 3's hybrid rendering capabilities
- 📊 **Demo Page** - Interactive examples of all Strapi composables
- 🔧 **TypeScript Support** - Full type safety throughout the application

## 🛠️ Tech Stack

### Frontend

- **[Nuxt 3](https://nuxt.com/)** - The intuitive Vue framework
- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn/ui](https://shadcn-vue.com/)** - Re-usable components built with Radix Vue and Tailwind CSS
- **[Reka UI](https://reka-ui.com/)** - Vue implementation of Radix UI primitives
- **[Lucide Vue](https://lucide.dev/)** - Beautiful & consistent icon toolkit
- **[VueUse](https://vueuse.org/)** - Collection of essential Vue composition utilities

### Backend

- **[Strapi v5](https://strapi.io/)** - Leading open-source headless CMS
- **Content Type: Todo** - Custom content type with title, description, and completion status

### Development Tools

- **[@nuxtjs/strapi](https://strapi.nuxtjs.org/)** - Official Nuxt module for Strapi integration
- **[@nuxtjs/color-mode](https://color-mode.nuxtjs.org/)** - Dark and light mode for Nuxt
- **Class Variance Authority** - For creating type-safe component variants
- **Tailwind Merge** - Utility for merging Tailwind CSS classes

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- Strapi v5 backend running on `http://localhost:1337`

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/joebertcerezo/NS-Todolist.git
   cd NS-Todolist
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
NS-Todolist/
├── app/
│   ├── components/
│   │   ├── ui/           # Shadcn/ui components
│   │   ├── AddButton.vue # Custom todo add button
│   │   └── VIcon.vue     # Icon component wrapper
│   ├── pages/
│   │   ├── index.vue     # Main todo list page
│   │   └── demo.vue      # Strapi composables demo
│   ├── types/
│   │   └── todo.ts       # TypeScript interfaces
│   ├── assets/css/       # Styling files
│   └── lib/
│       └── utils.ts      # Utility functions
├── public/               # Static assets
└── Configuration files
```

## 🎯 Key Functionalities

### Todo Operations

- **Create Todo** - Add new todos with title and optional description
- **Mark Complete** - Toggle completion status with visual feedback
- **Update Todo** - Edit existing todo details
- **Delete Todo** - Remove todos with confirmation

### UI Features

- **Theme Toggle** - Switch between dark and light modes
- **Responsive Layout** - Adapts to different screen sizes
- **Loading States** - Visual feedback during API operations
- **Error Handling** - User-friendly error messages

### Strapi Integration

- **CRUD Operations** - Full Create, Read, Update, Delete functionality
- **Real-time Sync** - Immediate updates between frontend and backend
- **Type Safety** - TypeScript interfaces matching Strapi content types
- **Composables Demo** - Interactive examples in `/demo` page

## 🔧 Configuration

### Strapi Backend Setup

Ensure your Strapi backend has a `Todo` content type with these fields:

- `title` (Text) - Required
- `description` (Text) - Optional
- `completed` (Boolean) - Default: false

### Environment Variables

The application connects to Strapi at `http://localhost:1337` by default. You can modify this in `nuxt.config.ts`:

```typescript
runtimeConfig: {
  strapi: {
    url: 'http://localhost:1337'
  },
  public: {
    strapi: {
      url: 'http://localhost:1337'
    }
  }
}
```

## 📚 Learning Resources

- **[STRAPI_USAGE_GUIDE.md](./STRAPI_USAGE_GUIDE.md)** - Comprehensive guide on using Strapi with Nuxt 3
- **Demo Page** (`/demo`) - Interactive examples of all Strapi composables
- **[Strapi Documentation](https://docs.strapi.io/)** - Official Strapi docs
- **[Nuxt 3 Documentation](https://nuxt.com/docs)** - Official Nuxt docs

## 🚀 Available Scripts

```bash
# Development
pnpm dev          # Start development server

# Production
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm generate     # Generate static site

# Maintenance
pnpm lint:typescript  # Type checking
pnpm deepclean       # Clean all dependencies and caches
```

## 🎨 UI Components

This project showcases modern UI components from Shadcn/ui:

- **Button** - Various styles and states
- **Input** - Form input with validation
- **Dialog** - Modal dialogs for confirmations
- **Label** - Accessible form labels

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Joebert Cerezo** - [@joebertcerezo](https://github.com/joebertcerezo)

---

⭐ **Star this repo if you found it helpful!**
