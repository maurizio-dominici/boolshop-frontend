import { Link } from "react-router-dom";
import ProductListVisualizationItem from "../homepage_components/ProductListVisualizationItem";


export default function ProductListVisualization ({ products, title, text, link }) {
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


            <section className="py-5 bg-light">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        {
                            title &&
                            <h2 className="fw-bold">
                                {title} {/* (ProductListVisualization) */}
                            </h2>
                        }
                        {
                            link &&
                            <Link to={link || "/parfumes"}>
                                <button className="btn btn-primary">{text}</button>
                            </Link>
                        }
                    </div>
                    <div className="row">
                        {
                            products.slice(0, 3).map((parfume) => (
                                <div key={parfume.id} className="col-12">
                                    <ProductListVisualizationItem 
                                        item={parfume} 
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    );
};