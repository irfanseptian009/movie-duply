import Header from "./pages/Header.jsx";
import Home from "./pages/Home.jsx";
import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Favorites from "./pages/Favorites";
import Detail from "./pages/Detail";
import Footer from "./pages/Footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
  {
    path: "/:id",
    element: <Detail />,
  },
]);

const App = () => {
  return (
    <div className="all-pages">
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
};

export default App;
