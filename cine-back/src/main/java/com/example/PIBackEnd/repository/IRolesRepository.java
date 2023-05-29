package com.example.PIBackEnd.repository;

import com.example.PIBackEnd.domain.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface IRolesRepository extends JpaRepository<Rol, Long> {
    Optional<Rol> findByNombre(String nombre);
}
