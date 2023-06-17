package com.example.PIBackEnd.service;

import com.example.PIBackEnd.domain.*;
import com.example.PIBackEnd.dtos.ReservaDTO;
import com.example.PIBackEnd.exceptions.ResourceBadRequestException;
import com.example.PIBackEnd.exceptions.ResourceNoContentException;
import com.example.PIBackEnd.exceptions.ResourceNotFoundException;
import com.example.PIBackEnd.repository.*;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    private final static Logger logger = Logger.getLogger(ReservaService.class);

    private IReservaRepository reservaRepository;

    private IFuncionRepository funcionRepository;

    private IPeliculaRepository peliculaRepository;

    private IUsuarioRepository usuarioRepository;

    private ISalaRepository salaRepository;

    @Autowired
    public ReservaService(IReservaRepository reservaRepository, IFuncionRepository funcionRepository, IPeliculaRepository peliculaRepository, IUsuarioRepository usuarioRepository, ISalaRepository salaRepository) {
        this.reservaRepository = reservaRepository;
        this.funcionRepository = funcionRepository;
        this.peliculaRepository = peliculaRepository;
        this.usuarioRepository = usuarioRepository;
        this.salaRepository = salaRepository;
    }

    public ReservaDTO guardarReserva(ReservaDTO reserva) throws ResourceBadRequestException {
        logger.info("Guardando Reserva nueva");
        if (reserva.chequearAtributosVacios()) {
            throw new ResourceBadRequestException("Error. La Reserva tiene que contener todos sus campos");
        }else{
            Optional<Usuario> optionalUsuario = usuarioRepository.findByIdAndActivoTrue(reserva.getUsuario_id());
            if(optionalUsuario.isEmpty()){
                throw new ResourceBadRequestException("Error. No se encontró el Usuario con ID: " + reserva.getUsuario_id());
            }
            Optional<Funcion> optionalFuncion = funcionRepository.findByIdAndVigente(reserva.getFuncion_id(), true);
            if(optionalFuncion.isEmpty()){
                throw new ResourceBadRequestException("Error. No se encontró la Funcion con ID: " + reserva.getFuncion_id());
            }
            return convertirReservaaReservaDTO(reservaRepository.save(convertirReservaDTOaReserva(reserva)));
        }
    }

    public Reserva buscarReservaPorId(Long id) throws ResourceNotFoundException {
        logger.info("Buscando Reserva con ID: " + id);
        Optional<Reserva> reservaBuscada = reservaRepository.findById(id);
        if(reservaBuscada.isPresent()){
            return reservaBuscada.get();
        }
        else{
            throw new ResourceNotFoundException("Error. No existe la Reserva con ID = " + id + ".");
        }
    }

    public List<Reserva> buscarTodasReservas() throws ResourceNoContentException {
        logger.info("Buscando todas las Reservas");
        List<Reserva> lista = reservaRepository.findAllByVigenteTrue();
        if(lista.size() > 0){
            return lista;
        }else{
            throw new ResourceNoContentException("Error. No existen Reservas registradas.");
        }
    }

    public List<Reserva> buscarTodasReservasPorUsuario(String email) throws ResourceNoContentException {
        logger.info("Buscando todas las Reservas para Usuario: " + email);
        List<Reserva> lista = reservaRepository.findAllByVigenteTrueAndUsuarioEmail(email);
        List<Reserva> nuevaLista = new ArrayList<>();
        LocalDate fechaActual = LocalDate.now();
        LocalTime horaActual = LocalTime.now();
        for (Reserva reserva:lista) {
            if (reserva.getFechaProyeccion().isAfter(fechaActual) || (reserva.getFechaProyeccion().isEqual(fechaActual) && reserva.getHoraProyeccion().isAfter(horaActual))) {
                nuevaLista.add(reserva);
            }else{
                reserva.setVigente(false);
                reservaRepository.save(reserva);
            }
        }
        if(nuevaLista.size() < 1){
            throw new ResourceNoContentException("Error. No existen Reservas vigentes registradas para el Usuario: " + email);
        }
        return nuevaLista;
    }

    private Reserva convertirReservaDTOaReserva(ReservaDTO reservaDTO){
        Reserva reserva = new Reserva();

        Optional<Funcion> func = funcionRepository.findById(reservaDTO.getFuncion_id());
        Optional<Pelicula> pelicula = peliculaRepository.findById(func.get().getPelicula().getId());
        Optional<Usuario> usuario = usuarioRepository.findById(reservaDTO.getUsuario_id());
        Optional<Sala> sala = salaRepository.findById(func.get().getSala().getId());

        reserva.setId(reservaDTO.getId());
        reserva.setModalidad(func.get().getModalidad());
        reserva.setFechaProyeccion(func.get().getFechaProyeccion());
        reserva.setHoraProyeccion(func.get().getHoraProyeccion());
        reserva.setOpcionesIdioma(func.get().getOpcionesIdioma());
        reserva.setUsuarioEmail(usuario.get().getEmail());
        reserva.setPeliculaNombre(pelicula.get().getTitulo());
        reserva.setSala(sala.get().getNombre());
        reserva.setVigente(true);

        reserva.setUsuario(usuario.get());
        reserva.setFuncion(func.get());

        return reserva;
    }

    private ReservaDTO convertirReservaaReservaDTO(Reserva reserva){
        ReservaDTO reservaDTO = new ReservaDTO();

        reservaDTO.setId(reserva.getId());
        reservaDTO.setUsuario_id(reserva.getUsuario().getId());
        reservaDTO.setFuncion_id(reserva.getFuncion().getId());

        return reservaDTO;
    }
}