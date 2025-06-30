import AboutPageComponent from "@/components/pages/AboutPageComponent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About",
  description: "About me",
};

export default function AboutPage() {
  return <AboutPageComponent />;
}
