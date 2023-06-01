package com.example.PIBackEnd.repository;

import com.example.PIBackEnd.domain.Fecha;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface IFechaRepository extends JpaRepository<Fecha,Long> {
    Optional<Fecha> findByFecha(LocalDate fecha);
}
