import MainLayout from './layouts/MainLayout'
import Navbar from './components/Navbar'


import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {

  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <ToastContainer />
      <MainLayout />
    </div>
  )
}

export default App
