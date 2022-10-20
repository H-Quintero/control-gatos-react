import { useEffect, useState } from "react";

const ControlPresupuestos = ({ presupuesto, gastos }) => {
  

  const [ disponible, setDisponible ] = useState(0);
  const [ gastado, setGastado ] = useState(0)

  useEffect(() =>{
    const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidadGasto + total, 0)
    const totalDisponible = presupuesto - totalGastado

    setGastado(totalGastado)
    setDisponible(totalDisponible)
  }, [gastos])


  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("es-Es", {
      style: "currency",
      currency: "EUR",
    });
  };

  return (
    <div className="contenedor contenedor-presupuesto sombra dos-columnas">
      <div>Gráfica Aqui</div>
      <div className="contenido-presupuesto">
        <p>
          <span>Presupuesto:</span> {""}
          {formatearCantidad(presupuesto)}
        </p>
        <p>
          <span>Disponible:</span> {""}{formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado:</span> {""}{formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuestos;
