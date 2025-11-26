package com.bulut.dto;

import java.util.ArrayList;
import java.util.List;

import com.bulut.kulanici.Etkilesim;
import com.bulut.kulanici.Paylasimlar;

import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoKulanici {
	 private Integer id;
	 private String isim;
	 private DtoEtkilesim etkilesim ;
	 private List<DtoPaylasimlar> paylasimlar = new ArrayList<>();
}
