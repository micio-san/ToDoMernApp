import './style.scss';
import Navbar from './components/Navbar';
import Form from './components/Form';
import { Routes, Route } from "react-router-dom"
import TodoPage from './components/TodoPage';
import ErrorPage from "./components/ErrorPage"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Form />} path='/'></Route>
        <Route element={<TodoPage />} path='/post/:id'></Route>
        <Route element={<ErrorPage />} path='*'></Route>
      </Routes>

    </>
  );
}

export default App;
