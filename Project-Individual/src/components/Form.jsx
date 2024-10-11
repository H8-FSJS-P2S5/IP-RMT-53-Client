import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Form({ art, handleSubmit }) {
  const [title, setTitle] = useState(art.title || "");
  const [description, setDescription] = useState(art.description || "");
  const [artis, setArtis] = useState(art.artis || "");
  const [imageUrl, setImageUrl] = useState(art.imageUrl || "");
  const [price, setPrice] = useState(art.price || "");
  const [quantity, setQuantity] = useState(art.quantity || "");
  const [originId, setOriginId] = useState(art.originId || "");
  const [userId, setUserId] = useState(art.userId || "");

  const nav = useNavigate();

  useEffect(() => {
    setTitle(art.title || "");
    setDescription(art.description || "");
    setArtis(art.artis || "");
    setImageUrl(art.imageUrl || "");
    setPrice(art.price || "");
    setQuantity(art.quantity || "");
    setOriginId(art.originId || "");
    setUserId(art.userId || "");
  }, [art]);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const formData = {
      title,
      description,
      artis,
      price,
      quantity,
      imageUrl,
      originId,
      userId
    };
    console.log("Form Data:", formData);
    handleSubmit(formData).then(() => {
      nav("/user/get/private/home");
    });
  };
  return (
    <>
  <div className="container" style={{ paddingTop: "5%" }}>
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        {/* Card with shadow for better aesthetics */}
        <div className="card shadow p-4">
          <h3 className="text-center mb-4">Post A New Art</h3>
          <form onSubmit={handleSubmitForm}>
            <div className="mb-3">
              <label htmlFor="input-title" className="form-label">
                Title
              </label>
              <input
                type="text"
                id="input-title"
                name="title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                name="imageUrl"
                className="form-control"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="input-description" className="form-label">
                Description
              </label>
              <textarea
                id="input-description"
                name="description"
                className="form-control"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="input-price" className="form-label">
                Price
              </label>
              <input
                type="number"
                id="input-price"
                name="price"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
                name="artis"
                className="form-control"
                value={artis}
                onChange={(e) => setArtis(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="input-quantity" className="form-label">
                Quantity
              </label>
              <input
                type="number"
                id="input-quantity"
                name="quantity"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="input-originId" className="form-label">
                Origin ID
              </label>
              <input
                type="text"
                id="input-originId"
                name="originId"
                className="form-control"
                value={originId}
                onChange={(e) => setOriginId(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="input-userId" className="form-label">
                User ID
              </label>
              <input
                type="number"
                id="input-userId"
                name="userId"
                className="form-control"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
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
  <br /><br />
</>

  );
}
