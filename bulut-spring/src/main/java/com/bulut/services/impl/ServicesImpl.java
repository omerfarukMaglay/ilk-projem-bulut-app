package com.bulut.services.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bulut.dto.DtoAkisDiyagramiEtkilesim;
import com.bulut.dto.DtoAkısDiyagrami;
import com.bulut.dto.DtoEtkilesim;
import com.bulut.dto.DtoKayid;
import com.bulut.dto.DtoKulanici;
import com.bulut.dto.DtoKulaniciPaylasim;
import com.bulut.dto.DtoLongIU;
import com.bulut.dto.DtoPaylasimlar;
import com.bulut.dto.DtoTakip;
import com.bulut.dto.DtoTakipEtkilesim;
import com.bulut.dto.dtoGiris;
import com.bulut.kulanici.Etkilesim;
import com.bulut.kulanici.Kulanicilar;
import com.bulut.kulanici.Paylasimlar;
import com.bulut.repository.KulanicilarRepository;
import com.bulut.services.IServices;

@Service
public class ServicesImpl implements IServices {
	
	@Autowired
	private KulanicilarRepository kulanicilarRepository;

   

	@Override
	public dtoGiris getkulanıcı(DtoLongIU dtoLongIU) {
		dtoGiris dtoGiris = new dtoGiris();
	   List<Kulanicilar> dbKulanicilars =	kulanicilarRepository.findAll();
	   for (Kulanicilar kulanicilar : dbKulanicilars) {
		  if (kulanicilar.getIsim().equals(dtoLongIU.getIsim()) && kulanicilar.getSifre().equals(dtoLongIU.getSifre())) {
			  dtoGiris.setGirisOnayi(true);
			  dtoGiris.setKullaniciId(kulanicilar.getId());
			return dtoGiris ;
		}
	}
	    dtoGiris.setGirisOnayi(false);
		dtoGiris.setKullaniciId(null);
		return dtoGiris;
	}

	@Override
	public DtoKulanici getEtkilesimler(Integer Id) {

	    DtoKulanici dtoKulanici = new DtoKulanici(); 
	    Optional<Kulanicilar> kulanicilar = kulanicilarRepository.findById(Id);
	    Kulanicilar dbKulanicilar = kulanicilar.get();
	            BeanUtils.copyProperties(dbKulanicilar, dtoKulanici);
	            
	            if (dbKulanicilar.getEtkilesim() != null) {
	                dtoKulanici.setEtkilesim(new DtoEtkilesim());
	                BeanUtils.copyProperties(dbKulanicilar.getEtkilesim(), dtoKulanici.getEtkilesim());
	            }

	            List<DtoPaylasimlar> dtoPaylasimlars = new ArrayList<>();
	            if (dbKulanicilar.getPaylasimlar() != null) {
	            	dbKulanicilar.getPaylasimlar().forEach(p -> {
	                    DtoPaylasimlar dtoPaylasim = new DtoPaylasimlar();
	                    BeanUtils.copyProperties(p, dtoPaylasim);
	                    dtoPaylasimlars.add(dtoPaylasim);
	                    
	                });
	            	Collections.reverse(dtoPaylasimlars);
	            	dtoKulanici.setPaylasimlar(dtoPaylasimlars);
	            }

	            return dtoKulanici;     
	}

	@Override
	public DtoTakip getTakipById(Integer id) {
		Optional<Kulanicilar> optional = kulanicilarRepository.findById(id);
		
		Kulanicilar dbKulanicilar = optional.get();
		
		DtoTakip dtoTakip = new DtoTakip();
		DtoTakipEtkilesim dtoTakipEtkilesim = new DtoTakipEtkilesim();
		
		BeanUtils.copyProperties(dbKulanicilar, dtoTakip);
		BeanUtils.copyProperties(dbKulanicilar.getEtkilesim(), dtoTakipEtkilesim);
		dtoTakip.setEtkilesim(dtoTakipEtkilesim);
		return dtoTakip;
	}

