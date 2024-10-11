import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { request } from "../util/axios";

export default function UploadImageUrl() {
  const { id } = useParams();
  const [imgFile, setImgFile] = useState(null);
  const navigate = useNavigate();

  const handleUpdateImageUrl = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", imgFile);

    try {
      const response = await request.patch(
        `/user/patch/private/arts/${id}/image-url`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data.data);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Upload image success",
      });
      navigate("/cms/dashboard");
    } catch (err) {
      console.error(err, "<<< handleUpdateImageUrl");
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: `${err.response.data.error}`,
      });
    }
  };

  return (
    <>
      <div className="container mt-4">
        <form onSubmit={handleUpdateImageUrl}>
          <div className="form-group mb-3">
            <label htmlFor="input-imgFile">Upload Image</label>
            <input
              type="file"
              id="input-imgFile"
              name="image"
              className="form-control"
              onChange={(e) => setImgFile(e.target.files[0])}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mb-3">
            Update Image URL
          </button>
        </form>
      </div>
    </>
  );
}