package com.example.PIBackEnd.service;

import com.example.PIBackEnd.domain.Rol;
import com.example.PIBackEnd.exceptions.ResourceBadRequestException;
import com.example.PIBackEnd.repository.IRolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RolService {

    private IRolesRepository rolesRepository;

    @Autowired
    public RolService(IRolesRepository rolesRepository) {
        this.rolesRepository = rolesRepository;
    }

    public Rol guardarRol(Rol rol) throws ResourceBadRequestException {
        Optional<Rol> optionalRol = rolesRepository.findByNombre(rol.getNombre());
        if(optionalRol.isPresent()){
            throw new ResourceBadRequestException("Error. Ya existe Rol con nombre: " + rol.getNombre());
        }else{
            return rolesRepository.save(rol);
        }
    }
}
