// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxt/image", "@vueuse/nuxt", "@pinia/nuxt", "@nuxt/ui"],
  pinia: {
    storesDirs: ["./store/**", "./**/store/**"],
  },
});
