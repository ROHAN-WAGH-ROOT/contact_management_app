import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Contact from "./pages/Contact";
import Sidebar from "./Layout/sidebar";
import Charts from "./pages/Charts";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Sidebar>
          <Contact />
        </Sidebar>
      ),
    },
    {
      path: "chartsandmaps",
      element: (
        <Sidebar>
          <Charts />
        </Sidebar>
      ),
    },
  ]);

  return (
    <div className="w-full h-screen bg-gray-200">
      <RouterProvider router={router} />
      <Outlet />
    </div>
  );
}
export default App;
