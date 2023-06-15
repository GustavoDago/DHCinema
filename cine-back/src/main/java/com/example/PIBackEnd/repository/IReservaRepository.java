package com.example.PIBackEnd.repository;

import com.example.PIBackEnd.domain.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IReservaRepository extends JpaRepository<Reserva, Long> {

    List<Reserva> findAllByVigenteTrueAndUsuarioEmail(String email);
    List<Reserva> findAllByVigenteTrue();
}
