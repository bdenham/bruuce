/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module '@vercel/speed-insights/astro' {
  const SpeedInsights: any;
  export default SpeedInsights;
}
