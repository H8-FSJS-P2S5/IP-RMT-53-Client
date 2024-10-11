import { Link, useNavigate } from "react-router-dom";

export default function NavbarMember() {
  const nav = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("access_token");
    nav("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Elysia
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link active dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Member
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/user/get/private/home">
                    Table
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/user/get/private/origins">
                    Origin Art
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link active dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Akun
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    onClick={handleLogout}
                    to="/login"
                  >
                    LogOut
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <li>
            <Link href="/give-me-answer">
              <button>
                <img
                  src="https://brandlogo.org/wp-content/uploads/2024/06/Gemini-Icon-300x300.png.webp"
                  alt="Gemini Icon"
                  style={{ width: "30px", height: "30px", marginLeft: "10px" }}
                />
              </button>
            </Link>
          </li>
        </div>
      </div>
    </nav>
  );
}
