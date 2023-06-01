package com.example.PIBackEnd.repository;

import com.example.PIBackEnd.domain.Imagen;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IImagenRepository extends JpaRepository<Imagen,Long> {
    Optional<Imagen> findByImagen(String imagen);
}
