
import Link from "next/link";
import { ArrowRight, Check, Truck, ShieldCheck, Headphones } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Minimal Ceramic Vase",
    price: 34.99,
    badge: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    name: "Everyday Classic Watch",
    price: 89.99,
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    name: "Modern Lounge Chair",
    price: 149.99,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 4,
    name: "Everyday Carry Bag",
    price: 54.99,
    badge: "Featured",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=80",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">The everyday collection</span>

            <h1>
              Find your next <em>favorite</em> thing.
            </h1>

            <p>
              Thoughtful design, everyday essentials, and little things
              that make a big difference. Discover something made for you.
            </p>

            <Link href="/products" className="button-primary">
              Explore the collection <ArrowRight size={17} />
            </Link>

            <div className="hero-note">
              <Check size={14} style={{ display: "inline", marginRight: 6 }} />
              Curated products. Straightforward shopping.
            </div>
          </div>

          <div className="hero-image" role="img" aria-label="Modern lifestyle interior">
            <div className="hero-image-label">
              Simple things. Better living.
            </div>
          </div>
        </div>
      </section>

      <section className="container benefits">
        <div className="benefit">
          <Truck size={23} strokeWidth={1.5} />
          <div>
            <strong>Shipping available</strong>
            <span>Delivery options at checkout</span>
          </div>
        </div>

        <div className="benefit">
          <ShieldCheck size={23} strokeWidth={1.5} />
          <div>
            <strong>Secure shopping</strong>
            <span>Shop with confidence</span>
          </div>
        </div>

        <div className="benefit">
          <Headphones size={23} strokeWidth={1.5} />
          <div>
            <strong>Here to help</strong>
            <span>Support when you need it</span>
          </div>
        </div>
      </section>

      <section className="container section" id="featured">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Picked for you</span>
            <h2>Featured products</h2>
            <p>Discover pieces you'll want to keep around.</p>
          </div>

          <Link href="/products" className="text-link">
            Shop all products <ArrowRight size={15} />
          </Link>
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
                <span className="product-badge">{product.badge}</span>
              </Link>

              <div className="product-info">
                <h3>
                  <Link href={`/products/${product.id}`}>
                    {product.name}
                  </Link>
                </h3>
                <p>${product.price.toFixed(2)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="category-section section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Find your style</span>
              <h2>Explore collections</h2>
              <p>A little inspiration for every part of your life.</p>
            </div>
          </div>

          <div className="category-grid">
            <Link href="/products" className="category-card">
              <div>
                <h3>Home & Living</h3>
                <p>Make your space feel like you.</p>
              </div>
            </Link>

            <Link href="/products" className="category-card">
              <div>
                <h3>Accessories</h3>
                <p>Details that make the difference.</p>
              </div>
            </Link>

            <Link href="/products" className="category-card">
              <div>
                <h3>Furniture</h3>
                <p>Comfort with a considered design.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="container section about-section" id="about">
        <div>
          <span className="eyebrow">A little about us</span>
          <h2>Good design belongs in everyday life.</h2>
          <p>
            NOVA is a concept store built around useful, thoughtful,
            and timeless products. Our goal is to make discovering your
            next favorite thing simple and enjoyable.
          </p>
          <Link href="/products" className="button-primary">
            Discover NOVA <ArrowRight size={17} />
          </Link>
        </div>

        <div
          className="about-image"
          role="img"
          aria-label="Thoughtfully styled modern living space"
        />
      </section>
    </>
  );
}