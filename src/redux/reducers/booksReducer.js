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
} from "../types";

// Each reducer has its own state, state is always an object

const initialState = {
  books: [],
  error: null,
  loading: false,
  deletebook: null,
  editbook: null,
};

// The reducers are always functions that takes STATE AND ACTION (type, payload)
// We can either pass an state or itll be the initialState its state
// The whole reducer is a switch

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_BOOK_REQUEST:
      return { ...state, loading: action.payload };
    case ADD_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        books: [...state.books, action.payload],
      };
    case ADD_BOOK_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case LOAD_BOOKS_REQUEST:
      return { ...state, loading: action.payload };
    case LOAD_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        books: action.payload,
      };
    case LOAD_BOOKS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_BOOK_REQUEST:
      return {
        ...state,
        deletebook: action.payload,
      };
    case DELETE_BOOK_SUCCESS:
      return {
        ...state,
        //.filter() to bring every book but the book we are passing
        books: state.books.filter((book) => book.id !== state.deletebook),
        deletebook: null,
      };
    case DELETE_BOOK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case EDIT_BOOK_REQUEST:
      return { ...state, editbook: action.payload };
    case EDIT_BOOK_SUCCESS:
      return {
        ...state,
        editbook: null,
        // 1: We take all books from state (state.books)
        // 2: We .map() each one of them (book)
        // 3: We compare if action.payload.id is equal to some of the books we mapping at that exact time (book.id)
        // 4: Replace the actual book (whole object) with our action.payload
        books: state.books.map((book) =>
          book.id === action.payload.id ? (book = action.payload) : book
        ),
      };
    case EDIT_BOOK_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
