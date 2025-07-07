import { useLocation } from "react-router-dom";
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
    <div className="container">
      <h1>Ricevuta d'Ordine</h1>
      {ordine ? (
        <div>
          <h2>Dettagli Ordine</h2>
          <p>ID Ordine: {ordine.orderId}</p>
          <p>Totale: {ordine.total_price}</p>
          {ordine.sicount_amount && (
            <p>Percentuale di sconto: {ordine.discount_amount}</p>
          )}
          <p>Prezzo finale pagato: {ordine.final_price}</p>
          {/* <p>Prodotti acquistati:</p>
          {ordine.checkoutCart &&
          ordine.checkoutCart.cartProducts.length > 0 ? (
            <ul>
              {ordine.checkoutCart.cartProducts.map((item, index) => (
                <li key={index}>
                  {item.name} - Quantità: {item.quantity} - Prezzo: {item.price}
                </li>
              ))}
            </ul>
          ) : (
            <p>Nessun prodotto acquistato.</p>
          )} */}
          {/* Aggiungi altri dettagli dell'ordine qui */}
        </div>
      ) : (
        <p>Nessun ordine disponibile.</p>
      )}
    </div>
  );
}
