package com.bulut.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bulut.controller.IController;
import com.bulut.dto.DtoAkısDiyagrami;
import com.bulut.dto.DtoKayid;
import com.bulut.dto.DtoKulanici;
import com.bulut.dto.DtoKulaniciPaylasim;
import com.bulut.dto.DtoLongIU;
import com.bulut.dto.DtoPaylasimlar;
import com.bulut.dto.DtoTakip;
import com.bulut.dto.dtoGiris;
import com.bulut.services.IServices;


@RestController
@RequestMapping(path = "/rest/api")
@CrossOrigin(origins = "http://localhost:5175/")
public class ControllerImpl implements IController {

	@Autowired
	private IServices services ;
	
	
	@Override
	@PostMapping(path = "/long")
	public dtoGiris getkulanıcı(@RequestBody DtoLongIU dtoLongIU) {
		return services.getkulanıcı(dtoLongIU);
	}


	
	@Override
	@GetMapping(path = "/etkilesimler/{id}")
	public DtoKulanici getEtkilesimler(@PathVariable(name = "id") Integer Id) {
		return services.getEtkilesimler(Id);
		 
	}




	@Override
	@GetMapping(path = "/takip/{id}")
	public DtoTakip getTakipById(@PathVariable(name = "id") Integer id) {
		return services.getTakipById(id);
	}



	@Override
	@GetMapping(path = "/update/takip/{id1}/{id2}")
	public void getTakipDelet (@PathVariable(name = "id1") Integer id1, @PathVariable(name = "id2") Integer id2) {
	  services.getTakipDelet(id1, id2);
		
	}



	@Override
	@GetMapping(path = "/paylasimlar/{id}")
	public List<DtoAkısDiyagrami > getPaylasimlar(@PathVariable(name = "id") Integer id) {
		return services.getPaylasimlar(id);
	}



	@Override
	@GetMapping(path = "/save/{id2}/{id3}")
	public void saveTakip(@PathVariable(name = "id2") Integer id2, @PathVariable(name = "id3")  Integer id3) {
		services.saveTakip(id2, id3);
		
	}



	@Override
	@GetMapping(path = "/kesfet/{isim}")
	public List<DtoTakip> getarama(@PathVariable(name = "isim") String isim) {
		return services.getarama(isim);
	}



	@Override
	@PostMapping(path = "/gonderi/save/{id}")
	public DtoKulaniciPaylasim gonderiPaylas(@RequestBody DtoPaylasimlar dtopaylasimlar , @PathVariable(name = "id") Integer id) {
		return services.gonderiPaylas(dtopaylasimlar, id);
		
	}



	@Override
	@PostMapping(path = "/yenikullanici/kayit")
	public void loginKayıt(@RequestBody DtoKayid dtoKayid) {
		services.loginKayıt(dtoKayid);
		
	}

}
