import { useState } from "react";
import { InputGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";

const SearchBar = () => {
  const books = useSelector((state) => state.books.books);

  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="container h-100">
      <div className="row h-100 justify-content-center align-items-center">
        <InputGroup
          className="col-4"
          onChange={(e) => setSearchTerm(e.target.value)}
        >
          <FormControl placeholder="Buscar libro..." />
        </InputGroup>
      </div>
      {/* books.filter(val).map(val,key) */}
      {books
        .filter((val) => {
          if (searchTerm == "") {
            return val;
          } else if (
            val.book_title.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return val;
          }
        })
        .map((val, key) => {
          return (
            <div
              className="row h-100 justify-content-center align-items-center"
              key={key}
            >
              <p
                style={{
                  display: `${searchTerm == "" ? "none" : "block"}`,
                  margin: `${searchTerm == "" ? "none" : "5px"}`,
                }}
              >
                {val.book_title}
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default SearchBar;
