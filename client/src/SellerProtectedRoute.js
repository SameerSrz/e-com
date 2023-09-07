import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import Loader from "./Loader";

function SellerProtectedRoute({ children }) {
  const { isSeller, isLoading } = useSelector((state) => state.seller);
  console.log(isLoading);
  if (isLoading) {
    return <Loader />;
  }

  if (!isSeller) {
    return <Navigate to="/seller-login" replace />;
  }

  return children;
}

export default SellerProtectedRoute;
