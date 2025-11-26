package com.bulut.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoAkısDiyagrami {
	 private Integer id; 
	 private String isim;
	 private DtoAkisDiyagramiEtkilesim etkilesim ;
	 private DtoPaylasimlar paylasimlar ;
	 
}
