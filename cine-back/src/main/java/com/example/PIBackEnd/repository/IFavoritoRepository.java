package com.example.PIBackEnd.repository;

import com.example.PIBackEnd.domain.Favorito;
import com.example.PIBackEnd.domain.Pelicula;
import com.example.PIBackEnd.domain.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IFavoritoRepository extends JpaRepository<Favorito,Long> {

    boolean existsByUsuarioAndPelicula(Usuario usuario, Pelicula pelicula);
}
