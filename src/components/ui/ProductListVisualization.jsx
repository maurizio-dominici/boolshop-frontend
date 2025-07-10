import { Link } from "react-router-dom";
import ProductListVisualizationItem from "../homepage_components/ProductListVisualizationItem";


export default function ProductListVisualization ({ products, title, text, link, isHomepage = false }) {
    return (
        <>
            {/* <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>Product List Visualization</h2>
                        <p>This component will visualize the product list.</p>
                    </div>
                </div>
            </div> */}


            {/* <section className="py-5 bg-light"> */}
            {/* <section className="mt-4"> */}

            {
                !isHomepage ?
                <div className="container mt-4"></div>
                :
                <div className="container mt-3"></div>
            }
            <section>
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        {
                            (title && isHomepage) &&
                            <h2 className="fw-bold">
                                {title}
                            </h2>
                        }
                        {
                            (link && isHomepage) &&
                            <Link to={link || "/parfumes"}>
                                <button className="btn btn-primary">{text || "Visualizza tutti i profumi"}</button>
                            </Link>
                        }
                        {
                            !isHomepage &&
                            <Link to={-1} className="btn btn-secondary">
                                Torna indietro
                            </Link>
                        }
                    </div>
                    <div className="row">
                        {
                            isHomepage ?
                                products.slice(0, 6).map((parfume) => (
                                    <div key={parfume.id} className="col-12">
                                        <ProductListVisualizationItem 
                                            item={parfume} 
                                        />
                                    </div>
                                ))
                            :
                                <>
                                    {
                                        products.map((parfume) => (
                                            <div key={parfume.id} className="col-12">
                                                <ProductListVisualizationItem 
                                                    item={parfume} 
                                                />
                                            </div>
                                        ))
                                    }
                                </>
                        }
                    </div>
                </div>
            </section>
        </>
    );
};