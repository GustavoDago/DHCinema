package com.example.PIBackEnd.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "caracteristicas")
public class Caracteristica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 10)
    private String sala;

    @Column(nullable = false, length = 5)
    private String modalidad;

    @Column(nullable = false, length = 150)
    private String reparto;

    @Column(nullable = false, length = 5)
    private String duracion;

    @Column(nullable = false, length = 30)
    private String clasificacion;

    @Column(nullable = false, length = 40)
    private String opcionesIdioma;

    @Column(nullable = false, length = 25)
    private String director;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getReparto() {
        return reparto;
    }

    public void setReparto(String reparto) {
        this.reparto = reparto;
    }

    public String getDuracion() {
        return duracion;
    }

    public void setDuracion(String duracion) {
        this.duracion = duracion;
    }

    public String getClasificacion() {
        return clasificacion;
    }

    public void setClasificacion(String clasificacion) {
        this.clasificacion = clasificacion;
    }

    public String getOpcionesIdioma() {
        return opcionesIdioma;
    }

    public void setOpcionesIdioma(String opcionesIdioma) {
        this.opcionesIdioma = opcionesIdioma;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }
}
