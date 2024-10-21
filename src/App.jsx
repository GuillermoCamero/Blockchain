import React, { useState, useEffect } from 'react';

function App() {
  const [valor, setValor] = useState('');
  const [creador, setCreador] = useState('');
  const [notas, setNotas] = useState('');
  const [backendData, setBackendData] = useState('');

  // Simulación de una función que obtiene datos del backend
  const fetchBackendData = () => {
    return "Este es un mensaje del backend.";
  };

  useEffect(() => {
    // Obtener los datos del backend al cargar la aplicación
    const data = fetchBackendData();
    setBackendData(data);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías manejar el envío de datos a un backend
    console.log('Valor:', valor);
    console.log('Creador:', creador);
    console.log('Notas:', notas);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Sección del Formulario */}
        <div className="col-md-6">
          <h2>Ingresar Datos</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Valor</label>
              <input
                type="text"
                className="form-control"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Creador</label>
              <input
                type="text"
                className="form-control"
                value={creador}
                onChange={(e) => setCreador(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Notas</label>
              <textarea
                className="form-control"
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Enviar</button>
          </form>
        </div>

        {/* Sección de la Función del Backend */}
        <div className="col-md-6">
          <h2>Función del Backend</h2>
          <div className="p-3 border bg-light">
            <p>{backendData}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
