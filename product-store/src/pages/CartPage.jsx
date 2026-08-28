import { Link } from "react-router-dom";
import {
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import useCartStore from "../store/useCartStore";

function CartPage() {
  const items = useCartStore(
    (state) => state.items
  );

  const setQty = useCartStore(
    (state) => state.setQty
  );

  const removeItem = useCartStore(
    (state) => state.removeItem
  );

  const clear = useCartStore(
    (state) => state.clear
  );

  const subtotal = items.reduce(
    (total, item) =>
      total + item.price * item.qty,
    0
  );

  /* Empty cart */
  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">

        <ShoppingCart
          size={48}
          className="text-slate-400"
        />

        <h1 className="mt-5 font-display text-3xl font-bold text-slate-900">
          Your Cart is Empty
        </h1>

        <p className="mt-2 text-slate-600">
          Add some products to your cart.
        </p>

        <Link
          to="/products"
          className="mt-6 rounded-lg bg-teal-700 px-5 py-3 font-medium text-white hover:bg-teal-800"
        >
          Browse Products
        </Link>

      </div>
    );
  }

  return (
    <div>

      <div className="flex items-center justify-between">

        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900">
            Your Cart
          </h1>

          <p className="mt-1 text-slate-600">
            {items.length} product
            {items.length !== 1 ? "s" : ""}
          </p>
        </div>

        <button
          type="button"
          onClick={clear}
          className="rounded-lg border border-red-200 px-4 py-2 font-medium text-red-600 hover:bg-red-50"
        >
          Clear Cart
        </button>

      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">

        {/* Cart Items */}
        <div className="space-y-4">

          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center"
            >

              {/* Image */}
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-28 w-28 rounded-lg object-cover"
              />

              {/* Details */}
              <div className="flex-1">

                <h2 className="font-display font-bold text-slate-900">
                  {item.title}
                </h2>

                <p className="mt-1 text-slate-600">
                  ${item.price.toFixed(2)}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-4">

                  {/* Quantity */}
                  <div className="flex items-center rounded-lg border border-slate-300">

                    <button
                      type="button"
                      onClick={() =>
                        setQty(
                          item.id,
                          item.qty - 1
                        )
                      }
                      aria-label="Decrease quantity"
                      className="p-2 hover:bg-slate-100"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="min-w-10 text-center font-medium">
                      {item.qty}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setQty(
                          item.id,
                          item.qty + 1
                        )
                      }
                      aria-label="Increase quantity"
                      className="p-2 hover:bg-slate-100"
                    >
                      <Plus size={16} />
                    </button>

                  </div>

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() =>
                      removeItem(item.id)
                    }
                    className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>

                </div>

              </div>

              {/* Item total */}
              <div className="text-right">

                <p className="font-display text-lg font-bold text-slate-900">
                  ${(item.price * item.qty).toFixed(2)}
                </p>

              </div>

            </div>
          ))}

        </div>

        {/* Summary */}
        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-6">

          <h2 className="font-display text-xl font-bold text-slate-900">
            Order Summary
          </h2>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-slate-600">
              Subtotal
            </span>

            <span className="font-semibold text-slate-900">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-slate-600">
              Shipping
            </span>

            <span className="font-semibold text-green-600">
              Free
            </span>
          </div>

          <div className="my-5 border-t border-slate-200" />

          <div className="flex items-center justify-between">

            <span className="font-display font-bold text-slate-900">
              Total
            </span>

            <span className="font-display text-xl font-bold text-slate-900">
              ${subtotal.toFixed(2)}
            </span>

          </div>

          <button
            type="button"
            className="mt-6 w-full rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800"
          >
            Checkout
          </button>

        </aside>

      </div>
    </div>
  );
}

export default CartPage;