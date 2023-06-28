package com.example.PIBackEnd.dtos;

public class ReservaDTO {

    private Long id;

    private String nombre;

    private String apellido;

    private String dni;

    private String email;

    private Long usuario_id;

    private Long funcion_id;

    public Boolean chequearAtributosVacios(){
        return null == this.nombre || null == this.apellido || null == this.dni || null == this.email || null == this.usuario_id || null == this.funcion_id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getUsuario_id() {
        return usuario_id;
    }

    public void setUsuario_id(Long usuario_id) {
        this.usuario_id = usuario_id;
    }

    public Long getFuncion_id() {
        return funcion_id;
    }

    public void setFuncion_id(Long funcion_id) {
        this.funcion_id = funcion_id;
    }
}
