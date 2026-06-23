import React, { useState } from 'react';
import { Navbar } from './Navbar';

interface DashboardProps {
  onLogout: () => void;
}

const getIframeContent = (title: string) => `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      *, *::before, *::after {
        box-sizing: border-box;
      }
      html, body {
        margin: 0;
        padding: 0;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        padding: 32px;
        background-color: #ffffff;
        color: #333;
      }
      .header {
        border-bottom: 1px solid #eaeaea;
        padding-bottom: 16px;
        margin-bottom: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      h2 {
        font-size: 20px;
        color: #191d22;
        margin: 0;
      }
      .badge {
        background: #fddf6a;
        color: #191d22;
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
      }
      p {
        color: #666;
        font-size: 14px;
        margin-bottom: 24px;
        line-height: 1.5;
      }
      .table-container {
        border: 1px solid #eaeaea;
        border-radius: 6px;
        overflow: hidden;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
      }
      th, td {
        padding: 12px 16px;
        border-bottom: 1px solid #eaeaea;
        font-size: 13px;
      }
      th {
        background: #f9fafb;
        font-weight: 600;
        color: #4b5563;
      }
      td {
        color: #1f2937;
      }
      tr:last-child td {
        border-bottom: none;
      }
      .action-btn {
        background: #f3f4f6;
        border: 1px solid #e5e7eb;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 11px;
        cursor: pointer;
        color: #374151;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h2>${title}</h2>
      <span class="badge">Módulo Activo</span>
    </div>
    <p>Esta es una vista simulada cargada dentro de un iframe para el módulo de <strong>${title}</strong>. Aquí se mostraría la interfaz real del sistema correspondiente a esta sección.</p>
    
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID Registro</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#NX-1042</td>
            <td>23 Jun 2026</td>
            <td>Pendiente</td>
            <td><button class="action-btn">Revisar</button></td>
          </tr>
          <tr>
            <td>#NX-1041</td>
            <td>22 Jun 2026</td>
            <td>Completado</td>
            <td><button class="action-btn">Ver Detalle</button></td>
          </tr>
          <tr>
            <td>#NX-1040</td>
            <td>21 Jun 2026</td>
            <td>En Proceso</td>
            <td><button class="action-btn">Gestionar</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
  </html>
`;

export function Dashboard({ onLogout }: DashboardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div className="dashboard-root">
      <Navbar onLogout={onLogout} onSelectOption={setSelectedOption} />
      <main className="main-content">
        {!selectedOption ? (
          <>
            <h1 className="main-title">Panel Principal</h1>
            <div className="dashboard-card">
              <p>Bienvenido al sistema de información operacional nacional CORE.</p>
              <p style={{ fontSize: '14px' }}>Utiliza el menú superior para navegar por las diferentes opciones del sistema.</p>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <h1 className="main-title">{selectedOption}</h1>
            <div className="dashboard-iframe-container">
              <iframe 
                srcDoc={getIframeContent(selectedOption)}
                className="dashboard-iframe"
                title={selectedOption}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
