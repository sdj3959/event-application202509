import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "../pages/ErrorPage.jsx";
import EventPage from "../pages/EventPage.jsx";
import RootLayout from "../layouts/RootLayout.jsx";
import EventDetailPage from "../pages/EventDetailPage.jsx";
import EventLayout from "../layouts/EventLayout.jsx";
import {eventDetailLoader} from "../loader/events-loader.js";
import NewEventPage from "../pages/NewEventPage.jsx";
import {deleteAction, saveAction as manipulateAction} from "../loader/events-actions.js";
import EditPage from "../pages/EditPage.jsx";
import HomeLayout from "../layouts/HomeLayout.jsx";
import WelcomePage from "../pages/WelcomePage.jsx";
import SignUpPage from "../pages/SignUpPage.jsx";

const router = createBrowserRouter([
  {
    path:"/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <HomeLayout />,
        children: [
          {
            index: true,
            element: <WelcomePage />
          },
          {
            path: '/sign-up',
            element: <SignUpPage />
          },
        ]
      },
      {
        path: 'events',
        element: <EventLayout />,
        children:[
          {
            index: true,
            element: <EventPage />,
            // loader 함수는 언제 실행되냐? 페이지가 라우팅 될 때 트리거됨
            // loader: eventListLoader
          },
          {
            path: "new",
            element: <NewEventPage />,
            // action 함수는 CUD를 트리거
            action: manipulateAction
          },
          {
            path: ":eventId",
            element: <EventDetailPage />,
            loader:eventDetailLoader,
            action: deleteAction
          },
          {
            path: ':eventId/edit',
            element: <EditPage />,
            loader:eventDetailLoader,
            action: manipulateAction
          },
        ]
      },
    ],
  },
]);

export default router;