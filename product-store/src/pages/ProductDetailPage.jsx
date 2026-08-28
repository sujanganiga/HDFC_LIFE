
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Star,
} from "lucide-react";

import api from "../api/axiosInstance";
import useCartStore from "../store/useCartStore";

function ProductDetailPage() {
  const { id } = useParams();

  const addItem = useCartStore(
    (state) => state.addItem
  );

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    let cancelled = false;

    const getProduct = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/products/${id}`);

        if (cancelled) return;

        setProduct(response.data);
        setSelectedImage(response.data.thumbnail);
        setError("");
      } catch (err) {
        if (cancelled) return;

        console.error(err);

        setError(
          "Unable to load this product. Please try again."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    getProduct();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleRetry = () => {
    window.location.reload();
  };

  /* Loading state */
  if (loading) {
    return (
      <div className="animate-pulse">

        <div className="h-5 w-32 rounded bg-slate-200" />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">

          <div>
            <div className="h-[450px] rounded-xl bg-slate-200" />

            <div className="mt-4 flex gap-3">
              <div className="h-20 w-20 rounded-lg bg-slate-200" />
              <div className="h-20 w-20 rounded-lg bg-slate-200" />
              <div className="h-20 w-20 rounded-lg bg-slate-200" />
            </div>
          </div>

          <div>
            <div className="h-8 w-3/4 rounded bg-slate-200" />

            <div className="mt-4 h-5 w-1/3 rounded bg-slate-200" />

            <div className="mt-6 h-10 w-1/4 rounded bg-slate-200" />

            <div className="mt-6 h-24 rounded bg-slate-200" />

            <div className="mt-6 h-12 rounded bg-slate-200" />
          </div>

        </div>
      </div>
    );
  }

  /* Error state */
  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">

        <h1 className="font-display text-2xl font-bold text-red-700">
          Product Not Available
        </h1>

        <p className="mt-2 text-red-600">
          {error}
        </p>

        <button
          type="button"
          onClick={handleRetry}
          className="mt-5 rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white hover:bg-red-700"
        >
          Retry
        </button>

      </div>
    );
  }

  if (!product) {
    return null;
  }

  const images =
    product.images?.length > 0
      ? product.images
      : [product.thumbnail];

  return (
    <div>

      {/* Back to products */}
      <Link
        to="/products"
        className="inline-flex items-center gap-2 font-medium text-teal-700 hover:text-teal-800"
      >
        <ArrowLeft size={18} />
        Back to Products
      </Link>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2">

        {/* Product Images */}
        <section>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">

            <img
              src={selectedImage}
              alt={product.title}
              className="h-[450px] w-full object-contain p-6"
            />

          </div>

          {/* Image thumbnails */}
          <div className="mt-4 flex gap-3 overflow-x-auto">

            {images.map((image, index) => (
              <button
                key={`${product.id}-${index}`}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`shrink-0 overflow-hidden rounded-lg border-2 ${
                  selectedImage === image
                    ? "border-teal-600"
                    : "border-slate-200"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.title} view ${index + 1}`}
                  className="h-20 w-20 object-cover"
                />
              </button>
            ))}

          </div>

        </section>

        {/* Product Details */}
        <section>

          {/* Category */}
          <p className="text-sm font-medium uppercase tracking-wide text-teal-700">
            {product.category}
          </p>

          {/* Title */}
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {product.title}
          </h1>

          {/* Brand */}
          <p className="mt-3 text-slate-500">
            Brand:{" "}

            <span className="font-medium text-slate-700">
              {product.brand || "N/A"}
            </span>
          </p>

          {/* Rating */}
          <div className="mt-5 flex items-center gap-2">

            <Star
              size={20}
              fill="currentColor"
              className="text-yellow-500"
            />

            <span className="font-semibold">
              {product.rating}
            </span>

          </div>

          {/* Price */}
          <div className="mt-6">

            <span className="font-display text-3xl font-bold text-slate-900">
              ${product.price}
            </span>

            {product.discountPercentage > 0 && (
              <span className="ml-3 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                {Math.round(product.discountPercentage)}% OFF
              </span>
            )}

          </div>

          {/* Description */}
          <div className="mt-6">

            <h2 className="font-display text-lg font-bold text-slate-900">
              Description
            </h2>

            <p className="mt-2 leading-relaxed text-slate-600">
              {product.description}
            </p>

          </div>

          {/* Stock */}
          <div className="mt-6 text-sm text-slate-500">

            Stock available:{" "}

            <span className="font-semibold text-slate-800">
              {product.stock}
            </span>

          </div>

          {/* Add to Cart */}
          <button
            type="button"
            onClick={() => addItem(product)}
            className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            <ShoppingCart size={20} />

            Add to Cart
          </button>

        </section>

      </div>

    </div>
  );
}

export default ProductDetailPage;

