package com.example.PIBackEnd.controller;

import com.example.PIBackEnd.domain.Pelicula;
import com.example.PIBackEnd.exceptions.ResourceBadRequestException;
import com.example.PIBackEnd.exceptions.ResourceNoContentException;
import com.example.PIBackEnd.exceptions.ResourceNotFoundException;
import com.example.PIBackEnd.service.PeliculaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/peliculas")
@CrossOrigin(origins = "http://localhost:5173")
public class PeliculaController {

    @Autowired
    private PeliculaService peliculaService;

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarPelicula(@PathVariable Long id) throws ResourceNotFoundException {
        peliculaService.eliminarPelicula(id);
        return ResponseEntity.ok("Eliminación de la Pelicula con id = " + id + " con éxito");
    }

    @PostMapping
    public ResponseEntity<Pelicula> guardarPelicula(@RequestBody Pelicula pelicula) throws ResourceBadRequestException {
        return ResponseEntity.ok(peliculaService.guardarPelicula(pelicula));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pelicula> buscarPelicula(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(peliculaService.buscarPelicula(id).get());
    }

    @GetMapping("/titulo/{titulo}")
    public ResponseEntity<Pelicula> buscarPeliculaPorTitulo(@PathVariable String titulo) throws ResourceNotFoundException {
        return ResponseEntity.ok(peliculaService.buscarPeliculaPorTitulo(titulo).get());
    }

    @GetMapping
    public ResponseEntity<List<Pelicula>> buscarTodasPeliculas() throws ResourceNoContentException {
        return ResponseEntity.ok(peliculaService.buscarTodasPeliculas());
    }

    @GetMapping("/fecha/{fechaString}")
    public ResponseEntity<List<Pelicula>> buscarPeliculasPorFecha(@PathVariable String fechaString) throws ResourceNoContentException {
        LocalDate fecha = LocalDate.parse(fechaString);
        return ResponseEntity.ok(peliculaService.buscarPeliculasPorFecha(fecha));
    }

    @PutMapping
    public ResponseEntity<Pelicula> actualizarPelicula(@RequestBody Pelicula pelicula) throws ResourceBadRequestException, ResourceNotFoundException {
        return ResponseEntity.ok(peliculaService.actualizarPelicula(pelicula));
    }

    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<Pelicula>> buscarPeliculasPorCategoria(@PathVariable String categoria) throws ResourceNoContentException {
        return ResponseEntity.ok(peliculaService.buscarPeliculasPorCategoria(categoria));
    }

    @GetMapping("/random")
    public ResponseEntity<List<Pelicula>> OchoPeliculasRandom() throws ResourceBadRequestException {
        return ResponseEntity.ok(peliculaService.OchoPeliculasRandom());
    }

    @GetMapping("/pagina/{pagina}")
    public ResponseEntity<Page<Pelicula>> paginacion(@PathVariable Integer pagina){
        return ResponseEntity.ok(peliculaService.paginacion(PageRequest.of(pagina,10)));
    }
}
