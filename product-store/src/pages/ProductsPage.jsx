import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";

function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get("/products?limit=12&skip=0");

        console.log(response.data);

        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      }
    };

    getProducts();
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">
        Products
      </h1>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-xl border bg-white p-4"
          >
            {/* Clickable Product */}
            <Link to={`/products/${product.id}`}>

              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-48 w-full object-cover"
              />

              <h2 className="mt-4 font-display font-bold hover:text-teal-700">
                {product.title}
              </h2>

            </Link>

            <p className="mt-2">
              ${product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;