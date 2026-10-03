import AddToCartButton from "@/components/store/AddToCartButton";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, ShoppingBag } from "lucide-react";

const products = [
  {
    id: "1",
    name: "Minimal Ceramic Vase",
    category: "Home & Living",
    price: 34.99,
    description:
      "A thoughtfully designed ceramic vase that adds a quiet, timeless touch to your living space. Its clean silhouette makes it easy to style on a shelf, table, or countertop.",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "2",
    name: "Everyday Classic Watch",
    category: "Accessories",
    price: 89.99,
    description:
      "A versatile everyday accessory with a clean, understated look. Designed to complement both casual outfits and more polished occasions.",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "3",
    name: "Modern Lounge Chair",
    category: "Furniture",
    price: 149.99,
    description:
      "Bring a contemporary feel to your home with this modern lounge chair. Its considered design works beautifully in a reading corner or living room.",
    image: "https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "4",
    name: "Everyday Carry Bag",
    category: "Accessories",
    price: 54.99,
    description:
      "A practical everyday bag with a simple, versatile style. A useful companion for daily errands, outings, and everyday essentials.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "5",
    name: "Modern Table Lamp",
    category: "Home & Living",
    price: 64.99,
    description:
      "A contemporary table lamp designed to bring warmth and character to your desk, bedside table, or favorite reading corner.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "6",
    name: "Minimal Wristwatch",
    category: "Accessories",
    price: 79.99,
    description:
      "An understated watch with a versatile aesthetic, designed to pair easily with your everyday wardrobe.",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "7",
    name: "Accent Lounge Chair",
    category: "Furniture",
    price: 189.99,
    description:
      "Give your space a distinctive accent with this contemporary chair. Its design makes it a natural addition to a lounge or reading area.",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "8",
    name: "Everyday Handbag",
    category: "Accessories",
    price: 69.99,
    description:
      "A versatile handbag concept with a clean, timeless appearance for everyday use and casual outings.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85",
  },
];

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailsPage({
  params,
}: ProductPageProps) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  return (
    <section className="container section">
      <Link href="/products" className="back-link">
        <ArrowLeft size={16} /> Back to products
      </Link>

      <div className="product-details">
        <div className="product-details-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-details-info">
          <span className="eyebrow">{product.category}</span>
          <h1>{product.name}</h1>

          <p className="details-price">${product.price.toFixed(2)}</p>

          <p className="details-description">{product.description}</p>

          <div className="stock-note">
            <Check size={17} /> Sample product listing
          </div>

          <AddToCartButton
  product={{
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
  }}
/>

          <p className="details-disclaimer">
            Sample product information. Prices, inventory, and shipping
            will be connected to the store database in a later step.
          </p>
        </div>
      </div>
    </section>
  );
}

