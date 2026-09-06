import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: "Levente Gáll",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#04060a",
    theme_color: "#00f0ff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
