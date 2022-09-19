import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useDispatch } from "react-redux/es/exports";
import { deleteBookAction } from "../redux/actions/bookActions";
import { getBookEditAction } from "../redux/actions/bookActions";

const Book = ({ book }) => {
  // Destructuring of book objct.
  const { id, book_title, last_owner, price } = book;

  // eject actions
  const dispatch = useDispatch();

  // redirect user
  const navigate = useNavigate();

  const confirmDeleteBook = (id) => {
    // Asking the user
    Swal.fire({
      title: "Estás seguro?",
      text: "Esta acción es irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      confirmButtonText: "Sí, elimina este libro!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Pass it to the Action
        // We are not changing the state until pressing "confirmButtonText"
        // The action is the only one changing the state
        dispatch(deleteBookAction(id));
      }
    });
  };

  // Redirecting function
  const redirect = (book) => {
    dispatch(getBookEditAction(book));
    navigate(`/books/edit/${book.id}`);
  };

  return (
    <tr>
      <td>{book_title}</td>
      <td>
        <span className="font-weight-bold">{price}</span>
      </td>
      <td>{last_owner}</td>
      <td className="d-inline-flex p-2">
        <button
          type="button"
          className="btn btn btn-outline-primary mr-2 font-weight-bold"
          onClick={() => redirect(book)}
        >
          ✎ Editar
        </button>
        <button
          type="button"
          className="btn btn-outline-danger mr-2 font-weight-bold "
          onClick={() => confirmDeleteBook(id)}
        >
          Eliminar ✘
        </button>
      </td>
    </tr>
  );
};

export default Book;
