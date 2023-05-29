package com.example.PIBackEnd.controller;

import com.example.PIBackEnd.domain.Categoria;
import com.example.PIBackEnd.exceptions.CategoriaExistenteException;
import com.example.PIBackEnd.exceptions.ResourceBadRequestException;
import com.example.PIBackEnd.exceptions.ResourceNoContentException;
import com.example.PIBackEnd.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
@CrossOrigin
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @PostMapping
    public ResponseEntity<Categoria> guardarCategoria(@RequestBody Categoria categoria) throws ResourceBadRequestException, CategoriaExistenteException {
        return ResponseEntity.ok(categoriaService.guardarCategoria(categoria));
    }

    @GetMapping
    public ResponseEntity<List<Categoria>> buscarTodasCategorias() throws ResourceNoContentException {
        return ResponseEntity.ok(categoriaService.buscarTodasCategorias());
    }

}
