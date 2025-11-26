package com.bulut.kulanici;

import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "etkilesim")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Etkilesim {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ElementCollection
	private List<Integer> takip;
	 
	@ElementCollection
	private List<Integer> takipci;
	
	private String biografi;
	
	private String profilResmi;
	
	@OneToOne
    @JoinColumn(name = "kullanici_id") 
    private Kulanicilar kullanici; 
	
	
}
