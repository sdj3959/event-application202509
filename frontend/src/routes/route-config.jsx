import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "../pages/ErrorPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import EventPage from "../pages/EventPage.jsx";
import RootLayout from "../layouts/RootLayout.jsx";
import EventDetailPage from "../pages/EventDetailPage.jsx";
import EventLayout from "../layouts/EventLayout.jsx";

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
            loader: async () => {
              console.log('event loader call!');
              const response = await fetch('http://localhost:9000/api/events');

              // loader가 리턴한 데이터는 라우팅된 페이지와 그 하위 컴포넌트에서 언제든 사용가능
              return await response.json();
            }
          },
          {
            path: ":eventId",
            element: <EventDetailPage />
          },
        ]
      },
    ],
  },
]);

export default router;