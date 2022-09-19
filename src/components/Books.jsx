import { useEffect } from "react";
import Book from "./Book";
import SearchBar from "./SearchBar";
import Spinner from "./Spinner/Spinner";

import { useSelector, useDispatch } from "react-redux";

import { loadBooksAction } from "../redux/actions/bookActions";

const Books = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadBooks = () => dispatch(loadBooksAction());
    loadBooks();
  }, []);

  // Get the actual state
  const books = useSelector((state) => state.books.books);
  const error = useSelector((state) => state.books.error);
  const loading = useSelector((state) => state.books.loading);

  return (
    <>
      <SearchBar />
      <h2 className="text-center my-3 text-dark">Listado de Libros 📚</h2>
      {error ? (
        <p className="font-weight-bold alert alert-danger text-center mt-3">
          Hubo un error
        </p>
      ) : null}
      {loading ? <Spinner /> : null}
      <table className="table border border-info">
        <thead className="bg-info table-warning">
          <tr>
            <th scope="col">Título</th>
            <th scope="col">Precio (€)</th>
            <th scope="col">Último dueño</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody className="font-weight-bold p-3 mb-2 bg-transparent text-dark">
          {books.length === 0
            ? "Por el momento no hay libros"
            : books.map((book) => <Book key={book.id} book={book} />)}
        </tbody>
      </table>
    </>
  );
};

export default Books;
