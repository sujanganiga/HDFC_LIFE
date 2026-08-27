import { useState } from "react";

const products = [
  {
    id: 1,
    title: "Laptop",
    price: 800,
  },
  {
    id: 2,
    title: "Phone",
    price: 500,
  },
  {
    id: 3,
    title: "Headphones",
    price: 100,
  },
  {
    id: 4,
    title: "Keyboard",
    price: 80,
  },
  {
    id: 5,
    title: "Monitor",
    price: 300,
  },
];

function ProductRow({ product }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4">

      <div>
        <h2 className="font-display font-bold text-slate-900">
          {product.title}
        </h2>

        <p className="text-slate-500">
          ${product.price}
        </p>
      </div>

      <div className="flex items-center gap-3">

        <span className="font-medium">
          Quantity: {quantity}
        </span>

        <button
          type="button"
          onClick={() => setQuantity(quantity + 1)}
          className="rounded-lg bg-teal-700 px-4 py-2 font-medium text-white hover:bg-teal-800"
        >
          +
        </button>

      </div>

    </div>
  );
}

function KeysPracticePage() {
  const [productList, setProductList] = useState(products);

  const sortByPrice = () => {
    const sortedProducts = [...productList].sort(
      (a, b) => a.price - b.price
    );

    setProductList(sortedProducts);
  };

  return (
    <div>

      <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900">
        React Keys Practice
      </h1>

      <p className="mt-3 text-slate-600">
        Increase a quantity and then sort the products.
      </p>

      <button
        type="button"
        onClick={sortByPrice}
        className="mt-6 rounded-lg bg-teal-700 px-5 py-3 font-medium text-white hover:bg-teal-800"
      >
        Sort by Price
      </button>

      <div className="mt-6 space-y-3">

        {productList.map((product, index) => (
          <ProductRow
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </div>
  );
}

export default KeysPracticePage;