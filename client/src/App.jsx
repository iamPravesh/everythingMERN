import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css'
import Home from './Pages/home/Home';
import AppTwo from './Pages/appTwo/AppTwo';
import AppOne from './Pages/appOne/AppOne';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app1" element={<AppOne />} />
          <Route path="/app2" element={<AppTwo />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
