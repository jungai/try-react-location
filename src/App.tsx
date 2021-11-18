import { useState } from "react";
import {
  Link,
  MakeGenerics,
  Outlet,
  ReactLocation,
  Router,
  useMatch,
  Route,
  Navigate,
} from "react-location";
import Users from "./views/Users";
import NormalPage from "./views/Normal";
import User from "./views/User";

const App: React.FC = () => {
  // Set up a ReactLocation instance
  const location = new ReactLocation();

  const routes: Route[] = [
    {
      path: "/",
      element: <NormalPage />,
    },
    {
      path: "page1",
      element: () =>
        import("./views/CodeSplitting").then((mod) => <mod.default />),
    },
    {
      path: "users",
      children: [
        {
          path: "/",
          element: <Users />,
        },
        {
          path: "new",
          element: "create new user",
        },
        // order priority
        {
          path: ":id",
          element: <User />,
        },
      ],
    },
    {
      // path: "*",
      //   element: <Navigate to="/" />, // redirect
      element: "fallback aka not found page",
    },
  ];

  return (
    <Router location={location} routes={routes}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/">home</Link>
        <Link to="page1">code-split</Link>
        <Link to="users">users</Link>
      </div>
      <hr />
      <Outlet />
    </Router>
  );
};

export default App;
