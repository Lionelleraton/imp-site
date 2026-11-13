// Catalogue du portfolio (repris de public/home.html).
// Pour ajouter une photo : déposer le fichier dans public/imp-images puis ajouter une ligne.

export type PortfolioCategory =
  | "trail" | "evenement" | "marque" | "paysage" | "faune" | "nuit" | "ski" | "voyage";

export type PortfolioPhoto = {
  src: string;
  category: PortfolioCategory;
  title: string;
  place: string;
  width: number;
  height: number;
};

export const PORTFOLIO_CATEGORIES: { id: PortfolioCategory; label: string }[] = [
  { id: "trail", label: "Trail & course" },
  { id: "ski", label: "Ski & neige" },
  { id: "evenement", label: "Événement" },
  { id: "marque", label: "Marques" },
  { id: "paysage", label: "Sommets & paysages" },
  { id: "voyage", label: "Voyage" },
  { id: "faune", label: "Faune" },
  { id: "nuit", label: "Nuit & astro" },
];

export const PORTFOLIO: PortfolioPhoto[] = [
  { src: "/imp-images/g00.jpg", category: "evenement", title: "Course de nuit", place: "Chamonix", width: 1125, height: 2000 },
  { src: "/imp-images/g01.jpg", category: "marque", title: "adidas Terrex", place: "Chamonix", width: 1125, height: 2000 },
  { src: "/imp-images/g02.jpg", category: "voyage", title: "Bryce Canyon", place: "Utah, USA", width: 2000, height: 1125 },
  { src: "/imp-images/g03.jpg", category: "trail", title: "Sortie du club", place: "Chamonix", width: 1125, height: 2000 },
  { src: "/imp-images/g04.jpg", category: "evenement", title: "Ligne d'arrivée", place: "Chamonix", width: 1125, height: 2000 },
  { src: "/imp-images/g05.jpg", category: "marque", title: "Pause estivale", place: "Annecy", width: 1125, height: 2000 },
  { src: "/imp-images/g06.jpg", category: "voyage", title: "Le sentier des hoodoos", place: "Bryce Canyon, USA", width: 1125, height: 2000 },
  { src: "/imp-images/g07.jpg", category: "trail", title: "En mouvement", place: "Chamonix", width: 1125, height: 2000 },
  { src: "/imp-images/g08.jpg", category: "evenement", title: "UTMB", place: "Chamonix", width: 1125, height: 2000 },
  { src: "/imp-images/g09.jpg", category: "marque", title: "Casquettes Myneral", place: "Face au Mont-Blanc", width: 1125, height: 2000 },
  { src: "/imp-images/g10.jpg", category: "voyage", title: "L'amphithéâtre", place: "Bryce Canyon, USA", width: 1125, height: 2000 },
  { src: "/imp-images/g11.jpg", category: "paysage", title: "Massif enneigé", place: "Massif du Mont-Blanc", width: 1125, height: 2000 },
  { src: "/imp-images/g12.jpg", category: "evenement", title: "Arrivée UTMB", place: "Chamonix", width: 1125, height: 2000 },
  { src: "/imp-images/g13.jpg", category: "marque", title: "La pause", place: "Face au Mont-Blanc", width: 1125, height: 2000 },
  { src: "/imp-images/g14.jpg", category: "voyage", title: "Antelope Canyon", place: "Arizona, USA", width: 1125, height: 2000 },
  { src: "/imp-images/g15.jpg", category: "trail", title: "Sur le sentier", place: "Face au Mont-Blanc", width: 1125, height: 2000 },
  { src: "/imp-images/g16.jpg", category: "evenement", title: "La légende", place: "Chamonix", width: 1125, height: 2000 },
  { src: "/imp-images/g17.jpg", category: "marque", title: "Pique-nique", place: "Chamonix", width: 1125, height: 2000 },
  { src: "/imp-images/g18.jpg", category: "voyage", title: "Monument Valley", place: "Arizona, USA", width: 1125, height: 2000 },
  { src: "/imp-images/g19.jpg", category: "trail", title: "Duo", place: "Chamonix", width: 1125, height: 2000 },
  { src: "/imp-images/g20.jpg", category: "evenement", title: "Entrée en scène", place: "Chamonix", width: 1125, height: 2000 },
  { src: "/imp-images/g21.jpg", category: "marque", title: "Casquette en vol", place: "Massif du Mont-Blanc", width: 1125, height: 2000 },
  { src: "/imp-images/g22.jpg", category: "paysage", title: "Première lumière", place: "Aiguilles de Chamonix", width: 1125, height: 2000 },
  { src: "/imp-images/g23.jpg", category: "nuit", title: "Filé d'étoiles", place: "Aiguille du Midi, Chamonix", width: 1125, height: 2000 },
  { src: "/imp-images/g24.jpg", category: "evenement", title: "Concert", place: "Chamonix", width: 1125, height: 2000 },
  { src: "/imp-images/g25.jpg", category: "faune", title: "Silhouette au crépuscule", place: "Aiguilles Rouges", width: 1125, height: 2000 },
  { src: "/imp-images/g26.jpg", category: "marque", title: "Myneral en mouvement", place: "Chamonix", width: 1125, height: 2000 },
  { src: "/imp-images/g27.jpg", category: "voyage", title: "Coucher sur la mer", place: "Bretagne", width: 1125, height: 2000 },
  { src: "/imp-images/g28.jpg", category: "trail", title: "L'effort", place: "Chamonix", width: 1125, height: 2000 },
  { src: "/imp-images/g29.jpg", category: "paysage", title: "Aiguille et traînée", place: "Chamonix", width: 1125, height: 2000 },
  { src: "/imp-images/g30.jpg", category: "evenement", title: "Dédicaces", place: "Chamonix", width: 1125, height: 2000 },
  { src: "/imp-images/g31.jpg", category: "faune", title: "Le roi des Aiguilles", place: "Aiguilles Rouges", width: 1125, height: 2000 },
  { src: "/imp-images/g32.jpg", category: "nuit", title: "Étoile filante", place: "Aiguilles Rouges", width: 1125, height: 2000 },
  { src: "/imp-images/g33.jpg", category: "marque", title: "Le réglage", place: "Chamonix", width: 1125, height: 2000 },
  { src: "/imp-images/g34.jpg", category: "voyage", title: "Mont-Saint-Michel", place: "Normandie", width: 1125, height: 2000 },
  { src: "/imp-images/g35.jpg", category: "trail", title: "En pleine course", place: "Chamonix", width: 1125, height: 2000 },
  { src: "/imp-images/g36.jpg", category: "paysage", title: "Les Drus", place: "Chamonix", width: 1125, height: 2000 },
  { src: "/imp-images/g37.jpg", category: "evenement", title: "Autographe", place: "Chamonix", width: 1125, height: 2000 },
  { src: "/imp-images/g38.jpg", category: "ski", title: "Échappée blanche", place: "Massif du Mont-Blanc", width: 1125, height: 2000 },
  { src: "/imp-images/g39.jpg", category: "faune", title: "Bouquetins au couchant", place: "Aiguilles Rouges", width: 1125, height: 2000 },
  { src: "/imp-images/g40.jpg", category: "marque", title: "Détail Myneral", place: "Chamonix", width: 1125, height: 2000 },
  { src: "/imp-images/g41.jpg", category: "voyage", title: "Maison bretonne", place: "Bretagne", width: 1125, height: 2000 },
  { src: "/imp-images/g42.jpg", category: "nuit", title: "Ciel étoilé", place: "Chamonix", width: 1125, height: 2000 },
  { src: "/imp-images/g43.jpg", category: "paysage", title: "Aiguille du Midi", place: "3842 m, Chamonix", width: 1125, height: 2000 },
  { src: "/imp-images/g44.jpg", category: "evenement", title: "Le médaillé", place: "Chamonix", width: 2000, height: 1125 },
  { src: "/imp-images/g45.jpg", category: "trail", title: "Flou de course", place: "Chamonix", width: 1124, height: 2000 },
];
