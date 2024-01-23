// halaman route
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Calculator, FetchApi, Home, TicTacToe } from "./pages";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/tictactoe",
      element: <TicTacToe />,
    },
    {
      path: "/fetchapi",
      element: <FetchApi />,
    },
    {
      path: "/calculator",
      element: <Calculator />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
