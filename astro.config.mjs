import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://dipd5.github.io",
  base: "/dipendrapradhan.github.io/",
  output: "static",
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp"
    }
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark"
    }
  }
});
