import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

export default function ReciptPage() {
  const location = useLocation();
  const { ordine } = location.state || {};

  useEffect(() => {
    if (!ordine) {
      console.error("Nessun ordine trovato nella pagina di ricevuta.");
    }
  }, [ordine]);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow-sm border-0 rounded-4 p-4">
            <h1 className="mb-4 fw-bold d-flex align-items-center gap-2">
              <i className="fa-solid fa-file-invoice-dollar text-primary"></i>
              Ricevuta d'Ordine
            </h1>
            {ordine ? (
              <div>
                <h4 className="fw-bold mb-3 d-flex align-items-center gap-2">
                  <i className="fa-solid fa-clipboard-list text-secondary"></i>
                  Dettagli Ordine
                </h4>
                <div className="mb-2">
                  <b>ID Ordine:</b> {ordine.orderId}
                </div>
                <div className="mb-2">
                  <b>Totale:</b> {ordine.total_price} €
                </div>
                {ordine.discountAmount !== 0 && (
                  <div className="mb-2">
                    <b>Percentuale di sconto:</b> {ordine.discountAmount} %
                  </div>
                )}
                <div className="mb-2">
                  <b>Spese di spedizione:</b> {ordine.shipment_price} €
                </div>
                <div className="mb-2">
                  <b>Prezzo finale pagato:</b>{" "}
                  <span className="text-success">{ordine.final_price} €</span>
                </div>
                <div className="mb-2">
                  <b>Prodotti acquistati:</b>
                </div>
                {ordine.checkoutCart &&
                ordine.checkoutCart.cartProducts.length > 0 ? (
                  <ul className="list-group mb-3">
                    {ordine.checkoutCart.cartProducts.map((item, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-2"
                        style={{ background: "transparent" }}
                      >
                        <span>
                          <span className="fw-semibold">
                            {item.productName}
                          </span>
                          <span className="text-muted ms-2">
                            x {item.quantity}
                          </span>
                        </span>
                        <span className="fw-bold text-success">
                          {item.productFinalPrice} €
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="alert alert-warning">
                    Nessun prodotto acquistato.
                  </div>
                )}
                {/* Aggiungi altri dettagli dell'ordine qui */}
              </div>
            ) : (
              <div className="alert alert-danger">
                Nessun ordine disponibile.
              </div>
            )}

            <div className="d-flex justify-content-center mt-4">
              <Link to={"/"} className="btn btn-primary">
                <i className="fa-solid fa-house me-2"></i>
                Torna alla Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
