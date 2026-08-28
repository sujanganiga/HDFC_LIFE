
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import api from "../api/axiosInstance";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";

function ProductsPage() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const search = searchParams.get("q") || "";
  const category =
    searchParams.get("category") || "";
  const sort =
    searchParams.get("sort") || "";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const getProducts = async () => {
    try {
      setError("");

      let response;

      if (search) {
        response = await api.get(
          `/products/search?q=${encodeURIComponent(search)}&limit=12`
        );
      } else if (category) {
        response = await api.get(
          `/products/category/${category}?limit=12`
        );
      } else {
        response = await api.get(
          "/products?limit=12&skip=0"
        );
      }

      setProducts(response.data.products);
    } catch (error) {
      console.error(error);

      setError(
        "Unable to load products. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const response = await api.get(
        "/products/categories"
      );

      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [search, category]);

  useEffect(() => {
    getCategories();
  }, []);

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "price-asc") {
      result.sort(
        (a, b) => a.price - b.price
      );
    }

    if (sort === "price-desc") {
      result.sort(
        (a, b) => b.price - a.price
      );
    }

    if (sort === "rating-desc") {
      result.sort(
        (a, b) => b.rating - a.rating
      );
    }

    return result;
  }, [products, sort]);

  const updateSearchParams = (
    key,
    value
  ) => {
    const params =
      new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    setSearchParams(params);
  };

  return (
    <div>

      {/* Heading */}
      <div className="mb-8">

        <p className="text-sm font-medium uppercase tracking-wide text-teal-700">
          Product Store
        </p>

        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-slate-900">
          Products
        </h1>

        <p className="mt-2 text-slate-600">
          Browse our collection of products.
        </p>

      </div>

      {/* Filters */}
      <FilterBar
        search={search}
        category={category}
        sort={sort}
        categories={categories}
        onSearchChange={(value) =>
          updateSearchParams("q", value)
        }
        onCategoryChange={(value) =>
          updateSearchParams(
            "category",
            value
          )
        }
        onSortChange={(value) =>
          updateSearchParams(
            "sort",
            value
          )
        }
      />

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {Array.from(
            { length: 8 },
            (_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-xl border border-slate-200 bg-white p-4"
              >
                <div className="h-52 rounded-lg bg-slate-200" />

                <div className="mt-4 h-5 rounded bg-slate-200" />

                <div className="mt-2 h-4 w-2/3 rounded bg-slate-200" />

                <div className="mt-4 h-5 w-1/3 rounded bg-slate-200" />

                <div className="mt-4 h-10 rounded bg-slate-200" />
              </div>
            )
          )}

        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">

          <h2 className="font-display text-xl font-bold text-red-700">
            Something went wrong
          </h2>

          <p className="mt-2 text-red-600">
            {error}
          </p>

          <button
            type="button"
            onClick={getProducts}
            className="mt-5 rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white hover:bg-red-700"
          >
            Retry
          </button>

        </div>
      )}

      {/* Empty */}
      {!loading &&
        !error &&
        sortedProducts.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">

            <h2 className="font-display text-xl font-bold text-slate-900">
              No products found
            </h2>

            <p className="mt-2 text-slate-600">
              Try changing your search or category.
            </p>

          </div>
        )}

      {/* Products */}
      {!loading &&
        !error &&
        sortedProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {sortedProducts.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              )
            )}

          </div>
        )}

    </div>
  );
}

export default ProductsPage;

