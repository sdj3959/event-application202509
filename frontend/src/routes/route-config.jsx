import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "../pages/ErrorPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import EventPage from "../pages/EventPage.jsx";
import RootLayout from "../layouts/RootLayout.jsx";
import EventDetailPage from "../pages/EventDetailPage.jsx";
import EventLayout from "../layouts/EventLayout.jsx";
import {eventListLoader, eventDetailLoader} from "../loader/events-loader.js";

const router = createBrowserRouter([
  {
    path:"/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'events',
        element: <EventLayout />,
        children:[
          {
            index: true,
            element: <EventPage />,
            // loader 함수는 언제 실행되냐? 페이지가 라우팅 될 때 트리거됨
            loader: eventListLoader
          },
          {
            path: ":eventId",
            element: <EventDetailPage />,
            loader:eventDetailLoader
          },
        ]
      },
    ],
  },
]);

export default router;