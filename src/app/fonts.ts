import { DM_Sans, Newsreader } from "next/font/google";

export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-dm-sans",
  display: "swap",
});

export const newsreader = Newsreader({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});
