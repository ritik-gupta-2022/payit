import HeaderBox from '@/components/shared/HeaderBox'
import RightSidebar from '@/components/shared/RightSidebar'
import TotalBalanceBox from '@/components/shared/TotalBalanceBox'
import React, { useState } from 'react'

const Home = () => {
  const loggedIn = {firstName:'Ritik', lastName:'Gupta', email:'ag@gmail.com'};
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
         <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
            subtext='Access and manage your account and transactions efficiently.'
            />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>

        {/* recent transactions */}
      </div>

      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance:50.12}, {currentBalance:122.12}]}
      />
    </section>
  )
}

export default Home