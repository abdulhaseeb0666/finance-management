import { Suspense } from "react"

const layout = ({children , modal} : {children: React.ReactNode , modal: React.ReactNode}) => {
  return (
    <div>
      {children}
      <Suspense fallback={<div>Loading...</div>}>
        {modal}
      </Suspense>
    </div>
  )
}

export default layout
