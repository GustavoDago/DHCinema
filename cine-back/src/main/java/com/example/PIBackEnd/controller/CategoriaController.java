package com.example.PIBackEnd.controller;

import com.example.PIBackEnd.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/categorias")
@CrossOrigin
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    //devolver todas las categorias

    //
}
