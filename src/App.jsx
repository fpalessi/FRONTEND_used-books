import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Books from "./components/Books";
import EditBook from "./components/EditBook";
import NewBook from "./components/NewBook";

import { Provider } from "react-redux";

import store from "./redux/store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <div className="container mt-5">
          <Routes>
            <Route exact path="/" element={<Books />} />
            <Route exact path="/books/new" element={<NewBook />} />
            <Route exact path="/books/edit/:id" element={<EditBook />} />
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
