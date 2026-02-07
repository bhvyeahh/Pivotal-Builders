import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google"; // 1. Change Import
import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import NextTopLoader from "nextjs-toploader";

// 2. Configure Font
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space" // Optional variable for Tailwind
});

export const metadata: Metadata = {
  title: "Pivotal Builders",
  description: "Your pivotal partner in building what matters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 3. Apply Font Class */}
      <body className={spaceGrotesk.className}>
        <SmoothScroll>
        <NextTopLoader
          color="#000000"     // Color of the bar (Black fits your construction theme)
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}          // Height of the bar in px
          crawl={true}
          showSpinner={false} // Keep this FALSE for a cleaner, high-end look
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          zIndex={1600}
        />
        <Navbar /> 
        {children}
        </SmoothScroll>
      </body>
    </html>
  );
}