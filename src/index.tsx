import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store";
import Profile from "./pages/Profile";
import Root from "./pages/Root";
import Signup from "./pages/Signup";
import TodoList from "./pages/TodoList";
import Weather from "./pages/Weather";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Profile /> },
      { path: "/profile", element: <Profile /> },
      { path: "/todos", element: <TodoList /> },
      { path: "/weather", element: <Weather /> },
    ],
  },
  { path: "/signup", element: <Signup /> },
]);

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
