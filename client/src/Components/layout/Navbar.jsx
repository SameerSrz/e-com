import React from 'react'
import styles from '../../Styles/styles'
import { navItems } from '../../Static/Data'
import { Link } from 'react-router-dom'

const Navbar = ({active}) => {
  return (
    <>
       <div className={`block 800px:${styles.noramlFlex}`}>
         {
            navItems && navItems.map((i,index) => (
                <div className="flex">
                    <Link to={i.url}
                    className={`${active === index + 1} ? "text-[#28559A] 800px:text-[#ffffff]" : "text-black 800px:text-[#ffffff] " pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}
                    >
                    {i.title}
                    </Link>
                </div>
            ))
         }
    </div>
    </>
  )
}

export default Navbar
