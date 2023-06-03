import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import NavBarComp  from './components/NavBarComp';
import TodoList from './components/TodoList';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className={`App dark`}>
        <NavBarComp></NavBarComp>
        <TodoList></TodoList>
      </div>
    </Provider>
  );
}

export default App;