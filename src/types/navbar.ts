/** @format */

import { StaticImageData } from "next/image";

// ===== 1. types/navbar.ts =====
export interface MenuItem {
  name: string;
  url: string;
  icon?: StaticImageData;
}

export interface MenuSection {
  key: string;
  title: string;
  items: MenuItem[];
  rootUrl: string;
}
