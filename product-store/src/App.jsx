import { useState } from "react";
import { Boxes, ShoppingCart, Search } from "lucide-react";
import Modal from "./components/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">

          {/* Logo */}
          <a
            href="/products"
            className="flex items-center gap-2 text-teal-700"
          >
            <Boxes size={26} />

            <span className="font-display text-xl font-bold tracking-tight">
              Store
            </span>
          </a>

          {/* Navigation */}
          <div className="flex items-center gap-5">

            <button
              type="button"
              className="flex items-center gap-2 text-slate-700 hover:text-teal-700"
            >
              <Search size={20} />
              <span className="hidden sm:inline">
                Search
              </span>
            </button>

            <button
              type="button"
              className="relative flex items-center gap-2 text-slate-700 hover:text-teal-700"
            >
              <ShoppingCart size={20} />

              <span className="hidden sm:inline">
                Cart
              </span>

              <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white">
                3
              </span>
            </button>

          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-4 py-10">

        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900">
          Modal & Overlay
        </h1>

        <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">
          This page is used to test the reusable modal component.
        </p>

        {/* Open Modal Button */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="mt-8 rounded-lg bg-teal-700 px-5 py-3 font-medium text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Open Modal
        </button>

        {/* Extra content so we can test scrolling */}
        <div className="mt-10 space-y-4">

          {Array.from({ length: 15 }, (_, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-200 bg-white p-6"
            >
              <h2 className="font-display font-bold text-slate-900">
                Content {index + 1}
              </h2>

              <p className="mt-2 text-slate-600">
                Scroll the page and open the modal to test whether
                background scrolling is disabled.
              </p>
            </div>
          ))}

        </div>

      </main>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Welcome to Product Store"
      >
        <p className="leading-relaxed text-slate-600">
          This is a reusable modal component. You can place any
          content inside it using the children prop.
        </p>

        <div className="mt-6 flex justify-end gap-3">

          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="rounded-lg bg-teal-700 px-4 py-2 font-medium text-white transition hover:bg-teal-800"
          >
            Continue
          </button>

        </div>
      </Modal>

    </div>
  );
}

export default App;