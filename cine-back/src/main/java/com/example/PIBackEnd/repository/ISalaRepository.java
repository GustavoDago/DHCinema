package com.example.PIBackEnd.repository;

import com.example.PIBackEnd.domain.Sala;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ISalaRepository extends JpaRepository<Sala, Long> {
    Optional<Sala> findByNombre(String nombre);
    Optional<Sala> findByNombreAndCine_Id(String nombre, Long id);
    Optional<Sala> findByNombreAndCine_IdAndVigenteTrue(String nombre, Long id);
    List<Sala> findAllByVigenteTrue();
    Optional<Sala> findByIdAndVigenteTrue(Long id);
}
