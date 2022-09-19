import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-info bg-gradient justify-content-between">
      <div className="container">
        <Link to={"/"} className="text-white h4">
          REDUX BOOKS CRUD
        </Link>

        <Link
          to={"/books/new"}
          className="btn btn-light nuevo-post d-block d-md-insine-block "
        >
          Agregar Libro &#43;
        </Link>
      </div>
    </nav>
  );
};

export default Header;
