import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../Components/Seller/Login";

function ShopLoginPage() {
  const navigate = useNavigate();
  const { isSeller, seller } = useSelector((state) => state.seller);
  useEffect(() => {
    if (isSeller) {
      navigate(`/shop/${seller._id}`);
    }
  });
  return (
    <div>
      <Login />
    </div>
  );
}

export default ShopLoginPage;
