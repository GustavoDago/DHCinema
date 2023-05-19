package com.example.PIBackEnd.service;

import com.example.PIBackEnd.domain.Categoria;
import com.example.PIBackEnd.domain.Fecha;
import com.example.PIBackEnd.domain.Pelicula;
import com.example.PIBackEnd.exceptions.ResourceBadRequestException;
import com.example.PIBackEnd.exceptions.ResourceNoContentException;
import com.example.PIBackEnd.exceptions.ResourceNotFoundException;
import com.example.PIBackEnd.repository.PeliculaRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.*;

@Service
public class PeliculaService {

    private final static Logger logger = Logger.getLogger(PeliculaService.class);
    private PeliculaRepository peliculaRepository;
    private CategoriaService categoriaService;
    private FechaService fechaService;

    @Autowired
    public PeliculaService(PeliculaRepository peliculaRepository, CategoriaService categoriaService, FechaService fechaService) {
        this.peliculaRepository = peliculaRepository;
        this.categoriaService = categoriaService;
        this.fechaService = fechaService;
    }

    public Pelicula guardarPelicula(Pelicula pelicula) throws ResourceBadRequestException {
        logger.info("Guardando Pelicula nueva");
        if (pelicula.chequearAtributosVacios()) {
            throw new ResourceBadRequestException("Error. La Pelicula tiene que contener todos sus campos");
        } else {
            String titulo = pelicula.getTitulo();
            if (peliculaRepository.findByTitulo(titulo).isPresent()) {
                throw new ResourceBadRequestException("Error. Ya existe una Pelicula con el mismo titulo");
            } else {
                Set<Categoria> nuevasCategorias = categoriaService.guardarCategorias(pelicula.getCategorias());
                Set<Fecha> nuevasFechas = fechaService.guardarFechas(pelicula.getFechas());

                pelicula.setCategorias(nuevasCategorias);
                pelicula.setFechas(nuevasFechas);
                pelicula.setVigente(true);
                return peliculaRepository.save(pelicula);
            }
        }
    }

    public Pelicula actualizarPelicula(Pelicula pelicula) throws ResourceNotFoundException, ResourceBadRequestException {
        logger.info("Actualizando Pelicula con id " + pelicula.getId());
        Optional<Pelicula> peliculaBuscada = peliculaRepository.findByIdAndVigente(pelicula.getId(),true);
        if (peliculaBuscada.isPresent()) {
            if (pelicula.chequearAtributosVacios()) {
                throw new ResourceBadRequestException("Error. La Pelicula tiene que contener todos sus campos");
            } else {
                String titulo = pelicula.getTitulo();
                Optional<Pelicula> peliculaBuscadaPorTitulo = peliculaRepository.findByTitulo(titulo);
                if (peliculaBuscadaPorTitulo.isPresent() && !peliculaBuscadaPorTitulo.get().getId().equals(pelicula.getId())) {
                    throw new ResourceBadRequestException("Error. Ya existe una Pelicula con el mismo titulo");
                } else {
                    Set<Categoria> nuevasCategorias = categoriaService.guardarCategorias(pelicula.getCategorias());
                    Set<Fecha> nuevasFechas = fechaService.guardarFechas(pelicula.getFechas());

                    pelicula.setCategorias(nuevasCategorias);
                    pelicula.setFechas(nuevasFechas);
                    pelicula.setVigente(true);
                    return peliculaRepository.save(pelicula);
                }
            }
        } else{
            throw new ResourceNotFoundException("Error. La pelicula con id = " + pelicula.getId() + " no existe o ya no esta vigente");
        }
    }

    public void eliminarPelicula(Long id) throws ResourceNotFoundException {
        logger.warn("Borrando Pelicula con id = " + id);
        Optional<Pelicula> peliculaBuscada = peliculaRepository.findByIdAndVigente(id,true);
        if (peliculaBuscada.isPresent()){
            peliculaBuscada.get().setVigente(false);
            peliculaRepository.save(peliculaBuscada.get());
        }else{
            throw new ResourceNotFoundException("Error. No existe la Pelicula con id = " + id + " o no esta vigente");
        }
    }

