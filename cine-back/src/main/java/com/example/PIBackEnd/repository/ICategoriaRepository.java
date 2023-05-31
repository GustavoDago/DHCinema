package com.example.PIBackEnd.repository;

import com.example.PIBackEnd.domain.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ICategoriaRepository extends JpaRepository<Categoria,Long> {
    Optional<Categoria> findByTitulo(String titulo);
}