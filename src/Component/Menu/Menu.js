import React from "react";
import "./Menu.scss";

const Menu = (props) => {
  const { history } = props;

  return (
    <header>
      <div className="navbar-custom">
        <button
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("isLoggedIn");
            history.push("/");
          }}
          className="logout btn btn-primary"
        >
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};
export default Menu;
