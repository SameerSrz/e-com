import React, { useEffect, useState } from 'react'

const CountDown = ({data, start_Date, Finish_Date}) => {
    // console.log(start_Date)
    const [timeLeft,setTimeLeft] = useState(calculateTimeLeft())
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setTimeLeft(calculateTimeLeft());
        },1000);
        return ()=> clearTimeout(timer);
    })
    function calculateTimeLeft (){
        const difference = +new Date(Finish_Date) - +new Date();
        let timeLeft = {};
        console.log(difference)
        if(difference > 0)
        {
            timeLeft = {
                days: Math.floor((difference / (1000 * 60 * 60 * 24))),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference /1000 / 60) % 60),
                seconds: Math.floor((difference/1000 )% 60)
            }
        }
        return timeLeft;
    }
    const timerComponent = Object.keys(timeLeft).map((interval)=>{
        if(!timeLeft[interval]){
            return null;
        }
        return (
            <span className='text-[25px] text-[#475ad2]'>
              <span style={{ backgroundColor: '#f4f4f4', padding: '0.5rem' }}>{timeLeft[interval]}</span>
              <span>{" "}{interval}</span>{" "}
            </span>
          );
    })

  return (
    <>
        <div>
            {timerComponent.length ? <span className='text-6xl font-bold'>{timerComponent}</span> : <span className='text-[red] text-[25px]'>Time's Up</span>}
        </div>
    </>
  )
}

export default CountDown
