import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import LoginForm from '../layout/LoginForm'
import RegisterForm from '../layout/RegisterForm'
import useAuth from '../hooks/useAuth'
import Header from '../layout/Header'

import BookingHistry from '../layout/ฺBookingHistry'
import CreaTable from '../layout/CreaTable'
import UserRolesUpdate from '../layout/UserRolesUpdate'
import HomeUser from '../components/HomeUser'
import Product from '../components/Product'
import PaymentPage from '../layout/PaymentPage'
import ReservationForm from '../components/ReservationForm'
import CheckSlip from '../layout/Checkslip'
import UserBookingHistory from '../components/UserBookingHistory'
import AdminHome from '../layout/AdminHome'
import ShowHome from '../layout/ShowHome'


const guestRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header />
      <Outlet />
    </>,
    children: [
      { index: true, element: <ShowHome /> },
      { path: '/login', element: <LoginForm />},
      { path: '/register', element: <RegisterForm />}
    ]
  }
])

const adminRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header />
      <Outlet />
    </>,
    children : [
      { index: true, element: <AdminHome /> },
      { path: '/bookinghistry', element: <BookingHistry/>},
      { path: '/newtable',element: <CreaTable/>},
      { path: '/UserRoleUpdate',element: <UserRolesUpdate/>}

    ]
  }
])
const userRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header />
      <Outlet />
    </>,
    children : [
      { index: true, element: <HomeUser /> },
      { path: '/bookinghistryuser', element: <UserBookingHistory/>},
      { path: '/table/:id',element: <Product/>},
      { path: '/reserve/:id',element: <ReservationForm/>},
      { path: '/payment/:id',element: <PaymentPage/>},
      { path: '/checkslip/:id',element: <CheckSlip/>}

    ]
  }
])

export default function AppRouter() {
  const {user} = useAuth()
  const finalRouter = user?.role === 'ADMIN' ? adminRouter : user ? userRouter : guestRouter
  return (
    <RouterProvider router={finalRouter} />
  )
}
