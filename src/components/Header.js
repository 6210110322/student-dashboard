import React from "react";
import { Link } from "react-router-dom";
import transition from 'bootstrap'

const Header = ({ active, setActive, user, handleLogout }) => {
  const userId = user?.uid;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid bg-faded padding-media">
        <div className="container padding-media">
          <nav className="navbar navbar-toggleable-md navbar-light">
            <button
              className="navbar-toggler mt-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              data-bs-parent="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="true"
              aria-label="Toggle Navigation"
            >
              <span className="fa fa-bars"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Link to="/" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link ${
                      active === "home" ? "active" : ""
                    }`}
                    onClick={() => setActive("home")}
                  >
                    Home
                  </li>
                </Link>

                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link ${
                      active === "dashboard" ? "active" : ""
                    }`}
                    onClick={() => setActive("dashboard")}
                  >
                    Dashboard
                  </li>
                </Link>

                <Link to="/todo" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link ${
                      active === "todo" ? "active" : ""
                    }`}
                    onClick={() => setActive("todo")}
                  >
                    To-Do
                  </li>
                </Link>

                <Link to="/allclass" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link ${
                      active === "class" ? "active" : ""
                    }`}
                    onClick={() => setActive("class")}
                  >
                    Class
                  </li>
                </Link>
                
                <Link to="/allwork" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link ${
                      active === "work" ? "active" : ""
                    }`}
                    onClick={() => setActive("work")}
                  >
                    Work
                  </li>
                </Link>
              </ul>
              <div className="row g-3">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  {userId ? (
                    <>
                      <div className="profile-logo">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          alt="logo"
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            marginTop: "12px",
                          }}
                        />
                      </div>
                      <p style={{ marginTop: "12px", marginLeft: "5px" }}>
                        {user?.displayName}
                      </p>
                      <li className="nav-item nav-link" onClick={handleLogout}>
                        Logout
                      </li>
                    </>
                  ) : (
                    <Link to="/auth" style={{ textDecoration: "none" }}>
                      <li
                        className={`nav-item nav-link ${
                          active === "login" ? "active" : ""
                        }`}
                        onClick={() => setActive("login")}
                      >
                        Login
                      </li>
                    </Link>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  )
}

export default Header