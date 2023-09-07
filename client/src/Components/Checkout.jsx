import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from '../Styles/styles';
import { useNavigate } from 'react-router-dom';
import { Country, State } from "country-state-city";
import { updatUserAddress, updateUserInformation } from '../redux/action/user';
import { toast } from 'react-toastify';
import axios from 'axios';
import { server } from '../server';

const Checkout = () => {
    const {user} = useSelector((state)=>state.user)
    const { cart } = useSelector((state) => state.cart);
    const [couponCode, setCouponCode] = useState("");
    const [couponCodeData, setCouponCodeData] = useState(null);
    const [discountPrice, setDiscountPrice] = useState();
    const [address1, setAddress1] = useState(user && user.addresses[0]?.address1);
    const [address2, setAddress2] = useState(user && user.addresses[0]?.address2);
    const [zipCode, setZipCode] = useState(user && user.addresses[0]?.zipCode);
    const [country, setCountry] = useState(user && user.addresses[0]?.country);
    const [city, setCity] = useState(user && user.addresses[0]?.city);
    const navigate = useNavigate();

    useEffect(()=>{
        window.scrollTo(0,0);
    },[])

    const subTotalPrice = cart.reduce((acc,item)=> acc + item.qty * item.discountPrice, 0);
    // shipping cost
    const shipping = 2;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = couponCode;
        console.log(name)
        await axios.get(`${server}/coupons/get-coupon-value/${name}`).then((res) => {
          const shopId = res.data.coupon[0]?.shopId;
          const couponCodeValue = res.data.coupon[0]?.value;
          if (res.data.coupon !== null) {
            const isCouponValid = cart && cart.filter((item) => item.shopId === shopId);
    
            if (isCouponValid.length === 0) {
              toast.error("Coupon code is not valid for this shop");
              setCouponCode("");
            } else {
              const eligiblePrice = isCouponValid.reduce(
                (acc, item) => acc + item.qty * item.discountPrice,
                0
              );
              const discountPrice = (eligiblePrice * couponCodeValue) / 100;
              setDiscountPrice(discountPrice);
              setCouponCodeData(res.data.coupon[0].name);
              setCouponCode("");
            }
          }
          if (res.data.coupon === null) {
            toast.error("Coupon code doesn't exists!");
            setCouponCode("");
          }
        });
      };

    const discountPercentenge = couponCodeData ? discountPrice : ""
    const totalPrice = couponCodeData ? (subTotalPrice + shipping - discountPercentenge).toFixed(2) : subTotalPrice + shipping;

    const paymentSubmit = ()=>{
        if (!address1 || !address2 || !zipCode || !country || !city)
        {
            toast.error("Please fill all shipping information")
        }else{
            const shippingAddress = {
                address1,
                address2,
                zipCode,
                country,
                city,
              };
          
            const orderData = {
                cart,
                totalPrice,
                subTotalPrice,
                shipping,
                discountPrice,
                shippingAddress,
                user,
            }
            
            // update local storage with the updated orders array
            localStorage.setItem("latestOrder", JSON.stringify(orderData));
            navigate("/payments");
        }
    }

  return (
    <>
        <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo user={user}
          address1={address1}
          setAddress1={setAddress1}
          address2={address2}
          setAddress2={setAddress2}
          zipCode={zipCode}
          setZipCode={setZipCode}
          country={country}
          setCountry={setCountry}
          city={city}
          setCity={setCity}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData cart={cart} 
            subTotalPrice={subTotalPrice} 
            shipping={shipping} 
            handleSubmit={handleSubmit} 
            discountPercentenge={discountPercentenge} 
            totalPrice={totalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
          />
        </div>
      </div>
      <div
        className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Go to Payment</h5>
      </div>
    </div>
    </>
  )
}

