
import Link from "next/link";
import { ArrowRight, SlidersHorizontal } from "lucide-react";

const products = [
  {
    id: "1",
    name: "Minimal Ceramic Vase",
    category: "Home & Living",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=700&q=80",
    badge: "Bestseller",
  },
  {
    id: "2",
    name: "Everyday Classic Watch",
    category: "Accessories",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=700&q=80",
    badge: "Popular",
  },
  {
    id: "3",
    name: "Modern Lounge Chair",
    category: "Furniture",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=700&q=80",
    badge: "New",
  },
  {
    id: "4",
    name: "Everyday Carry Bag",
    category: "Accessories",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=80",
    badge: "",
  },
  {
    id: "5",
    name: "Modern Table Lamp",
    category: "Home & Living",
    price: 64.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80",
    badge: "Featured",
  },
  {
    id: "6",
    name: "Minimal Wristwatch",
    category: "Accessories",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80",
    badge: "",
  },
  {
    id: "7",
    name: "Accent Lounge Chair",
    category: "Furniture",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=700&q=80",
    badge: "New",
  },
  {
    id: "8",
    name: "Everyday Handbag",
    category: "Accessories",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80",
    badge: "",
  },
];

export default function ProductsPage() {
  return (
    <>
      <section className="shop-hero">
        <div className="container">
          <span className="eyebrow">The NOVA collection</span>
          <h1>Find something <em>you love.</em></h1>
          <p>
            Explore thoughtfully selected products for your home,
            your style, and your everyday life.
          </p>
        </div>
      </section>

      <section className="container section">
        <div className="shop-toolbar">
          <div>
            <h2>All products</h2>
            <p>{products.length} products to explore</p>
          </div>

          <button className="filter-button" type="button">
            <SlidersHorizontal size={17} />
            Browse collection
          </button>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <Link
                href={`/products/${product.id}`}
                className="product-image"
                aria-label={`View ${product.name}`}
              >
                <img src={product.image} alt={product.name} />

                {product.badge && (
                  <span className="product-badge">{product.badge}</span>
                )}
              </Link>

              <div className="product-info">
                <p className="product-category">{product.category}</p>

                <h3>
                  <Link href={`/products/${product.id}`}>
                    {product.name}
                  </Link>
                </h3>

                <div className="product-price-row">
                  <p>${product.price.toFixed(2)}</p>

                  <Link
                    href={`/products/${product.id}`}
                    className="product-arrow"
                    aria-label={`View ${product.name}`}
                  >
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}