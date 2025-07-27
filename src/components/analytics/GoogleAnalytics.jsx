import { GoogleAnalytics } from "@next/third-parties/google";

export default function GoogleAnalyticsComponent() {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || "";

  if (!gaId) {
    console.warn(
      "Google Analytics Measurement ID is missing. Check NEXT_PUBLIC_GOOGLE_ANALYTICS in .env.local"
    );
    return null;
  }
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <GoogleAnalytics
      gaId={gaId}
      dataLayerName="dataLayer"
      strategy="lazyOnload"
    />
  );
}
