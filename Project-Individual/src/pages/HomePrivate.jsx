import { useEffect } from "react";
import { request } from "../util/axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setPrivate } from "../features/PrivateSlice";

export default function HomePrivate() {
  const dispatch = useDispatch();
  
  const art = useSelector((store) => store.private.privates); 

  const fetchArt = async () => {
    try {
      const response = await request({
        method: "get",
        url: "/user/get/private/home",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      dispatch(setPrivate(response.data.data));
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await request.delete(`/user/delete/private/arts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      dispatch(setPrivate(art.filter((item) => item.id !== id)));

      Swal.fire({
        title: "Good job!",
        text: "Data successfully deleted",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };

  useEffect(() => {
    fetchArt();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <div className="table-responsive shadow-sm p-3 mb-5 bg-body rounded">
          <table className="table table-hover align-middle text-center">
            <thead>
              <tr className="table-info">
                <th scope="col">No</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Image Url</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {art.map((e, i) => (
                <tr key={e.id}>
                  <td>{i + 1}</td>
                  <td>{e.title}</td>
                  <td>{e.description}</td>
                  <td>
                    <img
                      src={e.imageUrl}
                      alt={e.title}
                      width="100"
                      className="img-fluid"
                    />
                  </td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Action Buttons">
                      <button className="btn btn-info" onClick={() => handleDelete(e.id)}>
                        Delete
                      </button>
                      <Link to={`/user/update/private/arts/${e.id}`}>
                        <button className="btn btn-info">Upload Image</button>
                      </Link>
                      <Link to={`/user/get/private/arts/${e.id}`}>
                        <button className="btn btn-info">Edit</button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="fixed-bottom d-flex justify-content-end m-4">
          <div className="btn-group">
            <Link to="/register">
              <button className="btn btn-warning">Add User</button>
            </Link>
            <Link to="/user/post/private/arts">
              <button className="btn btn-warning">Add Post</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
