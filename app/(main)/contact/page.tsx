// app/contact/page.tsx
import ContactClient from "./ContactClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affordable Website & Custom Graphic Design - Make It & Market",
  description: "Make It & Market offers affordable website development and custom graphic design services for business. Professional design solutions that fit your budget.",
  openGraph: {
    title: "Affordable Website & Custom Graphic Design - Make It & Market",
    description: "Make It & Market offers affordable website development and custom graphic design services for business. Professional design solutions that fit your budget.",
    url: "https://www.makeitandmarket.com/contact",
    type: "website",
    siteName: "Make It & Market",
  },
  twitter: {
    title: "Affordable Website & Custom Graphic Design - Make It & Market",
    description: "Make It & Market offers affordable website development and custom graphic design services for business. Professional design solutions that fit your budget.",
    card: "summary_large_image",
    images: ["https://www.makeitandmarket.com/logo.png"],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
