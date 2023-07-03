import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Menu from './pages/menu'
import Taskone from './pages/oneTask';
import NewTask from './pages/newTask';

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Menu/>
      },
      {
        path:'/chossenTask/:id',
        element:<Taskone/>
      },
      {
        path:'/newTask',
        element:<NewTask/>
      }
    ]
  }
])


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
