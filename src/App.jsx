import React from 'react'
export const Bookapi="https://659eae7747ae28b0bd36765e.mockapi.io/books";
export const Authorapi="https://659eae7747ae28b0bd36765e.mockapi.io/author"
import AppRoutes from './Route/AppRoutes';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';


function App() {
  let routes=createBrowserRouter(AppRoutes)
  
  return <>
  <RouterProvider router={routes}/>
  </>
}

export default App
