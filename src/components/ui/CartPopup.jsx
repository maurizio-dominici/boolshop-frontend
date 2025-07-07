import { useCartPopup } from "../../context/CartPopupContext";


export default function CartPopup () {

    const { data, hideCartPopup } = useCartPopup();

    console.log("data", data);
    // console.log("data.show", data.show);

    if (!data.show) return <></>;


    return (
        <>
                {
                    data.show && 
                    (

                        <div id="CartPopup" className="card">
                            <div className="card-header">
                                <h2 className="card-title fs-5">
                                    Il tuo carrello
                                </h2>
                                <button onClick={hideCartPopup} type="button" className="btn btn-close"></button>
                            </div>
                            <div className="card-body">
                                <p className="card-text">
                                    Riepilogo del carrello
                                </p>
                                <p className="card-text">
                                    {
                                        data.cart.map(cartItem => {
                                            return (
                                                <span key={cartItem.id}>
                                                    {cartItem.name} - {cartItem.quantity} x €{cartItem.price.toFixed(2)}
                                                </span>
                                            )
                                        })
                                    }
                                </p>
                            </div>
                        </div>
                    )
                }
        </>
    );
};