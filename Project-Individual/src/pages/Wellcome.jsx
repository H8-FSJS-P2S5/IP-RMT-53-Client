import { Link } from "react-router-dom";

export default function Wellcome() {
  return (
    <div id="carouselExampleIndicators" className="carousel slide">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to={0}
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        />
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to={1}
          aria-label="Slide 2"
        />
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to={2}
          aria-label="Slide 3"
        />
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://images.unsplash.com/photo-1511460432227-7e6bb99f9c9b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="d-block w-100"
            alt="..."
            style={{ height: "100vh", objectFit: "cover" }}
          />
          <div
            className="position-absolute top-0 start-0 w-100 h-100 bg-dark"
            style={{ opacity: "0.5" }}
          />
          <div className="carousel-caption d-flex flex-column align-items-center justify-content-center h-100">
            <h1 className="display-4 fw-bold">
              "Timeless Visions, Exclusively Yours"
            </h1>
            <p className="lead fw-semibold">"Mail Widodo"</p>
            <Link to="/home" className="btn btn-light">
              Learn More
            </Link>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="https://images.unsplash.com/photo-1523895665936-7bfe172b757d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="d-block w-100"
            alt="..."
            style={{ height: "100vh", objectFit: "cover" }}
          />
          <div
            className="position-absolute top-0 start-0 w-100 h-100 bg-dark"
            style={{ opacity: "0.5" }}
          />
          <div className="carousel-caption d-flex flex-column align-items-center justify-content-center h-100">
            <h1 className="display-4 fw-bold">
              "Elevating Photography to Perfection"
            </h1>
            <p className="lead fw-semibold">"Ardianto Mail"</p>
            <Link to="/home" className="btn btn-light">
              Learn More
            </Link>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="https://images.unsplash.com/photo-1533134663120-ec7e68d56494?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="d-block w-100"
            alt="..."
            style={{ height: "100vh", objectFit: "cover" }}
          />
          <div
            className="position-absolute top-0 start-0 w-100 h-100 bg-dark"
            style={{ opacity: "0.5" }}
          />
          <div className="carousel-caption d-flex flex-column align-items-center justify-content-center h-100">
            <h1 className="display-4 fw-bold">
              "Capturing Elegance Beyond Boundaries"
            </h1>
            <p className="lead fw-semibold">"Mail Suryo"</p>
            <Link to="/home" className="btn btn-light">
              Learn More
            </Link>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
