import { Link, useNavigate } from "react-router-dom";

export default function NavbarLogin() {

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-lg">
      <div className="container-fluid justify-content-center">
        <Link className="navbar-brand mx-auto" to="/">
         ~ Elysia ~
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
      </div>
    </nav>
  );
}
