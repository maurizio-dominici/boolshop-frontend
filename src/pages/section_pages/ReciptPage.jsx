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
    <div className="page-container">
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
                  <div
                    className="alert mb-4"
                    style={{
                      background: "var(--boolshop-secondary-color-hover)",
                    }}
                  >
                    <i className="fa-solid fa-circle-check me-2"></i>
                    <b>Grazie per il tuo ordine!</b> La tua richiesta è stata
                    ricevuta con successo.
                  </div>
                  <h4 className="fw-bold mb-3 d-flex align-items-center gap-2">
                    <i className="fa-solid fa-clipboard-list text-secondary"></i>
                    Dettagli Ordine
                  </h4>
                  {/* <div className="mb-2">
                    <b>ID Ordine:</b> {ordine.orderId}
                  </div> */}
                  <div className="mb-2">
                    <b>Totale:</b> {ordine.total_price} €
                  </div>
                  <div className="mb-2">
                    <b>Spese di spedizione:</b> {ordine.shipping_price} €
                  </div>
                  {ordine.discountAmount !== 0 && (
                    <div className="mb-2">
                      <b>Percentuale di sconto:</b> {ordine.discountAmount} %
                    </div>
                  )}
                  <div className="mb-2">
                    <b>Prezzo finale pagato: </b>
                    <span className="text-success">
                      {(
                        Number(ordine.final_price) +
                        Number(ordine.shipping_price)
                      ).toFixed(2)}
                      €
                    </span>
                  </div>
                  <div className="alert alert-info mt-4">
                    Riceverai una mail di conferma con tutti i dettagli
                    dell’ordine.
                    <br />
                    Per qualsiasi domanda, contattaci pure!
                  </div>
                </div>
              ) : (
                <div className="alert alert-danger">
                  Nessun ordine disponibile.
                </div>
              )}

              <div className="d-flex justify-content-center gap-3 mt-4">
                <Link to={"/"} className="btn btn-secondary">
                  <i className="fa-solid fa-house me-2"></i>
                  Torna alla Home
                </Link>
                <Link to="/" className="btn btn-primary">
                  <i className="fa-solid fa-cart-shopping me-2"></i>
                  Continua a fare shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
//                     Nessun prodotto acquistato.
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="alert alert-danger">
//                 Nessun ordine disponibile.
//               </div>
//             )}

//             <div className="d-flex justify-content-center mt-4">
//               <Link to={"/"} className="btn btn-primary">
//                 <i className="fa-solid fa-house me-2"></i>
//                 Torna alla Home
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
