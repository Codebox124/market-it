// app/contact/page.tsx
import ContactClient from "./ContactClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Make It & Market",
  description: "Get in touch with us to discuss your project and marketing needs.",
  openGraph: {
    title: "Contact - Make It & Market",
    description: "Reach out to Make It & Market for creative and marketing services.",
  },
  twitter: {
    title: "Contact - Make It & Market",
    description: "Contact us to start your project or ask questions about our services.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
