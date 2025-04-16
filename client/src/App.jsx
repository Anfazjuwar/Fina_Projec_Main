import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";

import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";

import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";

import ShoppingLayout from "./components/shopping-view/layout";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";

import UnauthPage from "./pages/unauth-page";
import NotFound from "./pages/not-found";
import { Skeleton } from "@/components/ui/skeleton";
import MainlayOut from "./components/MainHome.jsx/layOutMain";

import ShoppingMainHome from "./components/MainHome.jsx/Mainhome";
import AdminCars from "./pages/admin-view/Cars";
import Admincars from "./pages/admin-view/Cars";
import ShoppingCarLayout from "./components/CarsShopping/layout";
import ShoppingCarHome from "./pages/cars-view/home";
import ShoppingCarListing from "./pages/cars-view/listingcars";
import CarCheckout from "./pages/cars-view/CheckOut";
import AdminCarOrdersView from "./components/admin-view/Cars/car-order";
import AdminCarOrders from "./pages/admin-view/carOrder";
import CarSell from "./pages/cars-view/carSell";
import CarSellAdmin from "./components/admin-view/Cars/careSellView";
import ChatbotDialog from "./pages/chatBot/chatbot";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800px] h-[600px] bg-black" />;

  const redirectFromRoot = () => {
    if (!isAuthenticated) return <Navigate to="/auth/login" />;
    if (user?.role === "admin") return <Navigate to="/admin/dashboard" />;
    return <Navigate to="/main/home" />;
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <div className="flex flex-col overflow-hidden bg-white">
        {/* Your existing content */}
        <ChatbotDialog />

        <Routes>
          {/* <Route path="/main" element={<MainlayOut />}>
          <Route path="home" element={<ShoppingMainHome />} />
        </Route> */}
          {/* Auth (no MainLayout) */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route
              path="login"
              element={
                isAuthenticated ? (
                  user?.role === "admin" ? (
                    <Navigate to="/admin/dashboard" />
                  ) : (
                    <Navigate to="/main/home" />
                  )
                ) : (
                  <AuthLogin />
                )
              }
            />
            <Route
              path="register"
              element={
                isAuthenticated ? (
                  user?.role === "admin" ? (
                    <Navigate to="/admin/dashboard" />
                  ) : (
                    <Navigate to="/main/home" />
                  )
                ) : (
                  <AuthRegister />
                )
              }
            />
          </Route>
          {/* Admin Routes */}
          {/* Admin Protected */}
          <Route
            path="/admin"
            element={
              !isAuthenticated || user?.role !== "admin" ? (
                <Navigate to="/unauth-page" />
              ) : (
                <AdminLayout />
              )
            }
          >
            <Route path="admincars" element={<Admincars />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="carsOrders" element={<AdminCarOrders />} />
            <Route path="features" element={<AdminFeatures />} />
            <Route path="carsrecived" element={<CarSellAdmin />} />
          </Route>

          {/* Everything else with MainlayOut */}
          {/* Main Layout for Users */}
          <Route path="/" element={<MainlayOut />}>
            <Route
              path="account"
              element={
                !isAuthenticated ? (
                  <Navigate to="/auth/login" />
                ) : (
                  <ShoppingAccount />
                )
              }
            />
            {/* Home */}
            {/* Cars */}
            <Route path="/cars" element={<ShoppingCarLayout />}>
              <Route path="home" element={<ShoppingCarHome />} />
              <Route path="listing" element={<ShoppingCarListing />} />
              <Route path="sell" element={<CarSell />} />
              <Route
                path="checkout"
                element={
                  !isAuthenticated ? (
                    <Navigate to="/auth/login" />
                  ) : (
                    <CarCheckout />
                  )
                }
              />
            </Route>

            {/* Cars */}

            {/* Shop Layout */}
            <Route path="shop" element={<ShoppingLayout />}>
              <Route path="home" element={<ShoppingHome />} />
              <Route path="listing" element={<ShoppingListing />} />
              <Route path="search" element={<SearchProducts />} />
              <Route
                path="checkout"
                element={
                  !isAuthenticated ? (
                    <Navigate to="/auth/login" />
                  ) : (
                    <ShoppingCheckout />
                  )
                }
              />

              <Route
                path="paypal-return"
                element={
                  !isAuthenticated ? (
                    <Navigate to="/auth/login" />
                  ) : (
                    <PaypalReturnPage />
                  )
                }
              />
              <Route
                path="payment-success"
                element={
                  !isAuthenticated ? (
                    <Navigate to="/auth/login" />
                  ) : (
                    <PaymentSuccessPage />
                  )
                }
              />
            </Route>
          </Route>
          {/* Other Pages */}
          <Route path="/unauth-page" element={<UnauthPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
