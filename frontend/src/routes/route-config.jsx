import {createBrowserRouter} from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage.jsx';
import EventPage from '../pages/EventPage.jsx';
import RootLayout from '../layouts/RootLayout.jsx';
import EventDetailPage from '../pages/EventDetailPage.jsx';
import EventLayout from '../layouts/EventLayout.jsx';
import {authCheckLoader, eventDetailLoader, userDataLoader} from '../loader/events-loader.js';
import {deleteAction, saveAction as manipulateAction, loginAction, logoutAction} from '../loader/events-actions.js';
import NewEventPage from '../pages/NewEventPage.jsx';
import EditPage from '../pages/EditPage.jsx';
import HomeLayout from '../layouts/HomeLayout.jsx';
import WelcomePage from '../pages/WelcomePage.jsx';
import SignUpPage from '../pages/SignUpPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    errorElement: <ErrorPage/>,
    loader: userDataLoader,
    // loader의 리턴데이터는 children(Outlet)들에게는 전달되지 않는게 기본
    // 그런데 id를 주면 Children들이 id로 가져갈 수 있음
    id: 'user-token-data',
    children: [
      {
        path: '',
        element: <HomeLayout />,
        children: [
          {
            index: true,
            element: <WelcomePage />,
            action: loginAction,
          },
          {
            path: '/sign-up',
            element: <SignUpPage />
          },
          {
            path: '/logout',
            action: logoutAction
          }
        ]
      },
      {
        path: 'events',
        element: <EventLayout/>,
        loader: authCheckLoader, // 라우트 가드
        children: [
          {
            index: true,
            element: <EventPage/>,
            // loader함수는 언제 실행되냐? 페이지가 라우팅될 때 트리거됨
            // loader: eventListLoader
          },
          {
            path: 'new',
            element: <NewEventPage />,
            // action함수는 CUD를 트리거
            action: manipulateAction
          },
          {
            path: ':eventId',
            element: <EventDetailPage/>,
            loader: eventDetailLoader,
            action: deleteAction
          },
          {
            path: ':eventId/edit',
            element: <EditPage />,
            loader: eventDetailLoader,
            action: manipulateAction
          },
        ]
      },
    ]
  },
]);

export default router;