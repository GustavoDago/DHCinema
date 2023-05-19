package com.example.PIBackEnd.service;

import com.example.PIBackEnd.domain.Categoria;
import com.example.PIBackEnd.repository.CategoriaRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashSet;
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
            Optional<Categoria> categoriaExistente = categoriaRepository.findByCategoria(categoria.getCategoria());
            if (categoriaExistente.isPresent()) {
                nuevasCategorias.add(categoriaExistente.get());
            } else {
                categoriaRepository.save(categoria);
                nuevasCategorias.add(categoria);
            }
        }
        return nuevasCategorias;
    }
}