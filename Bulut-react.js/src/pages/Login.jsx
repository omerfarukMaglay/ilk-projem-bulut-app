import React, { useState } from "react";
import "./login.css";
import axios from "axios";

function Login({ girisOnayi, setKullaniciId }) {
  const [kullanici, setKullanici] = useState({ isim: "", sifre: "" });
  const [newUser, setNewUser] = useState({ isim: "", sifre: "" });
  const [kontrol, setKontrol] = useState(true); 
  const [loading, setLoading] = useState(false);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setKullanici((prev) => ({ ...prev, [name]: value }));
  };


  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };


  const girisYap = async () => {
    if (!kullanici.isim.trim() || !kullanici.sifre.trim()) {
     
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8080/rest/api/long",
        {
          isim: kullanici.isim,
          sifre: kullanici.sifre,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Backend’den gelen veri:", res.data);

      if (res.data.girisOnayi) {
        setKullaniciId(res.data.kullaniciId);
        girisOnayi();
      } else {
       
      }
    } catch (err) {
      console.error("Giriş isteği hatası:", err);
      if (err.response) {
        console.error("Hata cevabı:", err.response);
      }
      
    } finally {
      setLoading(false);
    }
  };


  const kaydet = async () => {
    if (!newUser.isim.trim() || !newUser.sifre.trim()) {
    
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8080/rest/api/yenikullanici/kayit",
        newUser,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Kayıt cevabı:", res.data);
     
      setNewUser({ isim: "", sifre: "" });
      setKontrol(true);
    } catch (err) {
      console.error("Kayıt hatası:", err);
      if (err.response) {
        console.error("Hata cevabı:", err.response);
      }
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Login">
      {kontrol ? (
        <>
          <h1>BULUT</h1>
          <div className="inputlar">
            <input
              name="isim"
              value={kullanici.isim}
              onChange={handleChange}
              className="input"
              type="text"
              placeholder="Kullanıcı Adı"
              disabled={loading}
            />
            <input
              name="sifre"
              value={kullanici.sifre}
              onChange={handleChange}
              className="input"
              type="password"
              placeholder="Şifreniz"
              disabled={loading}
            />
          </div>
          <div className="butonlar">
            <button onClick={girisYap} className="buton" disabled={loading}>
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </button>
            <button
              className="buton"
              onClick={() => setKontrol(false)}
              disabled={loading}
            >
              Kaydol
            </button>
          </div>
        </>
      ) : (
        <>
          <h1>Yeni Kayıt</h1>
          <div className="inputlar">
            <input
              name="isim"
              value={newUser.isim}
              onChange={handleNewUserChange}
              className="input"
              type="text"
              placeholder="Kullanıcı Adı"
              disabled={loading}
            />
            <input
              name="sifre"
              value={newUser.sifre}
              onChange={handleNewUserChange}
              className="input"
              type="password"
              placeholder="Şifreniz"
              disabled={loading}
            />
          </div>
          <div className="butonlar">
            <button className="buton" onClick={kaydet} disabled={loading}>
              {loading ? "Kaydediliyor..." : "Kaydol"}
            </button>
            <button
              className="buton"
              onClick={() => setKontrol(true)}
              disabled={loading}
            >
              Vazgeç
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Login;
