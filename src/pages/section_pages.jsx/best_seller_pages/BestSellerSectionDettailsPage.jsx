import { Link, NavLink } from "react-router-dom";

export default function BestSellerSectionDettailsPage() {
  return (
    <>
      <div className="card h-100">
        {/* {perfume.image_url ? ( }
            <img
              src={perfume.image_url}
              className="card-img-top"
              alt={perfume.name}
            />
            { ) : (
              <div className="bg-secondary text-white py-5">
                <p className="mb-0">Nessuna immagine</p>
              </div>
            )} */}
        <div className="card-body">
          <h5 className="card-title">
            Profumo nome
            {/* {perfume.name}*/}
          </h5>
          <p className="card-text">
            Profumo descrizione{/*perfume.description*/}
          </p>
          <p className="fw-bold mb-1">Brand: {/*perfume.brand_name*/}</p>
          <p className="mb-1">
            Prezzo: €{/*perfume.price*/}
            {/* {perfume.discount_amount > 0 && (
                  <span className="text-success">
                    (-{perfume.discount_amount}%)
                  </span>
                )} */}
          </p>
          <p className="mb-0">Formato:75 {/*perfume.size_ml*/}ml</p>
        </div>
        <div className="box-info d-flex justify-content-between align-items-center mx-3">
          <Link to={"/bestseller/dettails"}>
            <button className="btn btn-primary btn-box-info-bestseller">
              Scopri di più
            </button>
          </Link>
          <Link to={"/bestseller"}>
            <button className="btn btn-primary btn-box-info-bestseller">
              Ritorna alla lista dei Best Seller
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
