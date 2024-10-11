import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { request } from "../util/axios";

export default function Edit() {
  const nav = useNavigate();
  const { id } = useParams();

  const [art, setArt] = useState({
    title: "",
    description: "",
    price: "",
    artis: "",
    imageUrl: "",
    quantity: "",
  });

  const fetcData = async () => {
    try {
      const response = await request({
        method: "get",
        url: `/user/get/private/arts/${id}`,
        headers: {
          Authorization: `Berer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(response.data.data);
      setArt(response.data.data);

      Swal.fire({
        title: "Good job!",
        text: "Data Berhasil Di Hapus",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await request({
        method: "put",
        url: `/user/update/private/arts/${e.id}`,
        headers: {
          Authorization: `Berer ${localStorage.getItem("access_token")}`,
        },
        data: {
          title: art.title,
          description: art.description,
          price: art.price,
          artis: art.artis,
          imageUrl: art.imageUrl,
          quantity: art.quantity,
        },
      });

      nav("/user/get/private/home");
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
    fetcData();
  }, []);

  return (
    <>
  <div className="container" style={{ paddingTop: "3%" }}>
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        {/* Card wrapper with shadow effect */}
        <div className="card shadow p-4">
          <h3 className="text-center">Edit Art</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="input-title" className="form-label">
                Title
              </label>
              <input
                type="text"
                id="input-title"
                className="form-control"
                value={art.title}
                onChange={(e) => setArt({ ...art, title: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="input-price" className="form-label">
                Price
              </label>
              <input
                type="text"
                id="input-price"
                className="form-control"
                value={art.price}
                onChange={(e) => setArt({ ...art, price: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="input-artis" className="form-label">
                Artist
              </label>
              <input
                type="text"
                id="input-artis"
                className="form-control"
                value={art.artis}
                onChange={(e) => setArt({ ...art, artis: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="input-quantity" className="form-label">
                Quantity
              </label>
              <input
                type="text"
                id="input-quantity"
                className="form-control"
                value={art.quantity}
                onChange={(e) => setArt({ ...art, quantity: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="input-imageUrl" className="form-label">
                Image URL
              </label>
              <input
                type="text"
                id="input-imageUrl"
                className="form-control"
                value={art.imageUrl}
                onChange={(e) => setArt({ ...art, imageUrl: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="input-description" className="form-label">
                Description
              </label>
              <textarea
                id="input-description"
                className="form-control"
                value={art.description}
                onChange={(e) => setArt({ ...art, description: e.target.value })}
                required
              />
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary px-4">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <br />
</>

  );
}
