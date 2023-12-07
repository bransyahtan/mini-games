import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FetchApi, Home, TicTacToe } from "./pages";

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/tictactoe",
      element: <TicTacToe/>,
    },
    {
      path: "/fetchapi",
      element: <FetchApi/>,
    },
    
  ]);
  return (
    <RouterProvider router={router} />
  )
}

export default App
