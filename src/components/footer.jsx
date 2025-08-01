export default function Footer() {
  return (
    <footer className="pt-5 pb-4 border-top">
      <div className="container">
        <div className="row">
          {/*  Brand & Description  */}
          <div className="col-md-3 mb-4">
            <h5 className="text-white">Boolshop Parfumes</h5>
            <p>
              Fragranze esclusive, eleganza senza tempo. Scopri il tuo profumo
              ideale con noi.
            </p>
            {/* <img
              className="logo d-block mx-auto"
              src="/boolshop-parfumes-logo.jpg"
              alt="Logo"
            /> */}
          </div>

          {/*  Link Utili  */}
          <div className="col-md-3 mb-4">
            <h5 className="text-white">Informazioni</h5>
            <ul className="footer-list">
              <li>
                <a className="text-decoration-none">Chi siamo</a>
              </li>
              <li>
                <a className="text-decoration-none">Contatti</a>
              </li>
              <li>
                <a className="text-decoration-none">FAQ</a>
              </li>
              <li>
                <a className="text-decoration-none">Termini e condizioni</a>
              </li>
              <li>
                <a className="text-decoration-none">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/*  Servizi  */}
          <div className="col-md-3 mb-4">
            <h5 className="text-white">Servizi</h5>
            <ul className="footer-list">
              <li>
                <a className="text-decoration-none">Spedizione</a>
              </li>
              <li>
                <a className="text-decoration-none">Resi e rimborsi</a>
              </li>
              <li>
                <a className="text-decoration-none">Programma fedeltà</a>
              </li>
              <li>
                <a className="text-decoration-none">Gift Card</a>
              </li>
            </ul>
          </div>

          {/*  Social & Newsletter  */}
          <div className="col-md-3 mb-4">
            <div className="text-center">
              <img
                className="logo d-block mx-auto"
                src="/boolshop-parfumes-logo.jpg"
                alt="Logo"
              />
              <h5 className="text-white mb-1 mt-3">Seguici</h5>
              <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                <a href="#">
                  <i className="bi bi-facebook fs-4"></i>
                </a>
                <a href="#">
                  <i className="bi bi-instagram fs-4"></i>
                </a>
                <a href="#">
                  <i className="bi bi-youtube fs-4"></i>
                </a>
              </div>
              {/* da chiedere se si puo mettere */}
              {/* <form>
              <label htmlFor="newsletter" className="label-form">
                Iscriviti alla newsletter
              </label>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  id="newsletter"
                  placeholder="Email"
                ></input>
                <button
                  id="footer-btn"
                  className="btn btn-secondary"
                  type="button"
                >
                  Iscriviti
                </button>
              </div>
            </form> */}
            </div>
          </div>
        </div>

        <div className="text-center pt-3 border-top mt-4">
          <small>
            &copy; 2025 Boolshop Parfumes. Tutti i diritti riservati.
          </small>
        </div>
      </div>
    </footer>
  );
}
