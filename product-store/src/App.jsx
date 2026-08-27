import {
  ShoppingCart,
  Search,
  X,
  Star,
  Boxes,
} from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">

          {/* Logo */}
          <a
            href="/products"
            className="flex items-center gap-2 text-teal-700"
          >
            <Boxes size={26} strokeWidth={2} />

            <span className="font-display text-xl font-bold tracking-tight">
              Store
            </span>
          </a>

          {/* Icons */}
          <div className="flex items-center gap-6">

            <button
              type="button"
              className="flex items-center gap-2 text-slate-700 hover:text-teal-700"
            >
              <Search size={20} strokeWidth={1.75} />
              <span>Search</span>
            </button>

            <button
              type="button"
              className="relative flex items-center gap-2 text-slate-700 hover:text-teal-700"
            >
              <ShoppingCart size={20} strokeWidth={1.75} />
              <span>Cart</span>

              {/* Cart badge */}
              <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-medium text-white">
                3
              </span>
            </button>

          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-4 py-10">

        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900">
          Product Store
        </h1>

        <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">
          Welcome to our product store. This page demonstrates the custom
          fonts and Lucide icons used in the project.
        </p>

        {/* Typography */}
        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">

          <h2 className="font-display text-xl font-bold text-slate-900">
            Fonts
          </h2>

          <p className="mt-2 leading-relaxed text-slate-600">
            This paragraph uses Inter as the body font.
          </p>

          <p className="mt-2 font-medium text-slate-700">
            Medium weight text
          </p>

          <p className="mt-2 font-semibold text-slate-700">
            Semibold text
          </p>

        </section>

        {/* Icons */}
        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6">

          <h2 className="font-display text-xl font-bold text-slate-900">
            Icons
          </h2>

          <div className="mt-5 flex items-center gap-6">

            <ShoppingCart
              size={24}
              strokeWidth={1.75}
            />

            <Search
              size={24}
              strokeWidth={1.75}
            />

            <Star
              size={24}
              strokeWidth={1.75}
            />

            <X
              size={24}
              strokeWidth={1.75}
            />

          </div>

        </section>

        {/* Image with alt text */}
        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6">

          <h2 className="font-display text-xl font-bold text-slate-900">
            Image
          </h2>

          <img
            src="https://dummyjson.com/image/300x200"
            alt="Product store placeholder"
            className="mt-4 h-48 w-full max-w-md rounded-lg object-cover"
          />

        </section>

      </main>
    </div>
  );
}

export default App;