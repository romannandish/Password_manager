import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/manager'
import Footer from './components/Footer'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div>
      <Navbar/>
      <div className='min-h-[86.5vh]'>

      <Manager/>
      </div>
      <Footer/>
     </div>
    </>
  )
}

export default App
