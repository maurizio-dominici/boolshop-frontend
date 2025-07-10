import { useContext } from "react";
import { ParfumeAPIContext } from "../../context/ParfumesContext";

export default function VisualizationButton() {
  const { visualization, setVisualization } = useContext(ParfumeAPIContext);

  return (
    // <button
    //     id="VisualizationButton"
    //     onClick={() => {
    //         // console.log(`Cliccato, cambio da: ${visualization} a: ${visualization === "grid" ? "list" : "grid"}`);
    //         setVisualization(
    //             visualization === "grid" ? "list" : "grid"
    //         )
    //     }}
    //     className="btn btn-primary"
    // >
    //     {
    //         visualization === "grid" ?
    //             <i className="bi bi-grid-3x2 m-3 icon-xl"></i>
    //         :
    //             <i className="bi bi-card-list m-3 icon-xl"></i>
    //     }
    // </button>

    visualization === "grid" ? (
      <div
        id="VisualizationButton"
        className="btn-group d-none d-md-block"
        role="group"
        aria-label="Basic example"
      >
        <button
          type="button"
          className="btn btn-secondary disabled"
          onClick={() => {
            // console.log(`Cliccato, cambio da: ${visualization} a: ${visualization === "grid" ? "list" : "grid"}`);
            setVisualization("grid");
          }}
        >
          <i className="bi bi-grid-3x2 m-3 icon-xl"></i>
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            // console.log(`Cliccato, cambio da: ${visualization} a: ${visualization === "grid" ? "list" : "grid"}`);
            setVisualization("list");
          }}
        >
          <i className="bi bi-card-list m-3 icon-xl"></i>
        </button>
      </div>
    ) : (
      <div
        id="VisualizationButton"
        className="btn-group"
        role="group"
        aria-label="Basic example"
      >
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            // console.log(`Cliccato, cambio da: ${visualization} a: ${visualization === "grid" ? "list" : "grid"}`);
            setVisualization("grid");
          }}
        >
          <i className="bi bi-grid-3x2 m-3 icon-xl"></i>
        </button>
        <button
          type="button"
          className="btn btn-secondary disabled"
          onClick={() => {
            // console.log(`Cliccato, cambio da: ${visualization} a: ${visualization === "grid" ? "list" : "grid"}`);
            setVisualization("list");
          }}
        >
          <i className="bi bi-card-list m-3 icon-xl"></i>
        </button>
      </div>
    )
  );
}
