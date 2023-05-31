package com.example.PIBackEnd.domain;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "peliculas")
public class Pelicula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String titulo;

    @Column(nullable = false, length = 500)
    private String trailer;

    @Column(nullable = false, length = 500)
    private String portada;

    @Column(nullable = false, length = 500)
    private String banner;

    @Column(nullable = false, length = 1000)
    private String descripcion;

    @Column(nullable = false)
    private Boolean vigente;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "caracteristica_id",referencedColumnName = "id", nullable = false)
    private Caracteristica caracteristicas;

    @OneToMany(mappedBy = "pelicula", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Imagen> imagenes = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "pelicula_categoria",
            joinColumns = { @JoinColumn(name = "pelicula_id") },
            inverseJoinColumns = { @JoinColumn(name = "categoria_id") }
    )
    private Set<Categoria> categorias = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "pelicula_fecha",
            joinColumns = { @JoinColumn(name = "pelicula_id") },
            inverseJoinColumns = { @JoinColumn(name = "fecha_id") }
    )
    private Set<Fecha> fechas = new HashSet<>();

    public Boolean chequearAtributosVacios(){
        return null == this.titulo || null == this.descripcion || this.imagenes.isEmpty() || this.categorias.isEmpty() || this.fechas.isEmpty() || null == this.portada || null == this.trailer || null == this.banner;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public void agregarCategoria(Categoria categoria){
        categorias.add(categoria);
    }

    public Set<Categoria> getCategorias() {
        return categorias;
    }

    public void setCategorias(Set<Categoria> categorias) {
        this.categorias = categorias;
    }

    public Set<Fecha> getFechas() {
        return fechas;
    }

    public void setFechas(Set<Fecha> fechas) {
        this.fechas = fechas;
    }

    public Boolean getVigente() {
        return vigente;
    }

    public void setVigente(Boolean vigente) {
        this.vigente = vigente;
    }

    public Set<Imagen> getImagenes() {
        return imagenes;
    }

    public void setImagenes(Set<Imagen> imagenes) {
        this.imagenes = imagenes;
    }

    public Caracteristica getCaracteristicas() {
        return caracteristicas;
    }

    public void setCaracteristicas(Caracteristica caracteristicas) {
        this.caracteristicas = caracteristicas;
    }

    public String getTrailer() {
        return trailer;
    }

    public void setTrailer(String trailer) {
        this.trailer = trailer;
    }

    public String getPortada() {
        return portada;
    }

    public void setPortada(String portada) {
        this.portada = portada;
    }

    public String getBanner() {
        return banner;
    }

    public void setBanner(String banner) {
        this.banner = banner;
    }
}
