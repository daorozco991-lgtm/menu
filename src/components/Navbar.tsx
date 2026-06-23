import React, { useState, useEffect } from 'react';
import { menuData } from '../data';

interface NavbarProps {
  onLogout: () => void;
  onSelectOption: (option: string) => void;
}

export function Navbar({ onLogout, onSelectOption }: NavbarProps) {
  const [activeMenuIdx, setActiveMenuIdx] = useState<number | null>(null);
  const [activeSubIdx, setActiveSubIdx] = useState<number>(0);
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const opts: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      setDateStr(now.toLocaleDateString('es-CO', opts));
    };
    updateDate();
    const interval = setInterval(updateDate, 1000);
    return () => clearInterval(interval);
  }, []);

  const openPanel = (idx: number) => {
    if (activeMenuIdx !== idx) {
      setActiveSubIdx(0);
      setActiveMenuIdx(idx);
    }
  };

  const closePanel = () => {
    setActiveMenuIdx(null);
  };

  const activeData = activeMenuIdx !== null ? menuData[activeMenuIdx] : null;

  return (
    <div className="nav-root">
      <h2 className="sr-only" style={{ position: 'absolute', left: '-9999px' }}>Barra de navegación con menú desplegable simulado</h2>

      <div style={{ position: 'relative' }} onMouseLeave={closePanel}>
        <div className="menu-bar" id="menuBar">
          <div className="logo-block">
            <div className="logo-nexus">NEXUS</div>
            <div className="logo-core">CORE</div>
          </div>

          <ul className="nav-ul" id="navUl">
            {menuData.map((menu, idx) => (
              <li key={idx}>
                <a onMouseEnter={() => openPanel(idx)}>
                  {menu.title} <span className="chevron-icon">▼</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="welcome-section">
            <div className="welcome-row">
              <span className="welcome-text">Bienvenido Prueba | NEXUS</span>
              <div className="sep"></div>
              <span className="logout" onClick={onLogout} id="logoutBtn">SALIR</span>
            </div>
            <div className="date-text" id="dateEl">{dateStr}</div>
            <div className="city-text">MEDELLÍN</div>
          </div>
        </div>

        <div className={`groups-panel ${activeMenuIdx !== null ? 'open' : ''}`} id="groupsPanel">
          {activeData && (
            <div className="groups-inner">
              <div className="title-col">
                <div className="title-menu-label">Menú</div>
                <div className="title-item-label" id="panelTitle">{activeData.title}</div>
              </div>
              <div className="vsep"></div>
              <div className="menu-col" id="menuCol">
                <div className="group-label">{activeData.group}</div>
                {activeData.items.map((item, i) => (
                  <div
                    key={i}
                    className={`menu-item-row ${i === activeSubIdx ? 'active' : ''}`}
                    onMouseEnter={() => setActiveSubIdx(i)}
                  >
                    {item} <span className="arrow">▼</span>
                  </div>
                ))}
              </div>
              
              <div className="sub-col" id="subCol1">
                {activeData.subs[0] && activeData.subs[0].length > 0 && (
                  <>
                    <div className="sub-col-title">Acciones</div>
                    {activeData.subs[0].map((sub, j) => (
                      <div 
                        key={j} 
                        className="sub-item"
                        onClick={() => {
                          onSelectOption(sub);
                          closePanel();
                        }}
                      >
                        {sub}
                      </div>
                    ))}
                  </>
                )}
              </div>
              
              <div className="sub-col" id="subCol2">
                {activeData.subs[1] && activeData.subs[1].length > 0 && (
                  <>
                    <div className="sub-col-title">Consultas</div>
                    {activeData.subs[1].map((sub, j) => (
                      <div 
                        key={j} 
                        className="sub-item"
                        onClick={() => {
                          onSelectOption(sub);
                          closePanel();
                        }}
                      >
                        {sub}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