	@Override
	public void getTakipDelet(Integer id1, Integer id2) {
	  Optional<Kulanicilar> optional =	kulanicilarRepository.findById(id1);	
	  if (optional.isEmpty()) {
		
	}else {
		Kulanicilar dbKulanicilar = optional.get();
		  
		 List<Integer> dbListTakip = dbKulanicilar.getEtkilesim().getTakip();
		 List<Integer> newtakipList = new ArrayList<>();
		 
		  for (Integer integer : dbListTakip) {
			  if (integer.equals(id2)) {
				
			}else {
				newtakipList.add(integer);
			}
		 }
		  dbKulanicilar.getEtkilesim().setTakip(newtakipList);
		  kulanicilarRepository.save(dbKulanicilar);
	}
	  
	  
	  Optional<Kulanicilar> optional2 =	kulanicilarRepository.findById(id2);
	  
	  if (optional2.isPresent()) {
		  Kulanicilar kulanicilar = optional2.get();
		  
		  List<Integer> dbTakipciList = kulanicilar.getEtkilesim().getTakipci();
		  List<Integer> newTakipçiList = new ArrayList<>();
		  
		  for (Integer integer : dbTakipciList) {
			if (integer.equals(id1)) {
				
			}else {
				newTakipçiList.add(integer);
			}
		 }
		  kulanicilar.getEtkilesim().setTakipci(newTakipçiList);
		  kulanicilarRepository.save(kulanicilar);		
	}

	  
	}

	@Override
	public List<DtoAkısDiyagrami> getPaylasimlar(Integer id) {
	    Optional<Kulanicilar> optional = kulanicilarRepository.findById(id);
	    if (optional.isEmpty()) {
	        return new ArrayList<>();
	    }

	    Kulanicilar dbKulanicilar = optional.get();
	    List<DtoAkısDiyagrami> newDtoAkısDiyagramis = new ArrayList<>();
	    List<Integer> payIntegers = new ArrayList<>();

	    payIntegers.add(id);

	    if (dbKulanicilar.getEtkilesim() != null && dbKulanicilar.getEtkilesim().getTakip() != null) {
	        payIntegers.addAll(dbKulanicilar.getEtkilesim().getTakip());
	    }

	    for (Integer integer : payIntegers) {
	        Optional<Kulanicilar> optional2 = kulanicilarRepository.findById(integer);
	        if (optional2.isEmpty()) continue;

	        Kulanicilar dbKulanicilar2 = optional2.get();

	        for (Paylasimlar paylasimlar : dbKulanicilar2.getPaylasimlar()) {
	            DtoAkısDiyagrami dto = new DtoAkısDiyagrami();
	            dto.setId(dbKulanicilar2.getId());
	            dto.setIsim(dbKulanicilar2.getIsim());

	            DtoAkisDiyagramiEtkilesim etk = new DtoAkisDiyagramiEtkilesim();
	            etk.setProfilResmi(dbKulanicilar2.getEtkilesim().getProfilResmi());
	            dto.setEtkilesim(etk);

	            DtoPaylasimlar dtoPay = new DtoPaylasimlar();
	            BeanUtils.copyProperties(paylasimlar, dtoPay);
	            dto.setPaylasimlar(dtoPay);

	            newDtoAkısDiyagramis.add(dto);
	        }
	    }

	    Collections.reverse(newDtoAkısDiyagramis);

	    return newDtoAkısDiyagramis;
	}

	      
	   
	

	@Override
	public void saveTakip(Integer id2, Integer id3) {
		Optional<Kulanicilar> optional = kulanicilarRepository.findById(id2);
		boolean dger = true ;
		if (optional.isPresent()) {
			Kulanicilar dbKulanicilar = optional.get();
			for (Integer integer : dbKulanicilar.getEtkilesim().getTakip()) {
				if (integer.equals(id3)) {
					dger = false ;
				}
			}
			
			
			if (dger) {
				dbKulanicilar.getEtkilesim().getTakip().add(id3);
				kulanicilarRepository.save(dbKulanicilar);
			}
			
			
		}
		
		Optional<Kulanicilar> optional2 = kulanicilarRepository.findById(id3);
		if (optional2.isPresent()) {
			Kulanicilar dbKulanicilar2 = optional2.get();
			for (Integer integer : dbKulanicilar2.getEtkilesim().getTakip()) {
				if (integer.equals(id2)) {
					dger = false ;
				}
			}
			
			
			if (dger) {
				dbKulanicilar2.getEtkilesim().getTakipci().add(id2);
				kulanicilarRepository.save(dbKulanicilar2);
			}
			
		}
		
				
	}

