
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { MainHeader } from './header/components/MainHeader.jsx';
import { HomePage } from './mainModule/components/HomePage.jsx';
import { AuthPage } from './mainModule/components/AuthPage.jsx';
import { PrivatePage } from './mainModule/components/PrivatePage.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <MainHeader />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/login" element={<AuthPage />}/>
          <Route path="/registration" element={<AuthPage />}/>
          <Route path="/privat" element={<PrivatePage />}/>
          <Route path="*" element={ <Navigate  to={'/'} replace /> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
