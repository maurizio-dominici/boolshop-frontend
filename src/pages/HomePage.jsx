import HeroSection from "../components/homepage_components/HeroSection";
import BestSellerSection from "../components/homepage_components/BestSellerSection";
import LatestArrivalSection from "../components/homepage_components/LatestArrivalsSection";

export default function Homepage() {
  return (
    <div className="container">
      <h1>HomePage</h1>
      {/* Creazione Sezione Componenti della Homepage */}
      <HeroSection />
      <BestSellerSection />
      <div className="row">
        <div className="col-md-4 mb-4" /*key={perfume.id}*/>
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
          </div>
        </div>
        <div className="col-md-4 mb-4" /*key={perfume.id}*/>
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
          </div>
        </div>
        <div className="col-md-4 mb-4" /*key={perfume.id}*/>
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
          </div>
        </div>
      </div>

      <LatestArrivalSection />
    </div>
  );
}