// shoping info
const ShippingInfo = ({user, address1, setAddress1, address2, setAddress2, zipCode, setZipCode, country, setCountry, city, setCity}) => {
    const [name,setName] = useState(user && user.name)
    const [email,setEmail] = useState(user && user.email)
    const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber)

    const dispatch = useDispatch();

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(updateUserInformation(name, email, phoneNumber))
        dispatch(updatUserAddress(country, city, address1, address2, zipCode))
        toast.success("Shipping Address updated Successfully")
        window.location.reload(true);
    }

    return (
      <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
        <h5 className="text-[18px] font-[500]">Shipping Address</h5>
        <br />
        <form onSubmit={handleSubmit}  aria-required={true}>
          <div className="w-full flex pb-3">
            <div className="w-[50%]">
              <label className="block pb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required
                className={`${styles.input} !w-[95%]`}
              />
            </div>
            <div className="w-[50%]">
              <label className="block pb-2">Email Address</label>
              <input
                type="email"
                value={email}
                required
                onChange={(e)=>setEmail(e.target.value)}
                className={`${styles.input}`}
              />
            </div>
          </div>
  
          <div className="w-full flex pb-3">
            <div className="w-[50%]">
              <label className="block pb-2">Phone Number</label>
              <input
                type="number"
                required
                value={phoneNumber}
                onChange={(e)=>setPhoneNumber(e.target.value)}
                className={`${styles.input} !w-[95%]`}
              />
            </div>
            <div className="w-[50%]">
              <label className="block pb-2">Zip Code</label>
              <input
                type="number"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
                className={`${styles.input}`}
              />
            </div>
          </div>
          <div className="w-full flex pb-3">
            <div className="w-[50%]">
              <label className="block pb-2">Address 1</label>
              <input
                type="address"
                required
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className={`${styles.input} !w-[95%]`}
              />
            </div>
            <div className="w-[50%]">
              <label className="block pb-2">Address 2</label>
              <input
                type="address"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                required
                className={`${styles.input}`}
              />
            </div>
          </div>

          <div className="w-full flex pb-3">
            <div className="w-[50%]">
              <label className="block pb-2">City</label>
              <input
                type="address"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={`${styles.input} !w-[95%]`}
              />
            </div>
            <div className="w-[50%]">
              <label className="block pb-2">Country</label>
              <input
                type="address"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className={`${styles.input}`}
              />
            </div>
          </div>
          <input
             className={`w-[250px] h-[40px] border-[2px] border-[#fa7e19] text-center text-[#fa7e19] rounded-[3px] mt-8 cursor-pointer`}
             required
             value="Update"
             type="submit"
            />
        </form>
      </div>
    );
  };

  const CartData = ({cart,subTotalPrice, shipping, handleSubmit, discountPercentenge, totalPrice, couponCode, setCouponCode})=>{


    return(
        <>
            <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
                <div className="flex justify-between">
                    <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
                    <h5 className="text-[18px] font-[600]">${subTotalPrice}</h5>
                </div>
                <br />
                <div className="flex justify-between">
                    <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
                    <h5 className="text-[18px] font-[600]">${shipping.toFixed(2)}</h5>
                </div>
                <br />
                <div className="flex justify-between border-b pb-3">
                    <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
                    <h5 className="text-[18px] font-[600]">
                    - {discountPercentenge ? "$" + discountPercentenge.toString() : null}
                    </h5>
                </div>
                <div className="flex justify-between border-b pb-3">
                    <h3 className="text-[16px] font-[400] text-[#000000a4]">Total:</h3>
                    <h5 className="text-[18px] font-[600] text-end pt-3">${totalPrice}</h5>
                </div>
                <br />
                <form onSubmit={handleSubmit}>
                    <input
                    type="text"
                    className={`${styles.input} h-[40px] pl-2`}
                    placeholder="Coupoun code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    required
                    />
                    <input
                    className={`w-full h-[40px] border-[2px] border-[#fa7e19] text-center text-[#fa7e19] rounded-[3px] mt-8 cursor-pointer`}
                    required
                    value="Apply code"
                    type="submit"
                    />
                </form>
            </div>
        </>
    )
  }

export default Checkout
