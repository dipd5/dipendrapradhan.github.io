import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://dipendrapradhan.dpdns.org",
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