    public Optional<Pelicula> buscarPeliculaPorTitulo(String titulo) throws ResourceNotFoundException {
        logger.info("Buscando Pelicula con titulo: " + titulo);
        Optional<Pelicula> peliculaBuscada = peliculaRepository.findByTituloAndVigente(titulo, true);
        if (peliculaBuscada.isPresent()){
            return peliculaBuscada;
        }
        else{
            throw new ResourceNotFoundException("Error. No existe la Pelicula con titulo: " + titulo + ".");
        }
    }

    public Optional<Pelicula> buscarPelicula(Long id) throws ResourceNotFoundException {
        logger.info("Buscando Pelicula con id = " + id);
        Optional<Pelicula> peliculaBuscada = peliculaRepository.findByIdAndVigente(id,true);
        if(peliculaBuscada.isPresent()){
            return peliculaBuscada;
        }
        else{
            throw new ResourceNotFoundException("Error. No existe la Pelicula con id = " + id + ".");
        }
    }

    public List<Pelicula> buscarPeliculasPorFecha(LocalDate fecha) throws ResourceNoContentException {
        logger.info("Buscando todas las Peliculas por fecha");
        List<Pelicula> todasLasPeliculas = peliculaRepository.findAllByVigenteTrue();
        List<Pelicula> peliculasEncontradas = new ArrayList<>();
        for (Pelicula pelicula : todasLasPeliculas) {
            for (Fecha fechaPelicula : pelicula.getFechas()) {
                if (fechaPelicula.getFecha().equals(fecha)) {
                    peliculasEncontradas.add(pelicula);
                    break;
                }
            }
        }
        if(peliculasEncontradas.size() > 0){
            return peliculasEncontradas;
        }else{
            throw new ResourceNoContentException("Error. No existen Peliculas registradas con categoria: " + fecha + ".");
        }
    }

    public List<Pelicula> buscarPeliculasPorCategoria(String categoria) throws ResourceNoContentException {
        logger.info("Buscando todas las Peliculas por categoria");
        List<Pelicula> todasLasPeliculas = peliculaRepository.findAllByVigenteTrue();
        List<Pelicula> peliculasEncontradas = new ArrayList<>();
        for (Pelicula pelicula : todasLasPeliculas) {
            for (Categoria categoriaPelicula : pelicula.getCategorias()) {
                if (categoriaPelicula.getCategoria().equals(categoria)) {
                    peliculasEncontradas.add(pelicula);
                    break;
                }
            }
        }
        if(peliculasEncontradas.size() > 0){
            return peliculasEncontradas;
        }else{
            throw new ResourceNoContentException("Error. No existen Peliculas registradas con categoria: " + categoria + ".");
        }
    }

    public List<Pelicula> buscarTodasPeliculas() throws ResourceNoContentException {
        logger.info("Buscando todas las Peliculas");
        List<Pelicula> lista = peliculaRepository.findAllByVigenteTrue();
        if(lista.size() > 0){
            return lista;
        }else{
            throw new ResourceNoContentException("Error. No existen Peliculas registradas.");
        }
    }

    public List<Pelicula> OchoPeliculasRandom() throws ResourceBadRequestException {
        logger.info("Creando lista de 8 Peliculas random");
        List<Pelicula> listaPeliculas = peliculaRepository.findAllByVigenteTrue();
        if(listaPeliculas.size() > 8){
            List<Pelicula> peliculasRandom = new ArrayList<>();
            int tamanoLista = listaPeliculas.size();
            Random random = new Random();
            while (peliculasRandom.size() < 8) {
                int indiceAleatorio = random.nextInt(tamanoLista);
                Pelicula peliculaAleatoria = listaPeliculas.get(indiceAleatorio);
                if(!peliculasRandom.contains(peliculaAleatoria)){
                    peliculasRandom.add(peliculaAleatoria);
                }
            }
            return peliculasRandom;
        }else{
            throw new ResourceBadRequestException("Error. Debe haber mas de 8 peliculas");
        }
    }

    public Page<Pelicula> paginacion(Pageable pageable){
        return peliculaRepository.findAllByVigenteTrue(pageable);
    }
}
