import React from 'react'
import { Suspense } from "react"
import DashboardContent from './DashboardContent'

const page = () => {
  return (
    <div>
      <Suspense>
        <DashboardContent />        
      </Suspense>
    </div>
  )
}

export default page
