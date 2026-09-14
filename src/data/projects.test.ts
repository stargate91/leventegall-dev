import { describe, it, expect } from "vitest";
import { getProjectsData } from "./projects";
import { en } from "@/locales/en";
import { hu } from "@/locales/hu";

describe("Projects Data Specification", () => {
  it("returns all portfolio projects with required fields for English locale", () => {
    const projects = getProjectsData(en);

    expect(projects).toHaveLength(3);

    const swaya = projects[0];
    const nova = projects[1];
    const pillPlayer = projects[2];
    expect(swaya).toBeDefined();
    expect(nova).toBeDefined();
    expect(pillPlayer).toBeDefined();
    if (!swaya || !nova || !pillPlayer) {
      return;
    }

    // Swaya checks
    expect(swaya.id).toBe("swaya");
    expect(swaya.title).toBe(en.projects.items.swaya.title);
    expect(swaya.liveUrl).toBe("https://swaya.xyz/");
    expect(swaya.stack).toContain("FastAPI");
    expect(swaya.stack).toContain("React");
    expect(swaya.screenshots).toHaveLength(3);

    // Nova checks
    expect(nova.id).toBe("nova");
    expect(nova.title).toBe(en.projects.items.nova.title);
    expect(nova.liveUrl).toBe("https://novafeeds.xyz/");
    expect(nova.stack).toContain("Python");
    expect(nova.stack).toContain("FastAPI");
    expect(nova.stack).toContain("Discord.py");
    expect(nova.stack).toContain("Redis");
    expect(nova.stack).toContain("PostgreSQL");
    expect(nova.stack).toContain("Docker");
    expect(nova.impactMetrics).toHaveLength(3);
    expect(nova.screenshots).toHaveLength(3);

    expect(nova.screenshots?.[0]?.src).toBe("/projects/nova/landing.webp");
    expect(nova.screenshots?.[1]?.src).toBe("/projects/nova/settings.webp");
    expect(nova.screenshots?.[2]?.src).toBe("/projects/nova/discord-alert.webp");

    // Pill Player checks
    expect(pillPlayer.id).toBe("pill-player");
    expect(pillPlayer.title).toBe(en.projects.items.pillPlayer.title);
    expect(pillPlayer.liveUrl).toBe("https://www.npmjs.com/package/@stargate91/pill-player");
    expect(pillPlayer.stack).toContain("React");
    expect(pillPlayer.stack).toContain("TypeScript");
    expect(pillPlayer.stack).toContain("Web Audio API");
    expect(pillPlayer.impactMetrics).toHaveLength(3);
    expect(pillPlayer.screenshots).toHaveLength(1);
    expect(pillPlayer.screenshots?.[0]?.src).toBe("/projects/pill-player/preview.webp");
    expect(pillPlayer.screenshots?.[0]?.title).toBe(en.projects.simulators.pillPlayerShot);
  });

  it("returns correctly localized values for Hungarian locale", () => {
    const projects = getProjectsData(hu);

    expect(projects).toHaveLength(3);

    const nova = projects.find((p) => p.id === "nova");
    expect(nova).toBeDefined();
    expect(nova?.title).toBe(hu.projects.items.nova.title);
    expect(nova?.badge).toBe(hu.projects.items.nova.badge);
    expect(nova?.tagline).toBe(hu.projects.items.nova.tagline);
    expect(nova?.description).toBe(hu.projects.items.nova.description);
    expect(nova?.impactMetrics).toEqual(hu.projects.items.nova.impactMetrics);

    expect(nova?.screenshots?.[0]?.title).toBe(hu.projects.simulators.novaDashboardShot);
    expect(nova?.screenshots?.[1]?.title).toBe(hu.projects.simulators.novaFeedsShot);
    expect(nova?.screenshots?.[2]?.title).toBe(hu.projects.simulators.novaBotShot);

    const pillPlayer = projects.find((p) => p.id === "pill-player");
    expect(pillPlayer).toBeDefined();
    expect(pillPlayer?.title).toBe(hu.projects.items.pillPlayer.title);
    expect(pillPlayer?.badge).toBe(hu.projects.items.pillPlayer.badge);
    expect(pillPlayer?.tagline).toBe(hu.projects.items.pillPlayer.tagline);
    expect(pillPlayer?.description).toBe(hu.projects.items.pillPlayer.description);
    expect(pillPlayer?.impactMetrics).toEqual(hu.projects.items.pillPlayer.impactMetrics);
    expect(pillPlayer?.screenshots?.[0]?.title).toBe(hu.projects.simulators.pillPlayerShot);
  });
});
