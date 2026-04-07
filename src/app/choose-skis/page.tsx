import type { Metadata } from "next";
import ChooseSkisClient from "./ChooseSkisClient";

export const metadata: Metadata = {
  title: "Choisir ses skis",
  description:
    "Questionnaire terrain pour recommander les skis nordiques les plus adaptés à votre profil.",
  alternates: {
    canonical: "/choose-skis",
  },
  openGraph: {
    title: "Choisir ses skis",
    description:
      "Questionnaire terrain pour recommander les skis nordiques les plus adaptés à votre profil.",
    url: "/choose-skis",
  },
};

export default function ChooseSkisPage() {
  return <ChooseSkisClient />;
}
