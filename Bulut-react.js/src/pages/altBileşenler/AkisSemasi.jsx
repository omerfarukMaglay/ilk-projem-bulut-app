import React, { useState, useEffect } from "react";
import "./AkisSemasi.css";
import axios from "axios";
import { IoMdCloseCircle } from "react-icons/io";
import { RiUserUnfollowFill, RiUserFollowFill } from "react-icons/ri";

function AkisSemasi({ kullaniciId }) {
  const [dbPaylasimlar, setDbPaylasimlar] = useState([]);
  const [ekran, setEkran] = useState("list");
  const [dbProfil, setDbProfil] = useState(null);
  const [listeVerisi, setListeVerisi] = useState([]);
  const [listeTipi, setListeTipi] = useState(null);
  const [takipteMi, setTakipteMi] = useState(true);

  const paylasimlariGetir = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/rest/api/paylasimlar/${kullaniciId}`);
      setDbPaylasimlar(res.data);
    } catch (err) {
      console.error("Paylaşımlar alınamadı:", err);
    }
  };

  useEffect(() => {
    if (kullaniciId) paylasimlariGetir();
  }, [kullaniciId]);


  const profiliGetir = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/rest/api/etkilesimler/${id}`);
      setDbProfil(res.data);
      setEkran("profil");
    } catch (err) {
      console.error("Profil alınamadı:", err);
    }
  };

  const listeyiGetir = async (tip) => {
    if (!dbProfil) return;

    const ids = tip === "takip"
      ? dbProfil.etkilesim.takip
      : dbProfil.etkilesim.takipci;

    const tumKullanicilar = [];
    for (const id of ids) {
      try {
        const res = await axios.get(`http://localhost:8080/rest/api/etkilesimler/${id}`);
        tumKullanicilar.push(res.data);
      } catch (err) {
        console.error("Liste verisi alınamadı:", err);
      }
    }

    setListeVerisi(tumKullanicilar);
    setListeTipi(tip);
    setEkran("liste");
  };


  const takipEtme = async (takipEdenId, takipEdilenId) => {
    try {
      await axios.get(`http://localhost:8080/rest/api/save/${takipEdenId}/${takipEdilenId}`);
    } catch (err) {
      console.error("Takip etme hatası:", err);
    }
  };

  const takipBırakma = async (takipEdenId, takipEdilenId) => {
    try {
      await axios.get(`http://localhost:8080/rest/api/update/takip/${takipEdenId}/${takipEdilenId}`);
    } catch (err) {
      console.error("Takip bırakma hatası:", err);
    }
  };

  return (
    <>
 
      {ekran === "list" && (
        <ul>
          {dbPaylasimlar.length > 0 ? (
            dbPaylasimlar.map((p, i) => (
              <li className="gonderi-kutusu" key={i}>
                <div className="resimveisim">
                  <button
                    onClick={() => profiliGetir(p.id)}
                    className="akıs-seması-profıl-butonu"
                  >
                    <img
                      className="profil-resmi-minik"
                      src={p.etkilesim?.profilResmi || "/default-avatar.png"}
                      alt="profil"
                    />
                    <h3 style={{ marginTop: "10px", marginLeft: "20px" }}>
                      {p.isim || "İsimsiz Kullanıcı"}
                    </h3>
                  </button>
                </div>

                <h4>{p.paylasimlar?.yazi}</h4>

                {p.paylasimlar?.videourl ? (
                  <video controls src={p.paylasimlar.videourl}></video>
                ) : (
                  <img
                    className="resim"
                    src={p.paylasimlar?.resimurl || "/no-image.png"}
                    alt="Resim bulunamadı"
                  />
                )}
              </li>
            ))
          ) : (
            <p>Henüz paylaşım yok</p>
          )}
        </ul>
      )}


      {ekran === "profil" && dbProfil && (
        <div className="profilim-42">
          <div className="kapatma-butonu-2">
            <button
              onClick={() => {
                setEkran("list");
                setDbProfil(null);
              }}
              className="kapatma-butonı-3"
            >
              <IoMdCloseCircle className="kapatma-iconu" />
            </button>
          </div>

          <div className="profilim-33">
            <img
              className="profilresmi22"
              src={dbProfil.etkilesim.profilResmi}
              alt="profil"
            />
            <div>
              <h4 style={{ margin: 0, fontSize: "20px" }}>{dbProfil.isim}</h4>
              <div className="profilim-24">
                <button
                  onClick={() => listeyiGetir("takipci")}
                  className="profil-button12"
                >
                  Takipçi: {dbProfil.etkilesim.takipci.length}
                </button>
                <button
                  onClick={() => listeyiGetir("takip")}
                  className="profil-button12"
                >
                  Takip: {dbProfil.etkilesim.takip.length}
                </button>

                {kullaniciId !== dbProfil.id && (
                  <button
                    onClick={() => {
                      setTakipteMi(!takipteMi);
                      if (takipteMi) takipBırakma(kullaniciId, dbProfil.id);
                      else takipEtme(kullaniciId, dbProfil.id);
                    }}
                    className={`profil-button332 ${takipteMi ? "takipten-cik" : "takip-et"}`}
                  >
                    {takipteMi ? (
                      <>
                        <RiUserUnfollowFill className="takipbuton-ikon1" /> Takipten Çık
                      </>
                    ) : (
                      <>
                        <RiUserFollowFill className="takipbuton-ikon1" /> Takip Et
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="biyografi-div13">
            <h5>{dbProfil.etkilesim.biografi || ""}</h5>
          </div>

          <div className="profil-Akıs-Diyagtamı14">
            {dbProfil.paylasimlar?.length > 0 ? (
              <ul>
                {dbProfil.paylasimlar.map((p, i) => (
                  <li key={i}>
                    <div className="kücük-div1">
                      <img
                        className="kücükprofilresmi1"
                        src={dbProfil.etkilesim.profilResmi}
                        alt="profil"
                      />
                      <h4>{dbProfil.isim}</h4>
                    </div>
                    <h4>{p.yazi}</h4>
                    {p.videourl ? (
                      <video controls className="vido1" src={p.videourl}></video>
                    ) : (
                      <img className="resim1" src={p.resimurl} alt="görsel bulunamadı" />
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Henüz paylaşım yok</p>
            )}
          </div>
        </div>
      )}

 
      {ekran === "liste" && (
        <div className="profilim-41">
          <div className="kapatma-butonu-1">
            <button onClick={() => setEkran("profil")} className="kapatma-butonı-2">
              <IoMdCloseCircle className="kapatma-iconu" />
            </button>
          </div>

          <h3 style={{ textAlign: "center" }}>
            {listeTipi === "takip" ? "Takip Edilenler" : "Takipçiler"}
          </h3>

          {listeVerisi.length > 0 ? (
            <ul className="kesfet-ul1">
              {listeVerisi.map((kullanici, i) => (
                <li key={i}>
                  <button
                    onClick={() => profiliGetir(kullanici.id)}
                    className="her-proilin-butonu1"
                  >
                    <img
                      className="resim-div1"
                      src={kullanici.etkilesim.profilResmi}
                      alt="profil"
                    />
                    <h4 id="isim-kesfet1">{kullanici.isim}</h4>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ textAlign: "center" }}>Liste boş</p>
          )}
        </div>
      )}
    </>
  );
}

export default AkisSemasi;
