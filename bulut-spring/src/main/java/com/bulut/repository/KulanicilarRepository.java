package com.bulut.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bulut.kulanici.Kulanicilar;

@Repository
public interface KulanicilarRepository extends JpaRepository<Kulanicilar, Integer> {



}
