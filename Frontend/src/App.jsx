import { useState } from 'react'
import FaceDetection from './FaceDetection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <FaceDetection/>
    </>
  )
}

export default App
