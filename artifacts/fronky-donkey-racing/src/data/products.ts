export type ProductCategory = "jerseys" | "hats";
export type ShopCategory = "all" | ProductCategory;

export interface Product {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  category: ProductCategory;
  image: string;
  badge?: string;
  soldOut?: boolean;
  description: string;
  details: string[];
}

export const JERSEY_SIZES = ["S", "M", "L", "XL", "XXL"];

export const products: Product[] = [
  {
    id: 1,
    name: "The Widowmaker",
    subtitle: "Red / Black Colorway",
    price: 65,
    category: "jerseys",
    image: "/jersey-1.jpg",
    badge: "New",
    description:
      "Built for riders who don't tap out. The Widowmaker combines aggressive styling with race-grade construction — moisture-wicking fabric, reinforced stitching at every stress point, and a cut that moves with you through every berm, jump, and crash landing.",
    details: [
      "100% Performance Polyester",
      "Moisture-wicking mesh panels",
      "Reinforced double stitching at stress points",
      "Relaxed race fit",
      "Machine wash cold, hang dry",
    ],
  },
  {
    id: 2,
    name: "Yellowjacket",
    subtitle: "Vintage Yellow / Black Stripes",
    price: 65,
    category: "jerseys",
    image: "/jersey-2.jpg",
    description:
      "Old-school stripes, new-school performance. The Yellowjacket draws from vintage moto heritage with its bold stripe pattern and worn-in look — right out of the bag. Race it, wrench in it, rep it everywhere.",
    details: [
      "100% Performance Polyester",
      "Vintage wash finish",
      "Bold stripe construction",
      "Relaxed race fit",
      "Machine wash cold, hang dry",
    ],
  },
  {
    id: 3,
    name: "The Bone Crusher",
    subtitle: "Black Snapback",
    price: 32,
    category: "hats",
    image: "/hat-1.jpg",
    description:
      "Low profile. High attitude. The Bone Crusher snapback is built for the pits and the streets — structured front panels, a flat brim, and the Fronky Donkey logo stitched to last through whatever you put it through.",
    details: [
      "Structured 6-panel",
      "Flat brim",
      "Snapback closure",
      "Embroidered logo patch",
      "One size fits most",
    ],
  },
];
