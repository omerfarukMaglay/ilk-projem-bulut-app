package com.bulut.kulanici;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "kulanicilar")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Kulanicilar {

	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Integer id;
	 
	 private String isim;
	 
	 private String sifre;
	 
	 @OneToOne(mappedBy = "kullanici", cascade = CascadeType.ALL, orphanRemoval = true)
	 private Etkilesim etkilesim ;
	 
	 @OneToMany(mappedBy = "kullanici", cascade = CascadeType.ALL, orphanRemoval = true)
	 private List<Paylasimlar> paylasimlar = new ArrayList<>();
	 
	 
	
	
	
	
	
	
}
