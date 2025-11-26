package com.bulut.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DtoTakip {

     private Integer id; 
	 private String isim;
	 private DtoTakipEtkilesim etkilesim ;
}
