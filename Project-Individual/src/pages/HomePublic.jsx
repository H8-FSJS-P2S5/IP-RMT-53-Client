import { useEffect, useState } from "react";
import errorHandling from "../util/errors";
import { request } from "../util/axios";
import { Link } from "react-router-dom";

export default function HomePublic() {
  const [art, setArt] = useState([]);

  const fetchBlog = async () => {
    try {
      const response = await request({
        method: "get",
        url: "/public/allArts",
      });
      setArt(response.data.data);
    } catch (error) {
      errorHandling(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);
  return (
    <>
      <div className="container mt-4">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {art.map((e) => (
            <div className="col" key={e.id}>
              <div className="card h-100">
                <img
                  src={e.imageUrl}
                  className="card-img-top"
                  alt={e.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{e.title}</h5>
                  <p className="card-title">
                    <strong>Description:</strong> {e.description}
                  </p>
                  <p className="card-text">
                    <strong>Artist:</strong> {e.artis || "Unknown or Uncivilization"}
                  </p>
                  {/* Add spacing to push the button to the bottom */}
                  <div className="mt-auto">
                    <Link to={`/public/allArts/${e.id}`}>
                      <button className="btn btn-secondary w-100">Detail</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
  
}
