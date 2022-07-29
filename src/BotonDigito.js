import { ACCIONES } from './App'

export default function BotonDigito({ dispatch, digito}) {
    return (
        <button
        onClick={() => dispatch({type: ACCIONES.ADD_DIGITO, payload: {digito} })}
       >
        {digito}
       
       </button>
    )
  
    
}