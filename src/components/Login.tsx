import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: () => void;
}

export function Login({ onLoginSuccess }: LoginProps) {
  const [user, setUser] = useState('prueba');
  const [pass, setPass] = useState('1234');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [forgotPass, setForgotPass] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = () => {
    setErrorMsg('');
    setForgotPass(false);
    
    if (!user || !pass) {
      setErrorMsg('Por favor completa todos los campos.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      
      if (user === 'prueba' && pass === '1234') {
        setSuccess(true);
        setTimeout(() => {
          onLoginSuccess();
        }, 1000);
      } else {
        setErrorMsg('Usuario o contraseña incorrectos.');
        setPass('');
      }
    }, 1400);
  };

  const handleForgot = () => {
    setErrorMsg('');
    setForgotPass(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-root">
        <h2 style={{ position: 'absolute', left: '-9999px' }}>Pantalla de inicio de sesión NEXUS CORE</h2>

        <div className="login-left">
          <div className="brand-nexus">NEXUS</div>
          <div className="brand-core">CORE</div>
          <p className="brand-tagline">Sistema de información<br />operacional nacional</p>
        </div>

        <div className="login-divider"></div>

        <div className="login-right">
          <div><span className="env-badge">Producción</span></div>
          <p className="login-title">Acceso al sistema</p>
          <p className="login-heading">Iniciar sesión</p>

          {!success ? (
            <div>
              {(errorMsg || forgotPass) && (
                <div 
                  className="error-msg" 
                  style={forgotPass ? { color: '#fddf6a', borderColor: 'rgba(253,223,106,0.25)', background: 'rgba(253,223,106,0.08)' } : {}}
                >
                  <AlertCircle size={16} color={forgotPass ? '#fddf6a' : '#f56b6b'} />
                  <span>
                    {forgotPass 
                      ? 'Contacta al administrador del sistema para restablecer tu contraseña.' 
                      : errorMsg}
                  </span>
                </div>
              )}

              <div className="field-wrap">
                <label className="field-label" htmlFor="userInput">Usuario</label>
                <input 
                  className="login-input" 
                  id="userInput" 
                  type="text" 
                  placeholder="Ej. jperez@nexus.com.co" 
                  autoComplete="username"
                  value={"prueba"}
                  onChange={(e) => {
                    setUser(e.target.value);
                    setErrorMsg('');
                    setForgotPass(false);
                  }}
                  onKeyDown={handleKeyDown}
                />
                <div className="field-icon" style={{ pointerEvents: 'none' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
              </div>

              <div className="field-wrap">
                <label className="field-label" htmlFor="passInput">Contraseña</label>
                <input 
                  className="login-input" 
                  id="passInput" 
                  type={showPass ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  autoComplete="current-password"
                  value={"1234"}
                  onChange={(e) => {
                    setPass(e.target.value);
                    setErrorMsg('');
                    setForgotPass(false);
                  }}
                  onKeyDown={handleKeyDown}
                />
                <div className="field-icon" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </div>
              </div>

              <div className="forgot-link" onClick={handleForgot}>¿Olvidaste tu contraseña?</div>

              <button 
                className="login-btn" 
                onClick={handleLogin}
                disabled={loading}
              >
                {loading && <div className="spinner"></div>}
                <span>{loading ? 'VERIFICANDO...' : 'INGRESAR'}</span>
              </button>
            </div>
          ) : (
            <div className="success-msg">
              <div className="success-icon"><Check color="#fddf6a" size={22} /></div>
              <p style={{ color: '#fff', fontSize: '14px', margin: 0 }}>Sesión iniciada correctamente</p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: 0 }}>Redirigiendo al sistema...</p>
            </div>
          )}

          <p className="footer-note">NEXUS © 2026 — Uso exclusivo interno</p>
        </div>
      </div>
    </div>
  );
}

