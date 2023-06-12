import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import Home from './pages/Home';
import Stock from './pages/Stock';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import NotFoundPage from './pages/404/NotFoundPage';
import Layout from './components/Layout';
import { client } from './graphql/client';
import {
  ROOT_PAGE,
  NOT_FOUND_PAGE,
  STOCK_PAGE,
  ORDER_PAGE,
  ORDER_DETAILS_PAGE,
  SIGN_UP,
  SIGN_IN,
} from './routes';
import Order from './pages/Order';
import OrderDetails from './pages/Order/orderDetails';

function App() {
  const router = createBrowserRouter([
    {
      path: ROOT_PAGE,
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: SIGN_UP,
          element: <Signup />,
        },
        {
          path: SIGN_IN,
          element: <Login />,
        },
        {
          path: STOCK_PAGE,
          element: <Stock />,
        },
        {
          path: ORDER_PAGE,
          element: <Order />,
        },
        {
          path: ORDER_DETAILS_PAGE,
          element: <OrderDetails />,
        },
        {
          path: NOT_FOUND_PAGE,
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}
export default App;
