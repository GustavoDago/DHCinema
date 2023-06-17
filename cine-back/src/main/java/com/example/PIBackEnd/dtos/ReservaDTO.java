package com.example.PIBackEnd.dtos;

public class ReservaDTO {

    private Long id;

    private Long usuario_id;

    private Long funcion_id;

    public Boolean chequearAtributosVacios(){
        return null == this.usuario_id || null == this.funcion_id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
