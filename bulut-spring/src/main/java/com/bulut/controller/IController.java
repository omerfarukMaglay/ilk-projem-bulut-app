package com.bulut.controller;

import java.util.List;

import com.bulut.dto.DtoAkısDiyagrami;
import com.bulut.dto.DtoKayid;
import com.bulut.dto.DtoKulanici;
import com.bulut.dto.DtoKulaniciPaylasim;
import com.bulut.dto.DtoLongIU;
import com.bulut.dto.DtoPaylasimlar;
import com.bulut.dto.DtoTakip;
import com.bulut.dto.dtoGiris;

public interface IController {
	public dtoGiris getkulanıcı(DtoLongIU dtoLongIU);
	public DtoKulanici getEtkilesimler(Integer Id);
	public DtoTakip getTakipById(Integer id);
	public void getTakipDelet(Integer id1, Integer id2);
	public List<DtoAkısDiyagrami > getPaylasimlar(Integer id);
	public void saveTakip(Integer id2, Integer id3);
	public List<DtoTakip> getarama(String isim);
	public DtoKulaniciPaylasim gonderiPaylas(DtoPaylasimlar dtopaylasimlar, Integer id);
	public void loginKayıt(DtoKayid dtoKayid);
}
