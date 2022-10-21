import React, { useEffect, useState } from 'react'

import Mensaje from './Mensaje'

import CerrarBtn from '../assets/img/cerrar.svg'

const Modal = ({ 
  setModal, 
  animarModal, 
  setAnimarModal, 
  guardarGasto,
  gastoEditar 
}) => {

  const [ mensaje, setMensaje ] = useState('')

  const [ nombreGasto, setNombreGasto ] = useState('')
  const [ cantidadGasto, setCantidadGasto ] = useState('')
  const [ categoria, setCategoria ] = useState('')

  const [ id, setID ] = useState('')
  const [ fecha, setFecha ] = useState('')

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0) {
      setNombreGasto(gastoEditar.nombreGasto)
      setCantidadGasto(gastoEditar.cantidadGasto)
      setCategoria(gastoEditar.categoria)
      setID(gastoEditar.id)
      setFecha(gastoEditar.fecha)
    }
  }, [])

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

    guardarGasto({ nombreGasto, cantidadGasto, categoria, id, fecha })
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

      <legend>
        {gastoEditar.nombreGasto ? 'Editar Gasto' : 'Nuevo Gasto'}
      </legend>

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
          step='any'
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
        value={gastoEditar.nombreGasto ? 'Guardar Cambios' : 'Nuevo Gasto'}
      />
    </form>

    </div>
  )
}

export default Modal