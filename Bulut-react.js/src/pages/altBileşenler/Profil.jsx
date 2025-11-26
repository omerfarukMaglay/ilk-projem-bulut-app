import axios from "axios";
import { useEffect, useState } from "react";
import "./Profil.css";
import { FaWindowClose } from "react-icons/fa";
import { RiUserUnfollowFill, RiUserFollowFill } from "react-icons/ri";

function Profil({ kullaniciId }) {
  const [dbVerileri, setDbVerileri] = useState(null);
  const [takipTakipci, setTakipTakipci] = useState("");
  const [dbTakipListesi, setDbTakipListesi] = useState([]);
  const [takipte, setTakipte] = useState([]); 

  const karar = (e) => {
    setTakipTakipci(e);
  };

  const profilim = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/rest/api/etkilesimler/" + kullaniciId
      );
      setDbVerileri(res.data);
    } catch {
      console.error("Profil alınamadı");
    }
  };

  useEffect(() => {
    profilim();
  }, [kullaniciId]);

  const takipVeyaTakipciDetaylariniGetir = async (liste) => {
    try {
      const detaylar = await Promise.all(
        liste.map(async (id) => {
          const res = await axios.get("http://localhost:8080/rest/api/takip/" + id);
          return res.data;
        })
      );
      setDbTakipListesi(detaylar);
      // Her kişi için başlangıçta true (takip ediliyor) olarak ayarla
      setTakipte(detaylar.map(() => true));
    } catch {
      console.error("Takip/takipçi detayları alınamadı");
    }
  };

  useEffect(() => {
    if (!dbVerileri) return;
    if (takipTakipci === "takip") {
      takipVeyaTakipciDetaylariniGetir(dbVerileri.etkilesim.takip);
    } else if (takipTakipci === "takipci") {
      takipVeyaTakipciDetaylariniGetir(dbVerileri.etkilesim.takipci);
    }
  }, [takipTakipci]);

 
  const degerlendirTakipi = (deger, index) => {
    setTakipte((eski) => {
      const yeni = [...eski];
      yeni[index] = deger;
      return yeni;
    });
  };

  const takipBırakma = async (id1, id2, index) => {
    try {
      await axios.get(
        "http://localhost:8080/rest/api/update/takip/" + id1 + "/" + id2
      );
      degerlendirTakipi(false, index); 
      profilim(); 
    } catch (err) {
      console.error("Takipten çıkma hatası:", err);
    }
  };
  const takipEtme = async (id2, id3, index) => {
    try {
      await axios.get(
        "http://localhost:8080/rest/api/save/" + id2 + "/" + id3
      );
      degerlendirTakipi(true, index)
      profilim(); 
    } catch (err) {
      console.error("Takipteme  hatası:", err);
    }
  };

  return (
    <>
      {takipTakipci === "" && (
        <div className="profilim">
          {dbVerileri ? (
            <>
              <div className="profilim-1">
                <div className="profilim-4">
                  <img
                    className="profilresmi"
                    src={dbVerileri.etkilesim.profilResmi}
                    alt="profil"
                  />
                  <div className="profilim-3">
                    <div className="isim-div">
                      <h4 style={{ margin: "0", fontSize: "20px" }}>
                        {dbVerileri.isim}
                      </h4>
                    </div>
                    <div className="profilim-2">
                      <button
                        onClick={() => karar("takipci")}
                        className="profil-button"
                      >
                        Takipçi: {dbVerileri.etkilesim.takipci.length || 0}
                      </button>
                      <button
                        onClick={() => karar("takip")}
                        className="profil-button"
                      >
                        Takip: {dbVerileri.etkilesim.takip.length || 0}
                      </button>
                      
                    </div>
                  </div>
                </div>

                <div className="biyografi-div">
                  <h5>{dbVerileri.etkilesim.biografi || "Henüz yok"}</h5>
                </div>
              </div>

              <div className="profil-Akıs-Diyagtamı">
                {dbVerileri.paylasimlar &&
                dbVerileri.paylasimlar.length > 0 ? (
                  <ul>
                    {dbVerileri.paylasimlar.map((paylasim, index) => (
                      <li key={index}>
                        <div className="kücük-div">
                          <img
                            className="kücükprofilresmi"
                            src={dbVerileri.etkilesim.profilResmi}
                            alt="profil"
                          />
                          <h4>{dbVerileri.isim}</h4>
                        </div>
                        <h4>{paylasim.yazi}</h4>
                        {paylasim.videourl ? (
                          <video
                            className="vido"
                            controls
                            src={paylasim.videourl}
                          ></video>
                        ) : (
                          <img
                            className="resim"
                            src={paylasim.resimurl}
                            alt="görsel bulunmadı"
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Henüz paylaşım yok</p>
                )}
              </div>
            </>
          ) : (
           <div>
            selamm
           </div>
          )}
        </div>
      )}

      {(takipTakipci === "takip" ) && (
        <div className="takip-modal">
          <button
            className="modal-kapat"
            onClick={() => {
              karar("");
              profilim();
            }}
          >
            <FaWindowClose />
          </button>

          {dbTakipListesi.length > 0 ? (
            <ul>
              {dbTakipListesi.map((kisi, index) => (
                <li key={index}>
                  <div className="takip-kisi-takip">
                    <img
                      className="kücükprofilresmi"
                      src={kisi.etkilesim.profilResmi}
                      alt="profil"
                    />
                    <h4 style={{ marginLeft: "-60%" }}>{kisi.isim}</h4>

                    <div className="takip-kontrol">
                      {takipte[index] ? (
                        <button
                          id="takipten-cik"
                          className="takiplerortakip"
                          onClick={() =>
                            takipBırakma(dbVerileri.id, kisi.id, index)
                          }
                        >
                          <RiUserUnfollowFill />
                        </button>
                      ) : (
                        <button
                          id="takip-et"
                          className="takiplerortakip"
                          onClick={() => takipEtme(dbVerileri.id, kisi.id, index) }
                        >
                          <RiUserFollowFill />
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <h1>Yükleniyor veya liste boş...</h1>
          )}
          
        </div>
      )}
      {( takipTakipci === "takipci") && (
        <div className="takip-modal">
          <button
            className="modal-kapat"
            onClick={() => {
              karar("");
              profilim();
            }}
          >
            <FaWindowClose />
          </button>

          {dbTakipListesi.length > 0 ? (
            <ul>
              {dbTakipListesi.map((kisi, index) => (
                <li key={index}>
                  <div className="takip-kisi-takip">
                    <img
                      className="kücükprofilresmi"
                      src={kisi.etkilesim.profilResmi}
                      alt="profil"
                    />
                    <h4 style={{ marginLeft: "-60%" }}>{kisi.isim}</h4>

                    <div className="takip-kontrol">
                      {takipte[index] ? (
                        <button
                          id="takipten-cik"
                          className="takiplerortakip"
                          onClick={() =>
                            
                            takipBırakma(kisi.id,dbVerileri.id , index)
                          }
                        >
                          <RiUserUnfollowFill />
                        </button>
                      ) : (
                        <button
                          id="takip-et"
                          className="takiplerortakip"
                          onClick={() => takipEtme( kisi.id,dbVerileri.id, index)}
                        >
                          <RiUserFollowFill />
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <h1>Yükleniyor veya liste boş...</h1>
          )}
          
        </div>
      )}
    </>
  );
}

export default Profil;
