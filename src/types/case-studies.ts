import { StaticImageData } from 'next/image';

export interface GalleryImage {
  src: StaticImageData | string;
  alt: string;
}

export interface CaseStudyCard {
  title: string;
  description: string;
}

export interface CaseStudyContent {
  title: string;
  description: string;
  client: string;
  property: string;
  challenge: string;
  solution: string;
}

export interface CaseStudyHero {
  backgroundImage: string;
  heading: string;
  paragraph: string;
}

export interface CaseStudy {
  slug: string;
  hero: CaseStudyHero;
  galleryImages: GalleryImage[];
  content: CaseStudyContent;
  cards: CaseStudyCard[];
}
