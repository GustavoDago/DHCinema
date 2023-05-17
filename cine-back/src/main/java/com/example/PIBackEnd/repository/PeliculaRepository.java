package com.example.PIBackEnd.repository;

import com.example.PIBackEnd.domain.Pelicula;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PeliculaRepository extends JpaRepository<Pelicula,Long> {
    Optional<Pelicula> findByTitulo(String titulo);
    Page<Pelicula> findAll(Pageable pageable);
}
