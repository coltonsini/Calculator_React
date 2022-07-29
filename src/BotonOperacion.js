import { ACCIONES } from './App'

export default function BotonOperacion({ dispatch, operacion}) {
    return (
        <button
        onClick={() => dispatch({type: ACCIONES.ELEGIR_OPERACION, payload: {operacion} })}
       >
        {operacion}
       
       </button>
    )
  
    
}