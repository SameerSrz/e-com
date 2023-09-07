import React, { useEffect, useState } from "react";
import Header from "./layout/Header";
import styles from "../Styles/styles";
import ProductCard from "./Route/ProductCard";
import Footer from "./layout/Footer";
import { server } from "../server";
import axios from "axios";
import Loader from "../Loader";

const BestSelling = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/product/get-all-products`)
      .then((res) => {
        setData(res.data.products);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
    const d = data && data.sort((a, b) => a.total_sell - b.total_sell);
    setData(d);
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header activeHeading={2} />
      <br />
      <br />
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`${styles.section}`}>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {data &&
              data.map((i, index) => <ProductCard data={i} key={index} />)}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default BestSelling;
