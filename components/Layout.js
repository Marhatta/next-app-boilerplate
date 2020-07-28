import React from "react";

/**
 * Layout acts as a wrapper around children
 * Takes children as props 
 */
const Layout = ({ children }) => {
  return (
    <>
        {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link disabled"
                href="#"
                tabIndex="-1"
                aria-disabled="true"
              >
                Disabled
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {/* children */}
      <div className="m-3">{children}</div>
      {/* Footer  */}
      <div className="alert alert-secondary fixed-bottom m-0">
        <span> This is a footer</span>
      </div>
    </>
  );
};

export default Layout;
