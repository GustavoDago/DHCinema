package com.example.PIBackEnd.service;

import com.example.PIBackEnd.domain.Rol;
import com.example.PIBackEnd.domain.Usuario;
import com.example.PIBackEnd.dtos.DtoRegistro;
import com.example.PIBackEnd.exceptions.ResourceBadRequestException;
import com.example.PIBackEnd.exceptions.ResourceNoContentException;
import com.example.PIBackEnd.exceptions.ResourceNotFoundException;
import com.example.PIBackEnd.repository.IRolRepository;
import com.example.PIBackEnd.repository.IUsuarioRepository;
import org.apache.log4j.Logger;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final static Logger logger = Logger.getLogger(UsuarioService.class);
    private PasswordEncoder passwordEncoder;
    private IRolRepository rolesRepository;
    private IUsuarioRepository usuarioRepository;

    public UsuarioService(PasswordEncoder passwordEncoder, IRolRepository rolesRepository, IUsuarioRepository usuariosRepository) {
        this.passwordEncoder = passwordEncoder;
        this.rolesRepository = rolesRepository;
        this.usuarioRepository = usuariosRepository;
    }

    public String guardarUsuario(DtoRegistro dtoRegistro) throws ResourceBadRequestException {
        logger.info("Guardando Usuario USER nuevo");
        if (usuarioRepository.existsByEmail(dtoRegistro.getEmail())) {
            throw new ResourceBadRequestException("Error. Ya existe una Usuario con el mismo email");
        }
        Usuario usuarios = new Usuario();
        usuarios.setNombre(dtoRegistro.getNombre());
        usuarios.setApellido(dtoRegistro.getApellido());
        usuarios.setEmail(dtoRegistro.getEmail());
        usuarios.setPassword(passwordEncoder.encode(dtoRegistro.getPassword()));
        Optional<Rol> roles = rolesRepository.findByNombre("USER");
        if(roles.isPresent()){
            usuarios.setRoles(Collections.singletonList(roles.get()));
            usuarioRepository.save(usuarios);
            return "Registro de usuario exitoso";
        }else{
            throw new ResourceBadRequestException("Error. Debe existir Rol USER");
        }
    }

    public String guardarUsuarioAdm(DtoRegistro dtoRegistro) throws ResourceBadRequestException {
        logger.info("Guardando Usuario ADMIN nuevo");
        if (usuarioRepository.existsByEmail(dtoRegistro.getNombre())) {
            throw new ResourceBadRequestException("Error. Ya existe una Usuario Admin con el mismo email");
        }
        Usuario usuarios = new Usuario();
        usuarios.setNombre(dtoRegistro.getNombre());
        usuarios.setApellido(dtoRegistro.getApellido());
        usuarios.setEmail(dtoRegistro.getEmail());
        usuarios.setPassword(passwordEncoder.encode(dtoRegistro.getPassword()));
        Optional<Rol> roles = rolesRepository.findByNombre("ADMIN");
        if(roles.isPresent()){
            usuarios.setRoles(Collections.singletonList(roles.get()));
            usuarioRepository.save(usuarios);
            return "Registro de admin exitoso";
        }else{
            throw new ResourceBadRequestException("Error. Debe existir Rol ADMIN");
        }
    }

    public void asignarRoles(String email, List<Rol> roles) throws ResourceBadRequestException {
        logger.info("Asignando Roles nuevos a Usuario con email = " + email);
        Optional<Usuario> optionalUsuario = usuarioRepository.findByEmail(email);
        if(optionalUsuario.isPresent()){
            Usuario usuario = optionalUsuario.get();
            List<Rol> rolesNuevos = new ArrayList<>();
            for (Rol rol : roles) {
                Optional<Rol> rolBuscado = rolesRepository.findByNombre(rol.getNombre());
                if (rolBuscado.isPresent()) {
                    if (!rolesNuevos.contains(rolBuscado.get())) {
                        rolesNuevos.add(rolBuscado.get());
                    } else {
                        throw new ResourceBadRequestException("Error. El Rol con nombre '" + rol.getNombre() + "' no debe repetirse.");
                    }
                } else {
                    throw new ResourceBadRequestException("Error. El Rol con nombre '" + rol.getNombre() + "' debe existir para ser asignado.");
                }
            }
            usuario.setRoles(rolesNuevos);
            usuarioRepository.save(usuario);
        }else{
            throw new ResourceBadRequestException("Error. El Usuario con email '" + email + "' no existe");
        }
    }

    public Usuario buscarUsuarioPorEmail(String email) throws ResourceNotFoundException {
        logger.info("Buscando Usuario con email: " + email);
        Optional<Usuario> usuarioBuscado = usuarioRepository.findByEmail(email);
        if(usuarioBuscado.isPresent()){
            return usuarioBuscado.get();
        }
        else{
            throw new ResourceNotFoundException("Error. No existe el Usuario con email = " + email + ".");
        }
    }

    public List<Usuario> buscarTodosUsuarios() throws ResourceNoContentException {
        logger.info("Buscando todos los Usuarios");
        List<Usuario> lista = usuarioRepository.findAll();
        if(lista.size() > 0){
            return lista;
        }else{
            throw new ResourceNoContentException("Error. No existen Usuarios registrados.");
        }
    }

    public void eliminarUsuario(String email) throws ResourceNotFoundException {
        logger.warn("Borrando Usuario con email = " + email);
        Optional<Usuario> usuarioBuscado = usuarioRepository.findByEmail(email);
        if (usuarioBuscado.isPresent()){
            usuarioRepository.deleteById(usuarioBuscado.get().getId());
        }else{
            throw new ResourceNotFoundException("Error. No existe el Usuario con email = " + email);
        }
    }
}
