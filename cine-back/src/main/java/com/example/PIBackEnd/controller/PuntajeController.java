package com.example.PIBackEnd.controller;

import com.example.PIBackEnd.domain.Pelicula;
import com.example.PIBackEnd.domain.Puntaje;
import com.example.PIBackEnd.dtos.PuntajeDTO;
import com.example.PIBackEnd.exceptions.ResourceBadRequestException;
import com.example.PIBackEnd.exceptions.ResourceNoContentException;
import com.example.PIBackEnd.service.PuntajeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/puntajes")
@CrossOrigin
public class PuntajeController {
    @Autowired
    private PuntajeService puntajeService;

    @PostMapping
    public ResponseEntity<PuntajeDTO> guardarPuntaje(@RequestBody PuntajeDTO puntaje) throws ResourceBadRequestException {
        return ResponseEntity.ok(puntajeService.guardarPuntaje(puntaje));
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Puntaje>> buscarPuntajeDePelicula(@PathVariable Long id) throws ResourceNoContentException {
        return ResponseEntity.ok(puntajeService.devolverPuntajes(id));
    }
}
