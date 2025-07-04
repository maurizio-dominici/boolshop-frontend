import { Link } from "react-router-dom";

export default function CartPage() {
  console.log(JSON.parse(localStorage.getItem("cart")));

  return (
    <>
      <div className="container">
        <h1>IL TUO CARRELLO</h1>
        <div className="row my-5">
          {JSON.parse(localStorage.getItem("cart")).map((item) => {
            return (
              <>
                <div
                  className="col-12 d-flex justify-content-between"
                  key={item.id}
                >
                  <div className="img-info-liroduct d-flex ">
                    <div>
                      <img src={item.image} alt="" />
                    </div>
                    <div>
                      <ul className="list-info-product d-flex justify-content-between align-items-center g-10">
                        <li>{item.name}</li>
                        <li>{item.size_ml}ml</li>
                        <li>{item.size_name}</li>
                        <li>{item.price}</li>
                        <li>{item.discount.discount_amount}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="box-controll-quantity d-flex justify-content-center align-items-center text-center gap-3">
                    <button
                      className="btn btn-outline-secondary text-center"
                      onClick=""
                    >
                      -
                    </button>
                    <div className="">{item.quantity}</div>
                    <button
                      className="btn btn-outline-secondary text-center"
                      onClick={() => {
                        return item.quantity + 1;
                      }}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-outline-secondary text-center"
                      onClick=""
                    >
                      ELIMINA
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <Link to="/checkout" className="btn btn-primary my-3">
          Vai al CHECKOUT
        </Link>
      </div>
    </>
  );
}
