import { useState } from "react";
import {
  Link,
  Outlet,
  ReactLocation,
  Router,
  Route,
  useMatch,
  MakeGenerics,
} from "react-location";
import Users from "./views/Users";
import NormalPage from "./views/Normal";
import User from "./views/User";
import axios from "axios";
import SongsPage from "./views/Songs";
import { Songs } from "./mock/songs";

export type LocationGenerics = MakeGenerics<{
  LoaderData: {
    songs: Songs[];
    song: Songs;
  };
}>;

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

function Err() {
  const { error } = useMatch();

  return (
    <div>
      <div>Couldn't load teams!</div>
      <div>{(error as any).message}</div>
    </div>
  );
}

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
      path: "songs",
      loader: async () => {
        const res = await axios.get("/songs");
        // throw new Error("err eieiei");
        return { songs: res.data };
      },
      element: <SongsPage />,
      pendingElement: async () => <div>loading ...</div>,
      errorElement: "error eiei",
      pendingMs: 100 * 1, // .1 seconds
      pendingMinMs: 500,
    },
    {
      // path: "*",
      //   element: <Navigate to="/" />, // redirect
      element: "fallback aka not found page",
    },
  ];

  return (
    <Router
      location={location}
      routes={routes}
      // defaultErrorElement={<Err />}
      // defaultPendingElement={<div>loading ...</div>}
      // defaultPendingMs={1000 * 1}
      // defaultPendingMinMs={500}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/">home</Link>
        <Link to="page1">code-split</Link>
        <Link to="users">users</Link>
        <Link to="songs">songs</Link>
      </div>
      <hr />
      <Outlet />
    </Router>
  );
};

export default App;
