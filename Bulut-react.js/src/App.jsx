import { useState } from 'react';
import Login from '../src/pages/Login';
import Home from '../src/pages/Home';
import './App.css'

function App() {
  const [girisonay, setGirisonay] = useState(false);
  const [kullaniciId ,setKullaniciId] = useState(null);
  
  return (
    <>
      {girisonay ? (
        <Home    kullaniciId={kullaniciId} />
      ) : (
        <Login 
        girisOnayi={() => setGirisonay(true)} 
        setKullaniciId={setKullaniciId}
        /> 
      )}
    </>
  );
}

export default App;
