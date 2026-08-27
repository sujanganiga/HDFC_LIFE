import { useParams } from "react-router-dom";

function ProductDetailPage() {
  const { id } = useParams();

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-slate-900">
        Product Detail Page
      </h1>

      <p className="mt-3 text-slate-600">
        Product ID: {id}
      </p>
    </div>
  );
}

export default ProductDetailPage;