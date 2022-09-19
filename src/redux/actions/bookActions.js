import {
  ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE,
  LOAD_BOOKS_REQUEST,
  LOAD_BOOKS_SUCCESS,
  LOAD_BOOKS_FAILURE,
  DELETE_BOOK_REQUEST,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_FAILURE,
  EDIT_BOOK_REQUEST,
  EDIT_BOOK_SUCCESS,
  EDIT_BOOK_FAILURE,
  EDIT_BOOK_PROGRESS,
} from "../types";
import axiosRequest from "../../config/axios";
import Swal from "sweetalert2";

// TYPE: DEFINE THE ACTION, PAYLOAD: MODIFIES THE STATE

// This functions will be used on components.jsx
// We'll use a dispatch to eject these actions

export function addNewBookAction(book) {
  return async (dispatch) => {
    dispatch(addBookRequest());
    try {
      // Insert into API REST -> We pass this to the API
      await axiosRequest.post("/Books", book);
      // We pass this to the state (state updating)
      dispatch(addBookSuccess(book));
      // At this point we added the book successfully
      Swal.fire("Correcto", "El libro se agregó correctamente", "success");
    } catch (error) {
      console.log(error);
      // If we got an error, we update the state
      dispatch(addBookFailure(true));
      // We fire an error alert
      Swal.fire({
        icon: "error",
        title: "Algo ha fallado añadiendo el libro",
        text: "Hubo un error, inténtalo de nuevo",
      });
    }
  };
}
const addBookRequest = () => ({ type: ADD_BOOK_REQUEST, payload: true });
const addBookSuccess = (book) => ({
  type: ADD_BOOK_SUCCESS,
  payload: book,
});
const addBookFailure = (state) => ({ type: ADD_BOOK_FAILURE, payload: state });

// Function that get the books from ddbb
// It doesn't take any parameter bc it comes from bbdd and is and GET request
// When we call this fn, dispatch(loadBooks()) will be ejected

export function loadBooksAction() {
  return async (dispatch) => {
    dispatch(loadBooksRequest());
    try {
      const response = await axiosRequest.get("/books");
      dispatch(loadBooksSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(loadBooksFailure());
    }
  };
}
const loadBooksRequest = () => ({ type: LOAD_BOOKS_REQUEST, payload: true });
const loadBooksSuccess = (books) => ({
  type: LOAD_BOOKS_SUCCESS,
  payload: books,
});
const loadBooksFailure = () => ({ type: LOAD_BOOKS_FAILURE, payload: true });

export function deleteBookAction(id) {
  return async (dispatch) => {
    dispatch(deleteBookRequest(id));
    try {
      await axiosRequest.delete(`/books/${id}`);
      dispatch(deleteBookSuccess());

      Swal.fire(
        "Libro eliminado!",
        "El libro fue eliminado con éxito",
        "success"
      );
    } catch (error) {
      console.log(error);
      dispatch(deleteBookFailure());
    }
  };
}
const deleteBookRequest = (id) => ({ type: DELETE_BOOK_REQUEST, payload: id });
const deleteBookSuccess = () => ({ type: DELETE_BOOK_SUCCESS });
const deleteBookFailure = () => ({ type: DELETE_BOOK_FAILURE, payload: true });

export function getBookEditAction(book) {
  return (dispatch) => {
    dispatch(editBookRequest(book));
  };
}
const editBookRequest = (book) => ({
  type: EDIT_BOOK_REQUEST,
  payload: book,
});

export function editBookAction(book) {
  return async (dispatch) => {
    dispatch(editBook());
    try {
      await axiosRequest.put(`/books/${book.id}`, book);
      dispatch(editBookSuccess(book));
    } catch (error) {
      console.log(error);
      dispatch(editBookFailure());
    }
  };
}
const editBook = () => ({
  type: EDIT_BOOK_PROGRESS,
});
const editBookSuccess = (book) => ({
  type: EDIT_BOOK_SUCCESS,
  payload: book,
});
const editBookFailure = () => ({
  type: EDIT_BOOK_FAILURE,
  payload: true,
});
