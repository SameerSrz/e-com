import React, { useEffect, useState } from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'
import ProfileSideBar from './ProfileSideBar'
import ProfileContent from './ProfileContent'
import styles from '../Styles/styles'

const ProfilePage = () => {
  useEffect(()=>{
    window.scrollTo(0,0);
  },[])
    const [active,setActive] = useState(1);
  return (
    <>
        <Header/>
        <div className={`${styles.section} w-full h-screen flex bg-[#f5f5f5] py-[90px] `}>
            <div className="w-[70px]  ml-[70px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
                <ProfileSideBar active={active} setActive={setActive} />
            </div>
            <ProfileContent active={active}/>
        </div>
        
    </>
  )
}

export default ProfilePage
