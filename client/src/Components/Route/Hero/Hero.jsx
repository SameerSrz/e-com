import React from "react";
import styles from "../../../Styles/styles";
import { backend_url } from "../../../server";

function Hero() {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage: "url()",
        width: "100%",
        height: "full",
      }}
    >
      <img src={`${backend_url}//uploads//pin_12.jpg`} style={{ width: "100%", height: "50%" }} alt="" />
    </div>
  );
}

export default Hero;
