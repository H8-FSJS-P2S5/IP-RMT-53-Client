import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import errorHandling from "../util/errors";
import { request } from "../util/axios";

export default function DetailPublic() {
  const { id } = useParams();

  const [art, setArt] = useState({
    title: "",
    description: "",
    price: "",
    artis: "",
    imageUrl: "",
    quantity: "",
  });
  

  const fetcArtById = async () => {
    try {
      const response = await request({
        method: "get",
        url: `/public/allArts/${id}`,
        headers: {},
      });

      setArt(response.data.data);
    } catch (error) {
      errorHandling(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetcArtById();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <div className="card shadow-lg p-4" style={{ borderRadius: "15px" }}>
          <h1 className="text-center mb-4">Art Details</h1>
          <div className="row g-4">
            <div className="col-md-4">
              <img
                src={art.imageUrl}
                alt={art.title}
                className="img-fluid rounded"
                style={{ objectFit: "cover", maxHeight: "300px", width: "100%" }}
              />
            </div>
            <div className="col-md-8">
              <div className="d-flex flex-column h-100">
                <h5 className="mb-3">
                  <strong>Name:</strong> {art.title}
                </h5>
                <h5 className="mb-3">
                  <strong>Amount:</strong> {art.quantity}
                </h5>
                <h5 className="mb-3">
                  <strong>Artist:</strong> {art.artis}
                </h5>
                <h5 className="mb-3">
                  <strong>Description:</strong> {art.description}
                </h5>
                <p className="text-muted display-6">$ {art.price},00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
}
