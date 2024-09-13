'use client'
import CountUp from 'react-countup';

const AnimatedCounter = ({amount}:{amount:number}) => {
  return (
    <div>
        <CountUp 
            decimal="."
            prefix="$ "
            duration={2}
            decimals={2}
            separator=","
            end={amount}
         />
    </div>
  )
}

export default AnimatedCounter