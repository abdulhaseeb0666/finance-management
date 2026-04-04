import React from 'react'
import { Suspense } from 'react';
import DashboardPage from './signup_content';

const page = () => {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <DashboardPage />
      </Suspense>
    </div>
  )
}

export default page
