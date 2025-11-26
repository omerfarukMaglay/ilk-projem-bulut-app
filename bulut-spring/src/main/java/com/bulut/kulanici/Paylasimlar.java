package com.bulut.kulanici;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "paylasimlar")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Paylasimlar {
  
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String yazi;
	private String resimurl;
	private String videourl;
	@ManyToOne
    @JoinColumn(name = "kullanici_id") 
    private Kulanicilar kullanici; 
	
}
