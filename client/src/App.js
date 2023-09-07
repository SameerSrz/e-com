import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import ProductPage from "./Components/ProductPage";
import BestSelling from "./Components/BestSelling";
import Events from "./Components/Events";
import FaqPage from "./Components/FaqPage";
import ProductDetail from "./Components/ProductDetail";
import ActivationPage from "./Components/Activation";
import "react-toastify/dist/ReactToastify.css";
import { server } from "./server";
import store from "./redux/Store";
import { loadUser, loadSeller } from "./redux/action/user";
// import { useSelector } from 'react-redux'
import ProfilePage from "./Components/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import SellerSignUp from "./Components/Seller/SellerSignUp";
import SellerActivationPage from "./Components/Seller/SellerActivationPage";
import SellerLogin from "./Components/Seller/Login";
import ShopHomePage from "./Components/Seller/ShopHomePage";
import SellerProtectedRoute from "./SellerProtectedRoute";
// import ShopLoginPage from './Pages/ShopLoginPage'
import ShopDashboard from "./Components/Seller/ShopDashboard";
import CreateProductPage from "./Components/Seller/CreateProductPage";
import ShopAllProductsPage from "./Components/Seller/ShopAllProductsPage";
import CreateEventPage from "./Components/Seller/CreateEventPage";
import ShopAllEventsPage from "./Components/Seller/ShopAllEventsPage";
import ShopCouponPage from "./Components/Seller/ShopCouponPage";
import { getAllProducts } from "./redux/action/product";
import { getAllEvents, getAllShopEvents } from "./redux/action/event";
import CheckoutPage from "./Components/CheckoutPage";
import PaymentsPage from "./Components/PaymentsPage";
import OrderSuccessPage from "./Components/OrderSuccessPage";
import { getAllOrders } from "./redux/action/order";
import ShopAllOrdersPage from "./Components/Seller/ShopAllOrdersPage";
import OrderDetailPage from "./Components/Seller/OrderDetailPage";
import ShopOrderRefund from "./Components/Seller/ShopOrderRefund";
import ShopWithdrawPage from "./Components/Seller/ShopWithdrawPage";
import UserOrderPage from "./Components/UserOrderPage";
import ShopCustomerPage from "./Components/Seller/ShopCustomerPage";
import AdminDashboardPage from "./Components/Admin/AdminDashboardPage";
import AdminAllProductPage from "./Components/Admin/AdminAllProductPage";
import AdminAllOrderPage from "./Components/Admin/AdminAllOrderPage";
import AdminAllEventsPage from "./Components/Admin/AdminAllEventsPage";
import AdminAllCouponsPage from "./Components/Admin/AdminAllCouponsPage";
import AllCustomersPage from "./Components/Admin/AllCustomersPage";
import AdminAllSellersPage from "./Components/Admin/AdminAllSellersPage";
import AdminLoginPage from "./Components/Admin/AdminLoginPage";
import AllSellerRequestPage from "./Components/Admin/AllSellerRequestPage";
import CreateCategoryPage from "./Components/Admin/CreateCategoryPage";
import ShopOrderUpdatePage from "./Components/Seller/ShopOrderUpdatePage";
import AdminWithdrawlPage from "./Components/Admin/AdminWithdrawlPage";
import ErrorPage from "./Components/ErrorPage";
import AdminSubscriberPage from './Components/Admin/AdminSubscriberPage'

