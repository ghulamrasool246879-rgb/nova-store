"use client";

import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 border-r border-slate-800 bg-slate-900 md:block">
          <div className="flex h-20 items-center border-b border-slate-800 px-6">
            <h1 className="text-2xl font-bold">
              NOVA
              <span className="text-cyan-400"> ADMIN</span>
            </h1>
          </div>

          <nav className="p-4">
            <a
              href="/admin"
              className="mb-2 flex items-center rounded-lg bg-cyan-500/10 px-4 py-3 font-medium text-cyan-400"
            >
              Dashboard
            </a>

            <a
              href="#"
              className="mb-2 flex items-center rounded-lg px-4 py-3 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              Products
            </a>

            <a
              href="#"
              className="mb-2 flex items-center rounded-lg px-4 py-3 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              Orders
            </a>

            <a
              href="#"
              className="mb-2 flex items-center rounded-lg px-4 py-3 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              Customers
            </a>

            <a
              href="#"
              className="mb-2 flex items-center rounded-lg px-4 py-3 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              Settings
            </a>
          </nav>

          <div className="absolute bottom-6 w-64 px-4">
            <button
              onClick={handleLogout}
              className="w-full rounded-lg border border-red-500/30 px-4 py-3 text-red-400 transition hover:bg-red-500/10"
            >
              Logout
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1">
          <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-900 px-6 md:px-8">
            <div>
              <h2 className="text-xl font-semibold">
                Dashboard
              </h2>

              <p className="text-sm text-slate-400">
                Welcome back, Administrator
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
            >
              Logout
            </button>
          </header>

          <div className="p-6 md:p-8">
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <DashboardCard
                title="Total Products"
                value="0"
                description="Products in store"
              />

              <DashboardCard
                title="Total Orders"
                value="0"
                description="Orders received"
              />

              <DashboardCard
                title="Customers"
                value="0"
                description="Registered customers"
              />

              <DashboardCard
                title="Revenue"
                value="$0"
                description="Total store revenue"
              />
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Products
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      Manage your store products.
                    </p>
                  </div>

                  <button className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400">
                    Add Product
                  </button>
                </div>

                <div className="mt-8 rounded-xl border border-dashed border-slate-700 p-8 text-center">
                  <p className="text-slate-400">
                    No products yet.
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Product management will be added next.
                  </p>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <h3 className="text-lg font-semibold">
                  Recent Orders
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Monitor your latest customer orders.
                </p>

                <div className="mt-8 rounded-xl border border-dashed border-slate-700 p-8 text-center">
                  <p className="text-slate-400">
                    No orders yet.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-sm text-slate-400">{title}</p>

      <p className="mt-3 text-3xl font-bold text-white">
        {value}
      </p>

      <p className="mt-2 text-xs text-slate-500">
        {description}
      </p>
    </div>
  );
}