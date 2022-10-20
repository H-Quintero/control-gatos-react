import React, { useState } from 'react'

import Mensaje from './Mensaje'

import CerrarBtn from '../assets/img/cerrar.svg'

const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto }) => {

  const [ mensaje, setMensaje ] = useState('')

  const [ nombreGasto, setNombreGasto ] = useState('')
  const [ cantidadGasto, setCantidadGasto ] = useState('')
  const [ categoria, setCategoria ] = useState('')

  const ocultarModal = () => {    
    setAnimarModal(false)

    setTimeout(() => {
      setModal(false)
    }, 500)
  }

  const handleSubmit = e => {
    e.preventDefault()

    if([ nombreGasto, cantidadGasto, categoria ].includes('') ){
      setMensaje('Todos los campos son obligatorios')

      setTimeout(() => {
        setMensaje('')
      }, 2000)
      return
    }

    guardarGasto({ nombreGasto, cantidadGasto, categoria })
  }

  return (
    <div className='modal'>
      <div className='cerrar-modal'>
        <img 
          src={CerrarBtn}
          alt='icono cerrar'
          onClick={ocultarModal}
        />
      </div>
    
    <form 
      onSubmit={handleSubmit}
      className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}>

      <legend>Nuevo Gasto</legend>

      {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
      
      <div className='campo'>
        <label htmlFor='nombre'>Nombre</label>
        <input 
          id='nombre'
          type='text'
          placeholder='Añade nombre de gasto'
          value={nombreGasto}
          onChange={e => setNombreGasto(e.target.value)}
        />
      </div>
      <div className='campo'>
        <label htmlFor='cantidad'>Cantidad </label>
        <input 
          id='cantidad'
          type='number'
          placeholder='Añade cantidad de gasto'
          value={cantidadGasto}
          onChange={e => setCantidadGasto(Number(e.target.value))}
        />
      </div>
      <div className='campo'>
        <label htmlFor='categoria'>Categoría</label>
        <select 
          id='categoria'
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
        >
          <option value=''>-- Seleccione una Categoria --</option>
          <option value='ahorro'>Ahorro</option>
          <option value='comida'>Comida</option>
          <option value='casa'>Casa</option>
          <option value='gastos'>Gastos Varios</option>
          <option value='ocio'>Ocio</option>
          <option value='salud'>Salud</option>
          <option value='suscriciones'>Suscripciones</option>
        </select>
      </div>

      <input 
        type='submit'
        value='Añadir Gasto'
      />
    </form>

    </div>
  )
}

export default Modal