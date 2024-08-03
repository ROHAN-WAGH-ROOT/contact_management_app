import React from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Contact from './pages/Contact';
import Sidebar from './Layout/sidebar';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <h1>Hello World</h1>
          <Link to="contact">Contact</Link>
        </div>
      ),
    },
    {
      path: "contact",
      element: <Contact />,
    },
  ]);
  
  return (
    <div className="text-6xl">
      <Sidebar>

        <RouterProvider router={router} />
      </Sidebar>
    </div>
  );
}

export default App;
