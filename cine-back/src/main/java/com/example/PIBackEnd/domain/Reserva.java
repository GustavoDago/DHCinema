package com.example.PIBackEnd.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "reservas")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String peliculaNombre;

    @Column
    private String usuarioEmail;

    @Column
    private LocalDate fechaProyeccion;

    @Column
    private LocalTime horaProyeccion;

    @Column
    private String sala;

    @Column
    private String modalidad;

    @Column
    private String opcionesIdioma;

    @Column
    private Boolean vigente;


    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "funcion_id", referencedColumnName = "id")
    private Funcion funcion;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    private Usuario usuario;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPeliculaNombre() {
        return peliculaNombre;
    }

    public void setPeliculaNombre(String peliculaNombre) {
        this.peliculaNombre = peliculaNombre;
    }

    public String getUsuarioEmail() {
        return usuarioEmail;
    }

    public void setUsuarioEmail(String usuarioEmail) {
        this.usuarioEmail = usuarioEmail;
    }

    public LocalDate getFechaProyeccion() {
        return fechaProyeccion;
    }

    public void setFechaProyeccion(LocalDate fechaProyeccion) {
        this.fechaProyeccion = fechaProyeccion;
    }

    public LocalTime getHoraProyeccion() {
        return horaProyeccion;
    }

    public void setHoraProyeccion(LocalTime horaProyeccion) {
        this.horaProyeccion = horaProyeccion;
    }

    public String getSala() {
        return sala;
    }

    public void setSala(String sala) {
        this.sala = sala;
    }

    public String getModalidad() {
        return modalidad;
    }

    public void setModalidad(String modalidad) {
        this.modalidad = modalidad;
    }

    public String getOpcionesIdioma() {
        return opcionesIdioma;
    }

    public void setOpcionesIdioma(String opcionesIdioma) {
        this.opcionesIdioma = opcionesIdioma;
    }

    public Funcion getFuncion() {
        return funcion;
    }

    public void setFuncion(Funcion funcion) {
        this.funcion = funcion;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Boolean getVigente() {
        return vigente;
    }

    public void setVigente(Boolean vigente) {
        this.vigente = vigente;
    }
}