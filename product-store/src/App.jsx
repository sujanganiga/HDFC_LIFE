import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import RootLayout from "./layouts/RootLayout";

import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";
import KeysPracticePage from "./pages/KeysPracticePage";



function RequireAdmin({ children }) {
  const isAdmin = false;

  if (!isAdmin) {
    return <Navigate to="/products" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<RootLayout />}>

          <Route
            path="/"
            element={
              <Navigate
                to="/products"
                replace
              />
            }
          />

          <Route
            path="/products"
            element={<ProductsPage />}
          />

          <Route
            path="/products/:id"
            element={<ProductDetailPage />}
          />

          <Route
            path="/cart"
            element={<CartPage />}
          />

          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminPage />
              </RequireAdmin>
            }
          />

          <Route
            path="/keys"
            element={<KeysPracticePage />}
          />

          <Route
            path="*"
            element={<NotFoundPage />}
          />
          <Route
            path="/products/:id"
            element={<ProductDetailPage />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;