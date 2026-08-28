import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";

function ProductCard({ product, onAddToCart }) {
  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      {/* Product Image */}
      <Link to={`/products/${product.id}`}>
        <div className="relative">

          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-52 w-full object-cover"
          />

          {product.discountPercentage > 10 && (
            <span className="absolute left-3 top-3 rounded-full bg-red-600 px-2.5 py-1 text-xs font-semibold text-white">
              {Math.round(product.discountPercentage)}% OFF
            </span>
          )}

        </div>
      </Link>

      {/* Product Information */}
      <div className="p-4">

        <Link to={`/products/${product.id}`}>
          <h2 className="font-display truncate font-bold text-slate-900 hover:text-teal-700">
            {product.title}
          </h2>
        </Link>

        <p className="mt-1 text-sm text-slate-500">
          {product.brand || "No brand"}
        </p>

        <div className="mt-3 flex items-center justify-between">

          <p className="font-display text-lg font-bold text-slate-900">
            ${product.price}
          </p>

          <div className="flex items-center gap-1 text-sm text-slate-600">
            <Star
              size={16}
              fill="currentColor"
            />

            <span>
              {product.rating}
            </span>
          </div>

        </div>

        {/* Add to Cart */}
        <button
          type="button"
          onClick={() => onAddToCart(product)}
          className="mt-4 flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-2.5 font-medium text-white hover:bg-teal-800"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>

      </div>
    </article>
  );
}

export default ProductCard;