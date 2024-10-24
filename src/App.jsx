import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBlock, createBlockchain } from './scripts/blockchain.js';

function App() {
  const [valor, setValor] = useState('');
  const [creador, setCreador] = useState('');
  const [notas, setNotas] = useState('');
  const [blockchain, setBlockchain] = useState(null);

  useEffect(() => {
    const data = createBlockchain(2);
    setBlockchain(data);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (blockchain) {
      const newBlock = createBlock(
        blockchain.getLastIndex(),
        creador,
        new Date().toString(),
        valor,
        blockchain.getLatestHash()
      );

      blockchain.addBlock(newBlock);

      setBlockchain({ ...blockchain });
      console.log(blockchain);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
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

        <div className="col-md-6">
          <h2>Datos de la Cadena de Bloques</h2>
          <div className="p-3 border bg-light">
            {blockchain && blockchain.chain.length > 0 ? (
              blockchain.chain.map((block, index) => (
                <div key={index} className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Bloque {block.index}</h5>
                    <p><strong>Data:</strong> {block.data}</p>
                    <p><strong>Date:</strong> {block.date}</p>
                    <p><strong>Hash:</strong> {block.hash}</p>
                    <p><strong>Nonce:</strong> {block.nonce}</p>
                    <p><strong>Previous Hash:</strong> {block.previousHash}</p>
                    <p><strong>Transaction Worker:</strong> {block.transactionWorker}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay bloques disponibles.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
