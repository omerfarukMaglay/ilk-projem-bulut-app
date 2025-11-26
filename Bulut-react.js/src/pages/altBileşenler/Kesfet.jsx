import React, { useState, useEffect } from "react";
import "./Kesfet.css";
import { MdSearch } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { RiUserUnfollowFill, RiUserFollowFill } from "react-icons/ri";
import axios from "axios";

function Kesfet({ kullaniciId }) {
  const [arama, setArama] = useState("");
  const [dbveri, setDbVeri] = useState([]);
  const [ekran, setEkran] = useState("anaEkran");
  const [dbKullanici, setDbKullanici] = useState(null);
  const [listeTipi, setListeTipi] = useState(null);
  const [listeVerisi, setListeVerisi] = useState([]);
  const [takipteMi, setTakipteMi] = useState(true);




  useEffect(() => {
    const aramayiYap = async () => {
      if (!arama.trim()) return;
      try {
        const res = await axios.get(`http://localhost:8080/rest/api/kesfet/${arama}`);
        setDbVeri(res.data);
      } catch (err) {
        console.error("Arama başarısız:", err);
      }
    };
    aramayiYap();
  }, [arama]);

  const kullaniciyiGoster = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/rest/api/etkilesimler/${id}`);
      setDbKullanici(res.data);
      setEkran("profil");
    } catch (err) {
      console.error("Profil alınamadı:", err);
    }
  };

  const listeyiGetir = async (tip) => {
    if (!dbKullanici) return;

    const ids = tip === "takip"
      ? dbKullanici.etkilesim.takip
      : dbKullanici.etkilesim.takipci;

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


  const kapat = () => {
    setDbKullanici(null);
    setListeVerisi([]);
    setEkran("anaEkran");
    setArama("");
  };

  const takipBırakma = async (id1, id2) => {
    try {
      await axios.get(
        "http://localhost:8080/rest/api/update/takip/" + id1 + "/" + id2
      );
    } catch (err) {
      console.error("Takipten çıkma hatası:", err);
    }
  };
  const takipEtme = async (id2, id3) => {
    try {
      await axios.get(
        "http://localhost:8080/rest/api/save/" + id2 + "/" + id3
      );
    } catch (err) {
      console.error("Takipteme  hatası:", err);
    }
  };



  return (
    <>
      {ekran === "anaEkran" && (
        <div className="ksefet-ana-div1">
          <div className="imputvearamabutonu1">
            <input
              type="text"
              placeholder="Arama"
              value={arama}
              onChange={(e) => setArama(e.target.value)}
              className="kesfet-input1"
            />
          </div>

          <div className="yeni-div1">
            {dbveri.length > 0 && (
              <ul className="kesfet-ul1">
                {dbveri.map((kullanici, i) => (
                  <li id="kesfet-id1" key={i}>
                    <button
                      onClick={() => kullaniciyiGoster(kullanici.id)}
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
            )}
          </div>
        </div>
      )}

      {ekran === "profil" && dbKullanici && (
        <div className="profilim-41">
          <div className="kapatma-butonu-1">
            <button onClick={kapat} className="kapatma-butonı-2">
              <IoMdCloseCircle className="kapatma-iconu" />
            </button>
          </div>

          <div className="profilim-31">
            <img
              className="profilresmi1"
              src={dbKullanici.etkilesim.profilResmi}
              alt="profil"
            />
            <div>
              <h4 style={{ margin: 0, fontSize: "20px" }}>{dbKullanici.isim}</h4>
              <div className="profilim-21">
                <button
                  onClick={() => listeyiGetir("takipci")}
                  className="profil-button1"
                >
                  Takipçi: {dbKullanici.etkilesim.takipci.length}
                </button>
                <button
                  onClick={() => listeyiGetir("takip")}
                  className="profil-button1"
                >
                  Takip: {dbKullanici.etkilesim.takip.length}
                </button>

                {kullaniciId !== dbKullanici.id ? (
                  <button
                    onClick={() => {
                      setTakipteMi(!takipteMi);
                      if (takipteMi) {
                        // takipteyken basılırsa => takipten çık
                        takipBırakma(kullaniciId, dbKullanici.id);
                      } else {
                        // takipte değilken basılırsa => takip et
                        takipEtme(kullaniciId, dbKullanici.id);
                      }
                    }}
                    className={`profil-button32 ${takipteMi ? "takipten-cik" : "takip-et"}`}
                  >
                    {takipteMi ? (
                      <>
                        <RiUserUnfollowFill className="takipbuton-ikon" /> Takipten Çık
                      </>
                    ) : (
                      <>
                        <RiUserFollowFill className="takipbuton-ikon" /> Takip Et
                      </>
                    )}
                  </button>
                ) : (
                  ""
                )}

              </div>
            </div>
          </div>

          <div className="biyografi-div1">
            <h5>{dbKullanici.etkilesim.biografi || ""}</h5>
          </div>

          <div className="profil-Akıs-Diyagtamı1">
            {dbKullanici.paylasimlar?.length > 0 ? (
              <ul>
                {dbKullanici.paylasimlar.map((p, i) => (
                  <li key={i}>
                    <div className="kücük-div1">
                      <img
                        className="kücükprofilresmi1"
                        src={dbKullanici.etkilesim.profilResmi}
                        alt="profil"
                      />
                      <h4>{dbKullanici.isim}</h4>
                    </div>
                    <h4>{p.yazi}</h4>
                    {p.videourl ? (
                      <video controls className="vido1" src={p.videourl}></video>
                    ) : (
                      <img
                        className="resim1"
                        src={p.resimurl}
                        alt="görsel bulunamadı"
                      />
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
            <button
              onClick={() => setEkran("profil")}
              className="kapatma-butonı-2"
            >
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
                    onClick={() => kullaniciyiGoster(kullanici.id)}
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

export default Kesfet;
