import React, { useEffect, useState } from 'react'
import Header from './layout/Header'
import Hero from './Route/Hero/Hero'
import Categories from './Route/Categories'
import BestDeals from './Route/BestDeals'
import FeauredProduct from './Route/FeauredProduct'
// import Events from './Route/Events'
import Footer from './layout/Footer'
import { popUps } from '../Static/Data'
import { toast } from 'react-toastify'

const Home = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      showPopUps();
    }, 8000);

    return () => {
      clearInterval(intervalId); // Cleanup the interval on component unmount
    };
  }, []);

  const showPopUps = () => {
    const popUp = popUps[currentIndex]?.title;
    toast(popUp, {
      position: toast.POSITION.TOP_RIGHT
    });

    setCurrentIndex(prevIndex => {
      let newIndex = prevIndex + 1;
      if (newIndex >= popUps.length) {
        newIndex = 0;
      }
      return newIndex;
    });
  };

  return (
    <>
        <Header activeHeading={1}/>
        <Hero/>
        <br />
        <BestDeals/>
        <Categories/>
        {/* <Events/> */}
        <FeauredProduct/>
        <Footer/>
    </>
  )
}

export default Home
