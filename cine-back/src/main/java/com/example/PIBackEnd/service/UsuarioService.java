package com.example.PIBackEnd.service;

import com.example.PIBackEnd.domain.Rol;
import com.example.PIBackEnd.domain.Usuario;
import com.example.PIBackEnd.dtos.DtoRegistro;
import com.example.PIBackEnd.exceptions.ResourceBadRequestException;
import com.example.PIBackEnd.repository.IRolesRepository;
import com.example.PIBackEnd.repository.IUsuariosRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Collections;

@Service
public class UsuarioService {

    private PasswordEncoder passwordEncoder;
    private IRolesRepository rolesRepository;
    private IUsuariosRepository usuariosRepository;

    public UsuarioService(PasswordEncoder passwordEncoder, IRolesRepository rolesRepository, IUsuariosRepository usuariosRepository) {
        this.passwordEncoder = passwordEncoder;
        this.rolesRepository = rolesRepository;
        this.usuariosRepository = usuariosRepository;
    }

    public String guardarUsuario(DtoRegistro dtoRegistro) throws ResourceBadRequestException {
        if (usuariosRepository.existsByEmail(dtoRegistro.getEmail())) {
            throw new ResourceBadRequestException("Error. Ya existe una Usuario con el mismo email");
        }
        Usuario usuarios = new Usuario();
        usuarios.setNombre(dtoRegistro.getNombre());
        usuarios.setApellido(dtoRegistro.getApellido());
        usuarios.setEmail(dtoRegistro.getEmail());
        usuarios.setPassword(passwordEncoder.encode(dtoRegistro.getPassword()));
        Rol roles = rolesRepository.findByNombre("USER").get();
        usuarios.setRoles(Collections.singletonList(roles));
        usuariosRepository.save(usuarios);
        return "Registro de usuario exitoso";
    }

    public String guardarUsuarioAdm(DtoRegistro dtoRegistro) throws ResourceBadRequestException {
        if (usuariosRepository.existsByEmail(dtoRegistro.getNombre())) {
            throw new ResourceBadRequestException("Error. Ya existe una Usuario Admin con el mismo email");
        }
        Usuario usuarios = new Usuario();
        usuarios.setNombre(dtoRegistro.getNombre());
        usuarios.setApellido(dtoRegistro.getApellido());
        usuarios.setEmail(dtoRegistro.getEmail());
        usuarios.setPassword(passwordEncoder.encode(dtoRegistro.getPassword()));
        Rol roles = rolesRepository.findByNombre("ADMIN").get();
        usuarios.setRoles(Collections.singletonList(roles));
        usuariosRepository.save(usuarios);
        return "Registro de admin exitoso";
    }
}
