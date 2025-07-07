import { useTopMessage } from "../../context/TopMessageContext";


export default function TopMessage () {

    const { data, hideTopMessage } = useTopMessage();

    if (!data.show) return <></>;


    return (
        <>
            <div className="container mt-3">
                {
                    data.show && 
                    (
                        <div id="TopMessage" className={`alert alert-${data.type} mb-0 d-flex align-items-center justify-content-between`}>
                            {data.text}

                            <button onClick={hideTopMessage} type="button" className="btn btn-close"></button>
                        </div>
                    )
                }
            </div>
        </>
    );
};