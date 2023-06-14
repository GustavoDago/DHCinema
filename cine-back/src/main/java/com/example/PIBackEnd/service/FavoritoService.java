package com.example.PIBackEnd.service;

import com.example.PIBackEnd.domain.Favorito;
import com.example.PIBackEnd.domain.Pelicula;
import com.example.PIBackEnd.domain.Usuario;
import com.example.PIBackEnd.dtos.FavoritoDTO;
import com.example.PIBackEnd.exceptions.ResourceBadRequestException;
import com.example.PIBackEnd.repository.IFavoritoRepository;
import com.example.PIBackEnd.repository.IPeliculaRepository;
import com.example.PIBackEnd.repository.IUsuarioRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class FavoritoService {
    private final static Logger logger = Logger.getLogger(FavoritoService.class);
    @Autowired
    private IFavoritoRepository iFavoritoRepository;

    @Autowired
    private IPeliculaRepository peliculaRepository;

    @Autowired
    private IUsuarioRepository usuarioRepository;

    @Autowired
    public FavoritoService(IFavoritoRepository iFavoritoRepository) {
        this.iFavoritoRepository = iFavoritoRepository;
    }


    public FavoritoDTO guardarFavorito(FavoritoDTO favorito) throws ResourceBadRequestException {
        // recupero los objetos a partir de los códigos en el DTO
        Optional<Pelicula> peliculaBuscada = peliculaRepository.findById(favorito.getPelicula_id());
        Optional<Usuario> usuarioBuscado = usuarioRepository.findById(favorito.getUsuario_id());
        // Si no se recuperan, mando excepción
        if (peliculaBuscada.isEmpty()) throw new ResourceBadRequestException("Error. La película no existe");
        if (usuarioBuscado.isEmpty()) throw new ResourceBadRequestException("Error. El usuario no existe");
        // si está ok, guardo. Si vino el código del favorito, actualizo
        logger.info("Guardando en tabla Favoritos");
        return convertirFavoritoaFavoritoDTO(iFavoritoRepository.save(convertirFavoritoDTOaFavorito(favorito)));
    }
    private Favorito convertirFavoritoDTOaFavorito(FavoritoDTO favoritoDTO){
        Favorito favorito = new Favorito();
        Pelicula pelicula= new Pelicula();
        Usuario usuario = new Usuario();
        favorito.setId(favoritoDTO.getId());
        favorito.setFavorito(favoritoDTO.getFavorito());
        pelicula.setId(favoritoDTO.getPelicula_id());
        usuario.setId(favoritoDTO.getUsuario_id());
        favorito.setPelicula(pelicula);
        favorito.setUsuario(usuario);
        return favorito;
    }

    private FavoritoDTO convertirFavoritoaFavoritoDTO(Favorito favorito){
        FavoritoDTO favoritoDTO = new FavoritoDTO();
        favoritoDTO.setId(favorito.getId());
        favoritoDTO.setPelicula_id(favorito.getPelicula().getId());
        favoritoDTO.setUsuario_id(favorito.getUsuario().getId());
        favoritoDTO.setFavorito(favorito.getFavorito());
        return favoritoDTO;
    }
}
