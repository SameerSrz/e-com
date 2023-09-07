import React from 'react'
import styles from '../../Styles/styles'
import EventCard from './EventCard'
import { useSelector } from 'react-redux'

const Events = () => {
    const {allEvents} = useSelector((state)=>state.events)
  return (
    <>
        <div>
            <div className={`${styles.section}`}>
                <div className={`${styles.heading}`}>
                    <h1>Popular Event</h1>
                </div>
                <div className="w-full grid">
                    <EventCard />
                </div>
            </div>
        </div>
    </>
  )
}

export default Events
