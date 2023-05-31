package com.example.PIBackEnd.service;

import com.example.PIBackEnd.domain.Rol;
import com.example.PIBackEnd.exceptions.ResourceBadRequestException;
import com.example.PIBackEnd.exceptions.ResourceNoContentException;
import com.example.PIBackEnd.exceptions.ResourceNotFoundException;
import com.example.PIBackEnd.repository.IRolRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RolService {

    private final static Logger logger = Logger.getLogger(RolService.class);
    private IRolRepository rolesRepository;

    @Autowired
    public RolService(IRolRepository rolesRepository) {
        this.rolesRepository = rolesRepository;
    }

    public Rol guardarRol(Rol rol) throws ResourceBadRequestException {
        logger.info("Guardando Rol nuevo");
        Optional<Rol> optionalRol = rolesRepository.findByNombre(rol.getNombre());
        if(optionalRol.isPresent()){
            throw new ResourceBadRequestException("Error. Ya existe Rol con nombre: " + rol.getNombre());
        }else{
            return rolesRepository.save(rol);
        }
    }

    public List<Rol> buscarTodosRoles() throws ResourceNoContentException {
        logger.info("Buscando todos los Roles");
        List<Rol> lista = rolesRepository.findAll();
        if(lista.size() > 0){
            return lista;
        }else{
            throw new ResourceNoContentException("Error. No existen Peliculas registradas.");
        }
    }

    public Rol buscarRolPorNombre(String nombre) throws ResourceNotFoundException {
        logger.info("Buscando Rol con nombre: " + nombre);
        Optional<Rol> rolBuscado = rolesRepository.findByNombre(nombre);
        if(rolBuscado.isPresent()){
            return rolBuscado.get();
        }
        else{
            throw new ResourceNotFoundException("Error. No existe el Rol con nombre = " + nombre + ".");
        }
    }

    public void eliminarRol(String nombre) throws ResourceNotFoundException {
        logger.warn("Borrando Rol con nombre = " + nombre);
        Optional<Rol> rolBuscado = rolesRepository.findByNombre(nombre);
        if (rolBuscado.isPresent()){
            rolesRepository.deleteById(rolBuscado.get().getId());
        }else{
            throw new ResourceNotFoundException("Error. No existe el Rol con nombre = " + nombre);
        }
    }
}
