package com.example.PIBackEnd.controller;

import com.example.PIBackEnd.domain.Reserva;
import com.example.PIBackEnd.dtos.ReservaDTO;
import com.example.PIBackEnd.exceptions.ResourceBadRequestException;
import com.example.PIBackEnd.exceptions.ResourceNoContentException;
import com.example.PIBackEnd.exceptions.ResourceNotFoundException;
import com.example.PIBackEnd.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/reservas")
@CrossOrigin
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @PostMapping
    public ResponseEntity<ReservaDTO> guardarReserva(@RequestBody ReservaDTO reserva) throws ResourceBadRequestException {
        return ResponseEntity.ok(reservaService.guardarReserva(reserva));
    }

    @GetMapping
    public ResponseEntity<List<Reserva>> buscarTodasReservas() throws ResourceNoContentException {
        return ResponseEntity.ok(reservaService.buscarTodasReservas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reserva> buscarReservaPorId(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(reservaService.buscarReservaPorId(id));
    }

    @GetMapping("/usuario/{email}")
    public ResponseEntity<List<Reserva>> buscarTodasReservasPorUsuario(@PathVariable String email) throws ResourceNoContentException {
        return ResponseEntity.ok(reservaService.buscarTodasReservasPorUsuario(email));
    }
}
