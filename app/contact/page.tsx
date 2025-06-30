import ContactForm from "@/components/pages/ContactForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch to discuss your web development project. Whether you need a web app, e-commerce site, or SaaS platform, I'm here to help bring your vision to life.",
  keywords: [
    "contact",
    "web development",
    "consultation",
    "project inquiry",
    "freelance developer",
  ],
  openGraph: {
    title: "Contact",
    description:
      "Get in touch to discuss your web development project. Whether you need a web app, e-commerce site, or SaaS platform, I'm here to help bring your vision to life.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact",
    description:
      "Get in touch to discuss your web development project. Whether you need a web app, e-commerce site, or SaaS platform, I'm here to help bring your vision to life.",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
