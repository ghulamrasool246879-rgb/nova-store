"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number | null;
  category: string;
  image: string;
  stock: number;
  status: "active" | "inactive";
  createdAt: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchProducts() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/products");

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to load products.");
      }

      setProducts(data.products);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load products."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleDelete(id: string) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to delete product.");
    }

    setProducts((currentProducts) =>
      currentProducts.filter((product) => product._id !== id)
    );
  } catch (error) {
    console.error(error);

    alert(
      error instanceof Error
        ? error.message
        : "Failed to delete product."
    );
  }
}

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/admin"
              className="mb-3 inline-block text-sm text-cyan-400 hover:text-cyan-300"
            >
              ← Back to Dashboard
            </Link>

            <h1 className="text-3xl font-bold">Products</h1>

            <p className="mt-2 text-slate-400">
              Manage your NOVA Store products.
            </p>
          </div>

          <Link
            href="/admin/products/add"
            className="inline-flex items-center justify-center rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            + Add Product
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-400">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
            <p className="text-slate-400">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-3xl">
              📦
            </div>

            <h2 className="text-xl font-semibold">
              No products yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-slate-400">
              You haven't added any products to your store yet.
              Start by creating your first product.
            </p>

            <Link
              href="/admin/products/add"
              className="mt-6 inline-flex rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
            >
              Add Your First Product
            </Link>
          </div>
        ) : (
          /* Products Table */
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
            <div className="overflow-x-auto">
              <table className="w-full min-w-225">
                <thead className="border-b border-slate-800 bg-slate-950/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                      Product
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                      Category
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                      Price
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                      Stock
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b border-slate-800 last:border-b-0"
                    >
                      {/* Product */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-14 overflow-hidden rounded-lg bg-slate-800">
                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-xl">
                                📦
                              </div>
                            )}
                          </div>

                          <div>
                            <p className="font-semibold text-white">
                              {product.name}
                            </p>

                            <p className="mt-1 max-w-xs truncate text-sm text-slate-500">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-5 text-slate-300">
                        {product.category}
                      </td>

                      {/* Price */}
                      <td className="px-6 py-5">
                        {product.salePrice ? (
                          <div>
                            <p className="font-semibold text-cyan-400">
                              ${product.salePrice.toFixed(2)}
                            </p>

                            <p className="text-sm text-slate-500 line-through">
                              ${product.price.toFixed(2)}
                            </p>
                          </div>
                        ) : (
                          <p className="font-semibold text-white">
                            ${product.price.toFixed(2)}
                          </p>
                        )}
                      </td>

                      {/* Stock */}
                      <td className="px-6 py-5 text-slate-300">
                        {product.stock}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            product.status === "active"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          {product.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
  href={`/admin/products/${product._id}/edit`}
  className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:border-cyan-400 hover:text-cyan-400"
>
  Edit
</Link>

                          <button onClick={() => handleDelete(product._id)}
  className="rounded-lg border border-red-500/30 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
>
  Delete
</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}