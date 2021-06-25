import { useState, Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useIdleTimer } from "react-idle-timer";
import { IdleTimeOutModal } from "./Component/TimeoutModal/TimeoutModal";
import "bootstrap/dist/css/bootstrap.min.css";
import routes from "./Config/Routes";
import "./App.css";

function App(props) {
  const [showModal, setShowModal] = useState(false);

  const handleOnIdle = () => {
    const isLoggedin = localStorage.getItem("isLoggedIn") || false;
    if (isLoggedin) {
      setShowModal(true);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    props.history.push("/");
  };

  const handleLogout = () => {
    setShowModal(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
  };

  useIdleTimer({
    timeout: 1000 * 60 * 20,
    onIdle: handleOnIdle,
    debounce: 500,
  });

  const getRouteAuth = (props) => {
    const { path } = props.match;
    const newPath = routes.filter((res) => res.path === path);
    const isLoggedin = localStorage.getItem("isLoggedIn") || false;
    if (isLoggedin === "true") {
      if (path === "/login" || path === "/") {
        return <Redirect to="/stock" {...props} />;
      } else {
        const Component = newPath[0].component;
        return <Component {...props} />;
      }
    } else if (path === "/" || path === "/login") {
      //After logout
      const Component = routes[0].component;
      return <Component {...props} />;
    } else {
      return <Redirect to="/" />;
    }
  };

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {routes.map((route, index) => {
              return (
                <Route
                  {...props}
                  key={index}
                  exact={route.exact}
                  path={route.path}
                  component={getRouteAuth}
                  menus={routes}
                />
              );
            })}
          </Switch>
        </Suspense>
      </BrowserRouter>
      <IdleTimeOutModal
        showModal={showModal}
        handleClose={handleClose}
        handleLogout={handleLogout}
      />
    </>
  );
}

export default App;
