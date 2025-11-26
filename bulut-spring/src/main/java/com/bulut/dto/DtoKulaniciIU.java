package com.bulut.dto;

import java.util.ArrayList;
import java.util.List;

import com.bulut.kulanici.Paylasimlar;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class DtoKulaniciIU {
	
	 private String isim;
	 private String sifre;
	 private String biografi;
	 private Integer takip ;
	 private Integer takipçi;
	 private List<Paylasimlar> paylasimlar = new ArrayList<>();
}
