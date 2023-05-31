import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import NavBarComp  from './components/NavBarComp';
import TodoList from './components/TodoList';

function App() {
  return (
      <div className="App">
        <NavBarComp></NavBarComp>
        <TodoList></TodoList>
      </div>
  );
}

export default App;