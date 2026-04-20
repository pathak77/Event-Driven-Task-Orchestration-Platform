import { createBrowserRouter } from 'react-router';
import { CreateAccount } from './pages/CreateAccount';
import { Login } from './pages/Login';
import { ForgotPassword } from './pages/ForgotPassword';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { FoodDetail } from './pages/FoodDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { TableReservation } from './pages/TableReservation';
import { ReservationForm } from './pages/ReservationForm';
import { Profile } from './pages/Profile';
import { OrderHistory } from './pages/OrderHistory';
import { Feedback } from './pages/Feedback';
import { AdminDashboard } from './pages/AdminDashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: CreateAccount,
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/forgot-password',
    Component: ForgotPassword,
  },
  {
    path: '/home',
    Component: Home,
  },
  {
    path: '/menu',
    Component: Menu,
  },
  {
    path: '/food-detail/:id',
    Component: FoodDetail,
  },
  {
    path: '/cart',
    Component: Cart,
  },
  {
    path: '/checkout',
    Component: Checkout,
  },
  {
    path: '/order-confirmation',
    Component: OrderConfirmation,
  },
  {
    path: '/table-reservation',
    Component: TableReservation,
  },
  {
    path: '/reservation-form',
    Component: ReservationForm,
  },
  {
    path: '/profile',
    Component: Profile,
  },
  {
    path: '/order-history',
    Component: OrderHistory,
  },
  {
    path: '/feedback',
    Component: Feedback,
  },
  {
    path: '/admin',
    Component: AdminDashboard,
  },
]);