// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@vueuse/nuxt", "@pinia/nuxt", "@nuxt/ui", "nuxt-icon"],
  pinia: {
    storesDirs: ["./store/**", "./**/store/**"],
  },
});
