import React, { useState } from "react";
import "./GonderiPaylas.css";
import axios from "axios";

function GonderiPaylas({ kullaniciId }) {
  const [yazi, setYazi] = useState("");
  const [resimurl, setResimurl] = useState("");
  const [videourl, setVideourl] = useState("");
  const [ekran, setEkran] = useState(true);
  const [dbPaylasim, setDbPaylasim] = useState(null);

  const gönderiPaylas = async () => {
    if (!yazi && !resimurl && !videourl) {
      alert("Boş gönderi paylaşılamaz!");
      return;
    }

    const yeniGonderi = {
      yazi,
      resimurl: resimurl || null,
      videourl: videourl || null,
    };

    try {
      const res = await axios.post(
        `http://localhost:8080/rest/api/gonderi/save/${kullaniciId}`,
        yeniGonderi
      );
      setDbPaylasim(res.data);
    } catch (err) {
      console.error("Gönderi paylaşım hatası:", err);
    }
  };

  const yeniGönderi = () => {
    setEkran(true);
    setDbPaylasim(null);
    setYazi("");
    setResimurl("");
    setVideourl("");
  };

  return (
    <>
      {ekran ? (
        <div className="paylasim-container">
          <h3>Yeni Gönderi Paylaş</h3>

          <textarea
            placeholder="Bir şeyler yaz..."
            value={yazi}
            onChange={(e) => setYazi(e.target.value)}
          ></textarea>

          <input
            type="text"
            placeholder="Resim URL'si (isteğe bağlı)"
            value={resimurl}
            onChange={(e) => setResimurl(e.target.value)}
          />

          <input
            type="text"
            placeholder="Video URL'si (isteğe bağlı)"
            value={videourl}
            onChange={(e) => setVideourl(e.target.value)}
          />

          <button
            onClick={async () => {
              await gönderiPaylas();
              setEkran(false);
            }}
          >
            Paylaş
          </button>
        </div>
      ) : (
        dbPaylasim && (
          <div>
            <div className="paylas45">
              <div className="resim-ve-isim-divi">
                <img
                className="profil-resmi-img3"
                src={dbPaylasim.etkilesim.profilResmi}
                alt="profil"
              />
              <h4 className="gonderı-ismi">{dbPaylasim.isim}</h4>
               
              </div>
              <div>
                <h5 className="paylasılan-yazı-dıvı">{dbPaylasim.paylasimlar.yazi}</h5>
              </div>
              
              <div className="gönderi-img65">
                {dbPaylasim.paylasimlar.videourl ? (
                  <video
                    className="vido"
                    controls
                    src={dbPaylasim.paylasimlar.videourl}
                  ></video>
                ) : (
                  <img
                    className="resim"
                    src={dbPaylasim.paylasimlar.resimurl}
                    alt="görsel bulunmadı"
                  />
                )}
              </div>
            </div>
            <div className="paylas-buton-divi">
              <button className="paylas-butonu-22" onClick={yeniGönderi}>
                Yeni Gönderi Paylaş
              </button>
            </div>
          </div>
        )
      )}
    </>
  );
}

export default GonderiPaylas;
