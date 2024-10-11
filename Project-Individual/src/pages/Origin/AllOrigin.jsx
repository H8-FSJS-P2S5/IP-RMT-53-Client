import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { request } from "../../util/axios";
import { Link } from "react-router-dom";

export default function AllOrigin() {
  const [origin, setOrigin] = useState([]);

  const fetchOrigin = async () => {
    try {
      const response = await request({
        method: "get",
        url: "/user/get/private/origins",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setOrigin(response.data.data);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };
  useEffect(() => {
    fetchOrigin();
  }, []);
  return (
    <>
      <div className="container mt-5">
        <div className="table-responsive shadow-sm p-3 mb-5 bg-body rounded">
          <table className="table table-hover align-middle text-center">
            <thead>
              <tr className="table-info">
                <th scope="col">No</th>
                <th scope="col">Name</th>
              </tr>
            </thead>
            <tbody>
              {origin.map((e, i) => (
                <tr key={e.id}>
                  <td>{i + 1}</td>
                  <td>{e.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="fixed-bottom d-flex justify-content-end m-4">
          <div className="btn-group">
            <Link to="/user/post/private/by/origins">
              <button className="btn btn-warning">Add Origin</button>
            </Link>
            <Link to="/user/put/private/origins/by/:id">
              <button className="btn btn-warning">Edit Origin</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
