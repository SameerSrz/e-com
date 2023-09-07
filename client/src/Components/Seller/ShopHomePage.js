// import React from "react";
import ShopProfileData from "./ShopProfileData";
import ShopInfo from "./ShopInfo";
import styles from "../../Styles/styles";

function ShopHomePage() {
  return (
    <div className={`${styles.section} bg-[#f5f5f5] w-full`}>
      <div className="w-full flex py-10 justify-between">
        <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-2 left-10 z-10">
          <ShopInfo isOwner={false} />
        </div>
        <div className="w-[72%] rounded-[4px]">
          <ShopProfileData isOwner={false} />
        </div>
      </div>
    </div>
  );
}

export default ShopHomePage;
