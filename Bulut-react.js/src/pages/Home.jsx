import React, { useState } from 'react'
import './home.css'
import { GoHomeFill } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { LuMessageSquareShare } from "react-icons/lu";
import { IoNotifications } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import AkisSemasi from './altBileşenler/AkisSemasi';
import Profil from './altBileşenler/Profil';
import { FaSearch } from "react-icons/fa"
import Kesfet from './altBileşenler/Kesfet';
import GonderiPaylas from './altBileşenler/GonderiPaylas';




function Home({ kullaniciId }) {


  const [ekran, setEkran] = useState('anasayfa')

  const ekranSec = (value) => {
    setEkran(value);
  }

  return (
    <div className='home'>


      <div className='home-div'>
        <div className='profil'>

          <button className='anasayfa'
            onClick={() => ekranSec("anasayfa")}          >
            <GoHomeFill style={{ width: '30px', height: '30px' }} />
            <h3 style={{ marginLeft: '40px' }}>Ana sayfa</h3>
          </button>

          <button className='Profilim'
            onClick={() => ekranSec("Profilim")}          >
            <CgProfile style={{ width: '30px', height: '30px' }} />
            <h3 style={{ marginLeft: '40px' }}>Profilim</h3>
          </button>

          <button className='Gönderi-paylaş'
            onClick={() => ekranSec("Gönderi-paylaş")}          >
            <LuMessageSquareShare style={{ width: '30px', height: '30px' }} />
            <h3 style={{ marginLeft: '40px' }}>Gönderi paylaş</h3>
          </button>




          <button className='Kesfet'
            onClick={() => ekranSec("Kesfet")}          >
            <FaSearch style={{ width: '30px', height: '30px' }} />
            <h3 style={{ marginLeft: '40px' }}>Keşfet</h3>
          </button>


        </div>
      </div>

      <div className="home-div-ort">

        {ekran === "anasayfa" && (
          <div className="akis-semasi">

            <AkisSemasi kullaniciId={kullaniciId} />

          </div>

        )}

        {ekran === "Profilim" && (
          <div>
            <Profil kullaniciId={kullaniciId} />
          </div>
        )}

        {ekran === "Gönderi-paylaş" && (
          <div>
            <GonderiPaylas kullaniciId={kullaniciId} />
          </div>
        )}



        

        {ekran === "Kesfet" && (
          <div>
            <Kesfet kullaniciId={kullaniciId} />
          </div>
        )}

      </div>








      <div className='home-div'>
        <div className='gündem-manşet'>

            /*
          bu kısma en cok aratılan etıket gelecek
          */

        </div>
      </div>


    </div>
  )
}

export default Home