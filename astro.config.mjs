import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import vue from "@astrojs/vue";

// https://astro.build/config

export default defineConfig({
  site: process.env.SITE_URL || 'https://rongpencilartacademy.in',
  integrations: [tailwind(), vue()]
});