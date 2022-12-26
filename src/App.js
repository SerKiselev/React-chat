import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { MainHeader } from './header/components/MainHeader.jsx';
import { HomePage } from './mainModule/components/HomePage.jsx';
import { AuthPage } from './mainModule/components/AuthPage.jsx';
import { PrivatePage } from './mainModule/components/PrivatePage.jsx';

function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => setUser(user ? user : null));
  }, [auth]);

  return (
    <div className="App">
      <BrowserRouter>
        <MainHeader />
        {user ? (
          <Routes>
            <Route path="/private" element={<PrivatePage user={user} />} />
            <Route path="*" element={<Navigate to={'/private'} replace />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/registration" element={<AuthPage />} />
            <Route path="*" element={<Navigate to={'/'} replace />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