	@Override
	public List<DtoTakip> getarama(String isim) {
		
	  List<Kulanicilar> dbKulanicilars = kulanicilarRepository.findAll();
	  
	  List<DtoTakip>  uygunkisilerDtoTakips = new ArrayList<>();
	  
	  for (Kulanicilar dbkulanıcı : dbKulanicilars) {
		 DtoTakip dtoTakip = new DtoTakip();
		 DtoTakipEtkilesim dtoTakipEtkilesim = new DtoTakipEtkilesim();
		 dtoTakip.setEtkilesim(dtoTakipEtkilesim);
		  int ortak = ortakBasHarfSayisi(dbkulanıcı.getIsim(), isim);
		  if (ortak > 0) {
			  BeanUtils.copyProperties(dbkulanıcı, dtoTakip);
			  dtoTakip.getEtkilesim().setProfilResmi(dbkulanıcı.getEtkilesim().getProfilResmi());
              uygunkisilerDtoTakips.add(dtoTakip);
          }
	  }
	  for (int i = 0; i < uygunkisilerDtoTakips.size(); i++) {
		for (int j = 0+1 ; j <uygunkisilerDtoTakips.size() ; j++) {
			
			int sira1 = ortakBasHarfSayisi(uygunkisilerDtoTakips.get(i).getIsim(), isim);
			int sira2 = ortakBasHarfSayisi(uygunkisilerDtoTakips.get(j).getIsim(), isim);
			
			if (sira2 > sira1) {
				DtoTakip degerDtoTakip = uygunkisilerDtoTakips.get(i);
				uygunkisilerDtoTakips.set(i, uygunkisilerDtoTakips.get(j));
				uygunkisilerDtoTakips.set(j, degerDtoTakip);
			}
			
		}
	 }
	  
	  
	  
		return uygunkisilerDtoTakips;
		
		
	}
	   
	 public static int ortakBasHarfSayisi(String a, String b) {
	        int min = Math.min(a.length(), b.length());
	        int sayac = 0;
	        for (int i = 0; i < min; i++) {
	            if (a.charAt(i) == b.charAt(i)) {
	                sayac++;
	            } else {
	                break; 
	            }
	        }
	        return sayac;
	    }

	@Override
	public DtoKulaniciPaylasim gonderiPaylas(DtoPaylasimlar dtopaylasimlar, Integer id) {
	  Optional<Kulanicilar>  optional =	kulanicilarRepository.findById(id);
	  Kulanicilar dbKulanicilar = optional.get();
	  
	  Paylasimlar newPaylasim = new Paylasimlar();
	  
	  DtoKulaniciPaylasim dtoKulaniciPaylasim = new DtoKulaniciPaylasim();
	  
	  DtoPaylasimlar dtoPaylasimlar2 = new DtoPaylasimlar();
	  dtoKulaniciPaylasim.setPaylasimlar(dtoPaylasimlar2);
	  
	  if(dtopaylasimlar != null) {
	    BeanUtils.copyProperties(dtopaylasimlar, newPaylasim);  
	    newPaylasim.setKullanici(dbKulanicilar);
	    dbKulanicilar.getPaylasimlar().add(newPaylasim);
	    DtoEtkilesim dtoEtkilesim = new DtoEtkilesim();
	    dtoKulaniciPaylasim.setEtkilesim(dtoEtkilesim);
	   
	      BeanUtils.copyProperties(dbKulanicilar, dtoKulaniciPaylasim);
	      
	      BeanUtils.copyProperties(dtopaylasimlar , dtoKulaniciPaylasim.getPaylasimlar() );
	      if (dbKulanicilar.getEtkilesim() != null
	    		  && dbKulanicilar.getEtkilesim().getProfilResmi() != null ) {
			 dtoKulaniciPaylasim.getEtkilesim().setProfilResmi(dbKulanicilar.getEtkilesim().getProfilResmi());
		}
	     
	      
		  
		  
		  kulanicilarRepository.save(dbKulanicilar);
		  return dtoKulaniciPaylasim ;
	  }

		return null;
	}

	@Override
	public void loginKayıt(DtoKayid dtoKayid) {
		
		if (dtoKayid != null) {
			
			Kulanicilar newKulanicilar = new Kulanicilar();
			
			newKulanicilar.setIsim(dtoKayid.getIsim());
			
			newKulanicilar.setSifre(dtoKayid.getSifre());
			kulanicilarRepository.save(newKulanicilar);
		}
		
		
	}
	   
	  
	
		
	
	

}











