import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MenuAdminProvider } from './context/admin/MenuAdminContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { DataProvider } from './context/DataContext.tsx'
import { FoodGridProvider } from './context/FoodGridContext.tsx'
import { SnackbarProvider } from './context/SnackbarContext.tsx'
import { AdminProvider } from './context/admin/AdminContext.tsx'
import { GroupEditProvider } from './context/admin/GroupEditContext.tsx'
import { SingleEditProvider } from './context/admin/SingleEditContext.tsx'
import { CartProvider } from './context/user/CartContext.tsx'
import { OrderProvider } from './context/user/OrderContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <DataProvider>
        <FoodGridProvider>
          <MenuAdminProvider>
            <SnackbarProvider>
              <AdminProvider>
                <GroupEditProvider>
                  <SingleEditProvider>
                    <CartProvider>
                      <OrderProvider>
                        <App />
                      </OrderProvider>
                    </CartProvider>
                  </SingleEditProvider>
                </GroupEditProvider>
              </AdminProvider>
            </SnackbarProvider>
          </MenuAdminProvider>
        </FoodGridProvider>
      </DataProvider>
    </BrowserRouter>
  </StrictMode>
)