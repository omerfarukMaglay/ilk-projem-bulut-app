package com.bulut.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DtoEtkilesim {
	
	
	private List<Integer> takip;
	 
	private List<Integer> takipci;
	
	private String biografi;
	
	private String profilResmi;
}
