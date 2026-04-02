import "./globals.css";
import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import { bricolageGrotesque } from "./font";

export const metadata: Metadata = {
  title: "Zorvyn Finance",
  description: "Finance for the Future",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ` + bricolageGrotesque.className}>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
