package com.example.PIBackEnd.controller;

import com.example.PIBackEnd.dtos.FavoritoDTO;
import com.example.PIBackEnd.exceptions.ResourceBadRequestException;
import com.example.PIBackEnd.service.FavoritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/favoritos")
@CrossOrigin
public class FavoritoController {
    @Autowired
    private FavoritoService favoritoService;

    @PostMapping
    public ResponseEntity<FavoritoDTO> guardoFavorito(@RequestBody FavoritoDTO favorito) throws ResourceBadRequestException{
        return ResponseEntity.ok(favoritoService.guardarFavorito(favorito));
    }


    @PutMapping
    public ResponseEntity<FavoritoDTO> actualizoFavorito(@RequestBody FavoritoDTO favorito) throws ResourceBadRequestException{
        return ResponseEntity.ok(favoritoService.guardarFavorito(favorito));
    }
}
