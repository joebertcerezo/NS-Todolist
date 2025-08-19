// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', '~/assets/css/icons.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: ['@nuxtjs/strapi', 'shadcn-nuxt', '@vueuse/nuxt'],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: '@/components/ui'
  },

  runtimeConfig: {
    strapi: {
      url: 'http://localhost:1337'
    },
    public: {
      strapi: {
        url: 'http://localhost:1337'
      }
    }
  },
})
