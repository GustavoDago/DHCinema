package com.example.PIBackEnd.service;

import com.example.PIBackEnd.domain.Fecha;
import com.example.PIBackEnd.exceptions.ResourceBadRequestException;
import com.example.PIBackEnd.repository.IFechaRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class FechaService {

    private final static Logger logger = Logger.getLogger(FechaService.class);
    private IFechaRepository fechaRepository;

    @Autowired
    public FechaService(IFechaRepository fechaRepository) {
        this.fechaRepository = fechaRepository;
    }

    public Set<Fecha> guardarFechas(Set<Fecha> fechas) throws ResourceBadRequestException {
        logger.info("Guardando Fecha nueva");
        Set<Fecha> nuevasFechas = new HashSet<>();
        LocalDate fechaHoy = LocalDate.now();
        int fechasChequeadas = 0;
        for (Fecha fechaChequear : fechas) {
            if (fechaChequear.getFecha().isBefore(fechaHoy)) {
                fechasChequeadas++;
            }
        }
        if (fechasChequeadas > 0) {
            throw new ResourceBadRequestException("Error. Las Fechas deben ser posteriores a " + fechaHoy);
        } else {
            for (Fecha fecha : fechas) {
                Optional<Fecha> fechaExistente = fechaRepository.findByFecha(fecha.getFecha());
                if (fechaExistente.isPresent()) {
                    nuevasFechas.add(fechaExistente.get());
                } else {
                    fechaRepository.save(fecha);
                    nuevasFechas.add(fecha);
                }
            }
            return nuevasFechas;
        }
    }
}