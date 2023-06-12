import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBarComp from "./components/NavBarComp";
import TodoList from "./components/TodoList";

import { Provider } from "react-redux";
import store from "./store";

import ItemModal from "./components/ItemModal";
import { Container } from "reactstrap";

import { loadUser } from "./actions/authActions";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div className={`App dark`}>
        <NavBarComp />
        <Container>
          <ItemModal />
          <TodoList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
