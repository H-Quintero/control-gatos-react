import { useState, useEffect } from "react";

import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";

import { generarID } from "./helpers";

import IconoNuevoGasto from "./assets/img/nuevo-gasto.svg";

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastos, setGastos] = useState([
    ...(JSON.parse(localStorage.getItem('gastos')) ?? [])
  ]);

  const [gastoEditar, setGastoEditar] = useState({});


  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0) {
      setModal(true);
      
  
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }

  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({})
    

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)

    setGastos(gastosActualizados)
  }

  const guardarGasto = (gasto) => {
    if(gasto.id) {
      const gastoActualizado = gastos.map( gastoState => gastoState.id === 
        gasto.id ? gasto : gastoState)

        setGastos(gastoActualizado)
        setGastoEditar({})
    } else {
      gasto.id = generarID();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);

    }

    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <ListadoGastos 
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
