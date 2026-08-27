import { NavLink, Outlet } from "react-router-dom";
import { Boxes, ShoppingCart } from "lucide-react";

function RootLayout() {
  const navLinkClass = ({ isActive }) =>
    `font-medium transition ${
      isActive
        ? "text-teal-700"
        : "text-slate-600 hover:text-teal-700"
    }`;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">

          {/* Logo */}
          <NavLink
            to="/products"
            className="flex items-center gap-2 text-teal-700"
          >
            <Boxes size={26} strokeWidth={2} />

            <span className="font-display text-xl font-bold tracking-tight">
              Store
            </span>
          </NavLink>

          {/* Navigation */}
          <nav className="flex items-center gap-5">

            <NavLink
              to="/products"
              className={navLinkClass}
            >
              Products
            </NavLink>

            <NavLink
              to="/cart"
              className={navLinkClass}
            >
              Cart
            </NavLink>

            <NavLink
              to="/admin"
              className={navLinkClass}
            >
              Admin
            </NavLink>

            {/* Cart icon */}
            <button
              type="button"
              className="relative rounded-md p-2 text-slate-700 hover:text-teal-700"
            >
              <ShoppingCart size={20} />

              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white">
                3
              </span>
            </button>

          </nav>
        </div>
      </header>

      {/* Child pages render here */}
      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-slate-500">
          Product Store
        </div>
      </footer>

    </div>
  );
}

export default RootLayout;