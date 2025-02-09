import React from 'react'
import { Outlet } from 'react-router'
import DetailedCard from '~/components/DetailedCard'


function detailedCard() {

  return (
    <div>
      <>
      <Outlet />
      <p>sdfsd</p>

      </>
    </div>
  )
}

export default detailedCard
