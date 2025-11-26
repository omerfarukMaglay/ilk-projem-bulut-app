package com.bulut.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class DtoKulaniciPaylasim {
	 private Integer id;
	 private String isim;
	 private DtoEtkilesim etkilesim ;
	 private DtoPaylasimlar paylasimlar;


}
