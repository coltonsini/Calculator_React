import { useReducer }  from "react"
import BotonDigito from "./BotonDigito"
import BotonOperacion from "./BotonOperacion"
import './index.css';

export const ACCIONES = {
  ADD_DIGITO: 'add-digito',
  ELEGIR_OPERACION: 'elegir-operacion',
  LIMPIAR: 'limpiar',
  BORRAR_DIGITO:'borrar-digito',
  EVALUAR: 'evaluar'
}

function reducer(estado, {type, payload}) {
  switch(type){
      case ACCIONES.ADD_DIGITO:
          if (estado.sobreescribir) {
              return {
                  ...estado,
                  operadorActual: payload.digito,
                  sobreescribir: false,
              }
          }
          if (payload.digito === "0" && estado.operadorActual === "0"){
              return estado
          }
          if (payload.digito === "." && estado.operadorActual === "."){
              return estado
          } 
      return {
          ...estado,
          operadorActual: `${estado.operadorActual || ""} ${payload.digito}`
      }
      case ACCIONES.ELEGIR_OPERACION:
          if(estado.operadorActual == null && estado.operadorAnterior == null){
              return estado
          }
          
          if(estado.operadorActual == null){
              return {
                  ...estado,
                  operacion: payload.operacion,
              }
          }

          if(estado.operadorAnterior == null){
              return{
                  ...estado,
                  operacion: payload.operacion,
                  operadorAnterior: estado.operadorActual,
                  operadorActual: null,
              }
          }

          return{
              ...estado,
              operadorAnterior: evaluar(estado),
              operacion: payload.operacion,
              operadorActual: null
          }
      case ACCIONES.LIMPIAR:
          return {}
      case ACCIONES.BORRAR_DIGITO:
          if (estado.sobreescribir) {
              return{
                  ...estado,
                  sobreescribir: false,
                  operadorActual: null
              }
          }
          if (estado.operadorActual == null) return estado
          if (estado.operadorActual.length === 1) {
              return { ...estado, operadorActual: null}
          }
          return{
              ...estado,
              operadorActual: estado.operadorActual.slice(0, -1),
          }
      case ACCIONES.EVALUAR:
          if(
              estado.operacion == null ||
              estado.operadorActual == null ||
              estado.operadorAnterior == null
          ) {
              return estado
          }

          return {
              ...estado,
              sobreescribir: true,
              operadorAnterior: null,
              operacion: null,
              operadorActual: evaluar(estado),
          }
  }
}

function evaluar ({ operadorActual, operadorAnterior, operacion}) {
  const previo = parseFloat(operadorAnterior)
  const actual = parseFloat(operadorActual)
  if (isNaN(previo) || isNaN(actual)) return ""
  let computacion = ""
  switch(operacion){
      case "+":
          computacion = previo + actual
      break
      case "-":
          computacion = previo - actual
      break
      case "*":
          computacion = previo * actual
      break
      case "/":
          computacion = previo / actual
      break
  }

  return computacion.toString()
}

const FORMATO_INTEGRAL = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

function Operacionformato(operador){
  if (operador == null) return 
  const [integral, decimal] = operador.split(".")
  if (decimal == null) return FORMATO_INTEGRAL.format(integral)
  return `${FORMATO_INTEGRAL.format(integral)}.${decimal}`
}

function App() {
  const [{operadorActual, operadorAnterior, operacion}, dispatch] = useReducer(reducer, {})
  // {Operacionformato(operadorAnterior)}
  // {Operacionformato(operadorActual)}
  return(
     <div className="grid-calculadora">
        <div className="salida">
            <div className="operador-anterior">{Operacionformato(operadorAnterior)}{operacion}</div>
            <div className='operador-actual'>{Operacionformato(operadorActual)}</div>          
        </div>
        <button className='span-two' onClick={() => dispatch({ type: ACCIONES.LIMPIAR})}>AC</button>
        <button onClick={() => dispatch({ type: ACCIONES.BORRAR_DIGITO})}>DEL</button>
        <BotonOperacion operacion="/" dispatch={dispatch}></BotonOperacion>
        <BotonDigito digito="1" dispatch={dispatch}></BotonDigito>
        <BotonDigito digito="2" dispatch={dispatch}></BotonDigito>
        <BotonDigito digito="3" dispatch={dispatch}></BotonDigito>
        <BotonOperacion operacion="*" dispatch={dispatch}></BotonOperacion>
        <BotonDigito digito="4" dispatch={dispatch}></BotonDigito>
        <BotonDigito digito="5" dispatch={dispatch}></BotonDigito>
        <BotonDigito digito="6" dispatch={dispatch}></BotonDigito>
        <BotonOperacion operacion="+" dispatch={dispatch}></BotonOperacion>
        <BotonDigito digito="7" dispatch={dispatch}></BotonDigito>
        <BotonDigito digito="8" dispatch={dispatch}></BotonDigito>
        <BotonDigito digito="9" dispatch={dispatch}></BotonDigito>
        <BotonOperacion operacion="-" dispatch={dispatch}></BotonOperacion>
        <BotonDigito digito="." dispatch={dispatch}></BotonDigito>
        <BotonDigito digito="0" dispatch={dispatch}></BotonDigito>
        <button className='span-two' onClick={() => dispatch({ type: ACCIONES.EVALUAR})}>=</button>
     </div>
  )
}

export default App;
