import React from 'react'

const BloquePoliticas = ({policys}) => {
  return (
    <div className='bloquePoliticas'>
        <div className='politicas1'><div>
              <h3>Normas de la sala</h3>
              <p>Se prohíbe el ingreso de alimentos y bebidas adquiridos externamente. 
                  Ofrecemos una amplia variedad de opciones en nuestras concesiones para su disfrute durante la función.
                  Mantenemos un ambiente limpio y seguro para todos los espectadores. 
                  Pedimos a nuestros clientes que depositen la basura en los contenedores designados.
                  Respetamos el derecho de todos a disfrutar de la película. 
                  Solicitamos que los dispositivos electrónicos se apaguen o pongan en modo silencioso durante la proyección.
                  </p>
          </div>
          
        </div>
        <div className='politicas2'>
          <div>
              <h3>Salud y seguridad</h3>
              <p>
              La seguridad de nuestros clientes es primordial. Se realizarán inspecciones de seguridad aleatorias antes del ingreso a las salas de cine.
              Pedimos a los espectadores que respeten las medidas de distanciamiento físico establecidas. 
              Las filas y asientos estarán marcados para facilitar el distanciamiento.
              El uso de mascarillas es obligatorio en nuestras instalaciones en todo momento, excepto al momento de consumir alimentos y bebidas en su asiento designado.
              </p>
          </div>
        </div>
        <div className='politicas3'>
          <div>
              <h3>Política de cancelación</h3>
              <p>
              Las entradas compradas son no reembolsables. 
              Sin embargo, ofrecemos cambios de horario o reasignación de asientos en caso de disponibilidad
              y previo aviso con al menos 24 horas de anticipación.
              En caso de cancelación de una función por motivos técnicos u otros imprevistos, 
              se brindará la opción de reembolso total o cambio de entradas para una función futura.
              Las cancelaciones de eventos especiales están sujetas a políticas específicas que serán comunicadas al momento de la compra.
              </p>
          </div>
        </div>
        
        
    </div>
    
    
  )
}

export default BloquePoliticas