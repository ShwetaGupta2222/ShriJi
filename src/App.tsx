import './App.css'
import { Route, Routes } from 'react-router-dom';
// import HomePage from './components/user/HomePage';
// import CartPage from './components/user/CartPage';
// import FoodItemDetailPage from './components/reusable/ItemDetailPage';
// import { useFoodGridData } from './context/FoodGridContext';
// import ContactUsPage from './components/user/ContactUsPage';
// import AboutUsPage from './components/user/AboutUsPage';
import Header from './components/Header';
import { useAdminData } from './context/admin/AdminContext';
import { useFoodGridData } from './context/FoodGridContext';
import HomePage from './components/HomePage';
import CartPage from './components/user/CartPage';
import AboutUsPage from './components/user/AboutUsPage';
import ContactUsPage from './components/user/ContactUsPage';
import { AdminLoginPage } from './components/admin/AdminLoginPage';
import FoodItemDetailPage from './components/FoodItemDetailPage';


function App() {
  const { showAdminLoginPage } = useAdminData()
  const { showItemDetailPage } = useFoodGridData();

  return (
    <div className='w-full max-h-screen mt-[60px] md:mt-[90px] '>
      <Header />
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="*" element={<></>} />
      </Routes>
      {showAdminLoginPage && <AdminLoginPage />}
      {showItemDetailPage && <FoodItemDetailPage />}
    </div>
  )
}

export default App