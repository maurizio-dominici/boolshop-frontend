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
        <div className="col-4">
          <div className="card h-100">
            <img className="img-parfume" src="./vite.svg" alt="" />
            <div className="card-title my-2">
              <h2 className="text-center">"Nome Profumo"</h2>
            </div>
            <div className="card-body text-center">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga
                quae autem ipsam laudantium, aliquid pariatur nam, magni itaque
                exercitationem atque quos velit. Rem, alias illo vitae iure
                quasi blanditiis necessitatibus. Neque sapiente impedit ea at
                illo ipsum non architecto laborum? Non repellendus odio eaque,
                laborum libero perferendis dicta consequuntur sit a, magni
                ducimus, qui veniam quis doloribus est voluptate laboriosam?
                Laudantium iure dicta aut sed architecto voluptatibus inventore
                nobis. Quam quia eum officiis eligendi vero. Deleniti, incidunt
                possimus tempore laboriosam vero, accusamus recusandae animi
                nisi soluta earum optio voluptatibus qui!
              </p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card h-100">
            <img className="img-parfume" src="./vite.svg" alt="" />
            <div className="card-title my-2">
              <h2 className="text-center">"Nome Profumo"</h2>
            </div>
            <div className="card-body text-center">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga
                quae autem ipsam laudantium, aliquid pariatur nam, magni itaque
                exercitationem atque quos velit. Rem, alias illo vitae iure
                quasi blanditiis necessitatibus. Neque sapiente impedit ea at
                illo ipsum non architecto laborum? Non repellendus odio eaque,
                laborum libero perferendis dicta consequuntur sit a, magni
                ducimus, qui veniam quis doloribus est voluptate laboriosam?
                Laudantium iure dicta aut sed architecto voluptatibus inventore
                nobis. Quam quia eum officiis eligendi vero. Deleniti, incidunt
                possimus tempore laboriosam vero, accusamus recusandae animi
                nisi soluta earum optio voluptatibus qui!
              </p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card h-100">
            <img className="img-parfume" src="./vite.svg" alt="" />
            <div className="card-title my-2">
              <h2 className="text-center">"Nome Profumo"</h2>
            </div>
            <div className="card-body text-center">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga
                quae autem ipsam laudantium, aliquid pariatur nam, magni itaque
                exercitationem atque quos velit. Rem, alias illo vitae iure
                quasi blanditiis necessitatibus. Neque sapiente impedit ea at
                illo ipsum non architecto laborum? Non repellendus odio eaque,
                laborum libero perferendis dicta consequuntur sit a, magni
                ducimus, qui veniam quis doloribus est voluptate laboriosam?
                Laudantium iure dicta aut sed architecto voluptatibus inventore
                nobis. Quam quia eum officiis eligendi vero. Deleniti, incidunt
                possimus tempore laboriosam vero, accusamus recusandae animi
                nisi soluta earum optio voluptatibus qui!
              </p>
            </div>
          </div>
        </div>
      </div>

      <LatestArrivalSection />
      <div className="row">
        <div className="col-md-4 mb-4" /* key={perfume.id} */>
          <div className="card h-100">
            {/* perfume.image_url ? (
                <img
                  src={perfume.image_url}
                  className="card-img-top"
                  alt={perfume.name}
                />
              ) : (
                <div className="bg-secondary text-white py-5">
                  <p className="mb-0">Nessuna immagine</p>
                </div>
              ) */}
            <div className="card-body">
              <h5 className="card-title">Profumo Yuri {/* perfume.name */}</h5>
              <p className="card-text">
                {" "}
                Descrizione profumo{/*perfume.description */}
              </p>
              <p className="fw-bold mb-1">
                {" "}
                brande.name {/*perfume.brand_name */}
              </p>
              <p className="mb-1">
                Prezzo: €{/* perfume.price */}
                {/* perfume.discount_amount > 0 && (
                    <span className="text-success">
                      (-{perfume.discount_amount}%)
                    </span>
                  ) */}
              </p>
              <p className="mb-0">Formato: {/*perfume.size_ml */}ml</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4" /* key={perfume.id} */>
          <div className="card h-100">
            {/* perfume.image_url ? (
                <img
                  src={perfume.image_url}
                  className="card-img-top"
                  alt={perfume.name}
                />
              ) : (
                <div className="bg-secondary text-white py-5">
                  <p className="mb-0">Nessuna immagine</p>
                </div>
              ) */}
            <div className="card-body">
              <h5 className="card-title">Profumo Yuri {/* perfume.name */}</h5>
              <p className="card-text">
                {" "}
                Descrizione profumo{/*perfume.description */}
              </p>
              <p className="fw-bold mb-1">
                {" "}
                brande.name {/*perfume.brand_name */}
              </p>
              <p className="mb-1">
                Prezzo: €{/* perfume.price */}
                {/* perfume.discount_amount > 0 && (
                    <span className="text-success">
                      (-{perfume.discount_amount}%)
                    </span>
                  ) */}
              </p>
              <p className="mb-0">Formato: {/*perfume.size_ml */}ml</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4" /* key={perfume.id} */>
          <div className="card h-100">
            {/* perfume.image_url ? (
                <img
                  src={perfume.image_url}
                  className="card-img-top"
                  alt={perfume.name}
                />
              ) : (
                <div className="bg-secondary text-white py-5">
                  <p className="mb-0">Nessuna immagine</p>
                </div>
              ) */}
            <div className="card-body">
              <h5 className="card-title">Profumo Yuri {/* perfume.name */}</h5>
              <p className="card-text">
                {" "}
                Descrizione profumo{/*perfume.description */}
              </p>
              <p className="fw-bold mb-1">
                {" "}
                brande.name {/*perfume.brand_name */}
              </p>
              <p className="mb-1">
                Prezzo: €{/* perfume.price */}
                {/* perfume.discount_amount > 0 && (
                    <span className="text-success">
                      (-{perfume.discount_amount}%)
                    </span>
                  ) */}
              </p>
              <p className="mb-0">Formato: {/*perfume.size_ml */}ml</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
