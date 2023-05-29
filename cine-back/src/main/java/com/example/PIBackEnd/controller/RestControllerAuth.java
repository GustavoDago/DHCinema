package com.example.PIBackEnd.controller;

import com.example.PIBackEnd.dtos.DtoAuthRespuesta;
import com.example.PIBackEnd.dtos.DtoLogin;
import com.example.PIBackEnd.dtos.DtoRegistro;
import com.example.PIBackEnd.exceptions.ResourceBadRequestException;
import com.example.PIBackEnd.security.JwtGenerador;
import com.example.PIBackEnd.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/")
public class RestControllerAuth {

    private AuthenticationManager authenticationManager;
    private JwtGenerador jwtGenerador;
    private UsuarioService usuarioService;

    @Autowired
    public RestControllerAuth(AuthenticationManager authenticationManager, JwtGenerador jwtGenerador, UsuarioService usuarioService) {
        this.authenticationManager = authenticationManager;
        this.jwtGenerador = jwtGenerador;
        this.usuarioService = usuarioService;
    }

    @PostMapping("register")
    public ResponseEntity<String> guardarUsuario(@RequestBody DtoRegistro dtoRegistro) throws ResourceBadRequestException {
        return ResponseEntity.ok(usuarioService.guardarUsuario(dtoRegistro));
    }

    @PostMapping("registerAdm")
    public ResponseEntity<String> guardarUsuarioAdm(@RequestBody DtoRegistro dtoRegistro) throws ResourceBadRequestException {
        return ResponseEntity.ok(usuarioService.guardarUsuarioAdm(dtoRegistro));
    }

    @PostMapping("login")
    public ResponseEntity<DtoAuthRespuesta> login(@RequestBody DtoLogin dtoLogin) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                dtoLogin.getEmail(), dtoLogin.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerador.generarToken(authentication);
        return new ResponseEntity<>(new DtoAuthRespuesta(token), HttpStatus.OK);
    }
}
