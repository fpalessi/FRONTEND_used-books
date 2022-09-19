import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { addNewBookAction } from "../redux/actions/bookActions";

import { useNavigate } from "react-router-dom";

import {
  showAlertAction,
  hideAlertAction,
} from "../redux/actions/alertActions";

const NewBook = () => {
  const [book_title, setBook_title] = useState("");
  const [price, setPrice] = useState(0);
  const [last_owner, setLast_owner] = useState("");

  // We get the state (useSelector())
  const loading = useSelector((state) => state.books.loading);
  const error = useSelector((state) => state.books.error);
  const alert = useSelector((state) => state.alert.alert);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const addBook = (book) => dispatch(addNewBookAction(book));

  const onSubmitNewBook = (e) => {
    e.preventDefault();
    dispatch(hideAlertAction());
    // Validations
    if (book_title.trim === "" || price <= 1 || last_owner === "") {
      const alert = {
        msg: "Debes rellenar los 3 campos de manera correcta",
        classes:
          "alert alert-danger text-center text-uppercase p3 font-weight-bold",
      };
      dispatch(showAlertAction(alert));
      return;
    }
    // After validations
    dispatch(hideAlertAction());
    // Add new book
    addBook({ book_title, price, last_owner });
    // Redirect home
    navigate("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 text-dark">Añadir un Libro</h2>

            {alert ? <p className={alert.classes}>{alert.msg}</p> : null}
            <form onSubmit={onSubmitNewBook}>
              <div className="form-group">
                <label>Título del libro</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Título del libro"
                  name="book_title"
                  value={book_title}
                  onChange={(e) => setBook_title(e.target.value)}
                ></input>
              </div>
              <div className="form-group">
                <label>Precio del Libro (€)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio del libro en euros (€)"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                ></input>
              </div>
              <div className="form-group">
                <label>Último dueño</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre del último dueño"
                  name="last_owner"
                  value={last_owner}
                  onChange={(e) => setLast_owner(e.target.value)}
                ></input>
              </div>
              <button
                type="submit"
                className="btn btn-info font-weight-bold text-uppercase d-block w-100 "
              >
                Agregar libro &#43;
              </button>
            </form>
            {loading ? <p>Cargando...</p> : null}
            {error ? (
              <p className="alert alert-danger p2 mt-4 text-center">
                Hubo un error al intentar añadir el libro
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBook;
