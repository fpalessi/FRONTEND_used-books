import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { editBookAction } from "../redux/actions/bookActions";

import { useNavigate } from "react-router";

const EditBook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [book, setBook] = useState({
    book_title: "",
    last_owner: "",
    price: "",
  });

  const editbook = useSelector((state) => state.books.editbook);

  useEffect(() => {
    setBook(editbook);
  }, [editbook]);

  const onChangeForm = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const { book_title, last_owner, price } = book;

  const onSubmitEditBook = (e) => {
    e.preventDefault();
    dispatch(editBookAction(book));
    navigate("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">Editar Libro</h2>
            <form onSubmit={onSubmitEditBook}>
              <div className="form-group">
                <label>Título del libro</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Libro"
                  name="book_title"
                  value={book_title}
                  onChange={onChangeForm}
                ></input>
              </div>
              <div className="form-group">
                <label>Precio del libro</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Precio Libro"
                  name="price"
                  value={price}
                  onChange={onChangeForm}
                ></input>
              </div>
              <div className="form-group">
                <label>Último dueño</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Último Dueño"
                  name="last_owner"
                  value={last_owner}
                  onChange={onChangeForm}
                ></input>
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Guardar cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
