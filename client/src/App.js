// import './CSS/App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import EditorApp from './EditorApp';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/editor" element={<EditorApp/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
