package com.example.PIBackEnd.service;

import com.example.PIBackEnd.domain.Categoria;
import com.example.PIBackEnd.exceptions.CategoriaExistenteException;
import com.example.PIBackEnd.exceptions.ResourceNoContentException;
import com.example.PIBackEnd.repository.CategoriaRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CategoriaService {

    private final static Logger logger = Logger.getLogger(CategoriaService.class);
    private CategoriaRepository categoriaRepository;

    @Autowired
    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public Set<Categoria> guardarCategorias(Set<Categoria> categorias) {
        logger.info("Guardando Categoria nueva");
        Set<Categoria> nuevasCategorias = new HashSet<>();
        for (Categoria categoria : categorias) {
            Optional<Categoria> categoriaExistente = categoriaRepository.findByTitulo(categoria.getTitulo());
            if (categoriaExistente.isPresent()) {
                nuevasCategorias.add(categoriaExistente.get());
            } else {
                categoriaRepository.save(categoria);
                nuevasCategorias.add(categoria);
            }
        }
        return nuevasCategorias;
    }

    public Categoria guardarCategoria(Categoria categoria) throws CategoriaExistenteException {
        logger.info("Guardando Categoria nueva");
        Optional<Categoria> optionalCategoria = categoriaRepository.findByTitulo(categoria.getTitulo());
        if (optionalCategoria.isPresent()){
            throw new CategoriaExistenteException("La categoría ya existe en la base de datos");
        } else {
            return categoriaRepository.save(categoria);
        }
    }

    public List<Categoria> buscarTodasCategorias() throws ResourceNoContentException {
        logger.info("Buscando todas las Categorías");
        List<Categoria> lista = categoriaRepository.findAll();
        if(lista.size() > 0){
            return lista;
        }else{
            throw new ResourceNoContentException("Error. No existen categorías registradas.");
        }
    }
}