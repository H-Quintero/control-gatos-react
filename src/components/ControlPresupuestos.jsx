import { useEffect, useState } from "react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuestos = ({
    presupuesto,
    setPresupuesto,
    gastos,
    setGastos,
    setIsValidPresupuesto
  }) => {


  const [porcentaje, setPorcentaje] = useState(0);

  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidadGasto + total,
      0
    );
    const totalDisponible = presupuesto - totalGastado;

    //Calcular porcentaje

    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);

    setGastado(totalGastado);
    setDisponible(totalDisponible);

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 800);
  }, [gastos]);

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("es-Es", {
      style: "currency",
      currency: "EUR",
    });
  };

  const handleResetApp = () => {
    const resultado = confirm('¿Seguro que quieres resetear la APP?')

    if(resultado) {
      setGastos([])
      setPresupuesto(0)
      setIsValidPresupuesto(false)
    } 
  }

  return (
    <div className="contenedor contenedor-presupuesto sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 90 ? "#DC2226" : "#3b82f6",
            trailColor: "#f5f5f5",
            textColor: porcentaje > 90 ? "#DC2226" : "#3b82f6",
          })}
          value={porcentaje}
          text={`${porcentaje} % Gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        
        <button 
          className="reset-app"
          type="button"
          onClick={handleResetApp}
          >
          Resetear APP
        </button>
        <p>
          <span>Presupuesto:</span> {""}
          {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""} `}>
          <span>Disponible:</span> {""}
          {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado:</span> {""}
          {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuestos;