function App() {
  const [stripeApi, setStripeApi] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(`${server}/payments/stripeapikey`);
    setStripeApi(data.stripeApiKey);
    
  }
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadSeller());
    store.dispatch(getAllProducts());
    store.dispatch(getAllEvents());
    store.dispatch(getAllShopEvents());
    store.dispatch(getAllOrders());
    getStripeApiKey();
  }, []);
  
  return (
    <BrowserRouter>
      {stripeApi && (
        <Elements stripe={loadStripe(stripeApi)}>
          <Routes>
            <Route
              path="/payments"
              element={(
                <ProtectedRoute>
                  <PaymentsPage />
                </ProtectedRoute>
              )}
            />
          </Routes>
        </Elements>
      )}
      <Routes>
        {/* Admin Route */}
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin-all-products" element={<AdminAllProductPage />} />
        <Route path="/admin-all-orders" element={<AdminAllOrderPage />} />
        <Route path="/admin-all-events" element={<AdminAllEventsPage />} />
        <Route path="/admin-all-coupons" element={<AdminAllCouponsPage />} />
        <Route path="/admin-all-customers" element={<AllCustomersPage />} />
        <Route path="/admin-all-sellers" element={<AdminAllSellersPage />} />
        <Route path="/admin-all-sellers-request" element={<AllSellerRequestPage />} />
        <Route path="/admin-create-category" element={<CreateCategoryPage />} />
        <Route path="/admin-withdrawl-request" element={<AdminWithdrawlPage />} />
        <Route path="/admin-subscriber" element={<AdminSubscriberPage />} />

        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/activation/:activation_token" element={<ActivationPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product/:name" element={<ProductDetail />} />
        <Route path="/best-selling" element={<BestSelling />} />
        <Route path="/events" element={<Events />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route
          path="/profile"
          element={(
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
)}
        />
        <Route
          path="/checkout"
          element={(
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
            )}
        />
        <Route
          path="/user/order/:id"
          element={(
            <ProtectedRoute>
              <UserOrderPage />
            </ProtectedRoute>
            )}
        />
        <Route
          path="/order-success"
          element={(
            <ProtectedRoute>
              <OrderSuccessPage />
            </ProtectedRoute>
              )}
        />
        {/* Shop Routes */}
        <Route path="/seller-signup" element={<SellerSignUp />} />
        <Route path="/seller/activation/:activation_token" element={<SellerActivationPage />} />
        <Route path="/seller-login" element={<SellerLogin />} />
        <Route
          path="/shop/:id"
          element={

            <ShopHomePage />

            }
        />
        <Route
          path="/dashboard"
          element={(
            <SellerProtectedRoute>
              <ShopDashboard />
            </SellerProtectedRoute>
              )}
        />
        <Route
          path="/dashboard-orders"
          element={(
            <SellerProtectedRoute>
              <ShopAllOrdersPage />
            </SellerProtectedRoute>
              )}
        />
        <Route
          path="/update-order/:id"
          element={(
            <SellerProtectedRoute>
              <ShopOrderUpdatePage />
            </SellerProtectedRoute>
              )}
        />
        <Route
          path="/dashboard-withdraw"
          element={(
            <SellerProtectedRoute>
              <ShopWithdrawPage />
            </SellerProtectedRoute>
              )}
        />
        <Route
          path="/order-detail/:id"
          element={(
            <SellerProtectedRoute>
              <OrderDetailPage />
            </SellerProtectedRoute>
              )}
        />
        <Route
          path="/dashboard-create-products"
          element={(
            <SellerProtectedRoute>
              <CreateProductPage />
            </SellerProtectedRoute>
              )}
        />
        <Route
          path="/dashboard-products"
          element={(
            <SellerProtectedRoute>
              <ShopAllProductsPage />
            </SellerProtectedRoute>
              )}
        />
        <Route
          path="dashboard-create-events"
          element={(
            <SellerProtectedRoute>
              <CreateEventPage />
            </SellerProtectedRoute>
              )}
        />
        <Route
          path="dashboard-events"
          element={(
            <SellerProtectedRoute>
              <ShopAllEventsPage />
            </SellerProtectedRoute>
              )}
        />
        <Route
          path="dashboard-refunds"
          element={(
            <SellerProtectedRoute>
              <ShopOrderRefund />
            </SellerProtectedRoute>
              )}
        />
        <Route
          path="dashboard-customers"
          element={(
            <SellerProtectedRoute>
              <ShopCustomerPage />
            </SellerProtectedRoute>
              )}
        />
        <Route
          path="dashboard/coupons"
          element={(
            <SellerProtectedRoute>
              <ShopCouponPage />
            </SellerProtectedRoute>
              )}
        />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
