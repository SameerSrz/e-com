import React, { useEffect, useState } from "react";
import Header from "./layout/Header";
import EventCard from "./Route/EventCard";
import Footer from "./layout/Footer";
// import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../server";
import Loader from "../Loader";

const Events = () => {
  // const { allEvents } = useSelector((state) => state.events);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/product/get-all-events`)
      .then((res) => {
        setData(res.data.events);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <Header activeHeading={4} />
      {isLoading ? (
        <Loader />
      ) : (
        data && data.map((i, index) => <EventCard data={i} key={index} />)
      )}
      <Footer />
    </>
  );
};

export default Events;
