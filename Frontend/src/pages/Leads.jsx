import React from 'react';
import '../style/style-costumer/Leads.css';

const Leads = () => {
    const items = [
        {
          nombre: "Alberto Martinez",
          inmueble: "Título proyecto/inmueble",
          codigo: "854-4549-024",
          fechaIngreso: "22/10/2024",
        },
        {
          nombre: "Laura Mora",
          inmueble: "Título proyecto/inmueble",
          codigo: "854-4549-025",
          fechaIngreso: "22/10/2024",
        },
      ];
    
      return (
        <>
        <div className="leads">
        <h1>LEADS</h1>
            {/* <div className="mine-container-leads"> */}
            <div className="leads-container">
      
          {/* Vista de escritorio */}
          <div className="leads-table-container hidden lg:block">
            <table className="leads-table">
              <thead>
                <tr className="leads-table-header">
                  <th className="leads-th">Nombre</th>
                  <th className="leads-th">Nombre Inmueble</th>
                  <th className="leads-th">Código</th>
                  <th className="leads-th">Fecha de ingreso</th>
                  <th className="leads-th"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="leads-tr">
                    <td className="leads-td">{item.nombre}</td>
                    <td className="leads-td">{item.inmueble}</td>
                    <td className="leads-td">{item.codigo}</td>
                    <td className="leads-td">{item.fechaIngreso}</td>
                    <td className="leads-td">
                      <button className="leads-button">Ver información completa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    
          {/* Vista móvil */}
          <div className="leads-mobile-container lg:hidden">
            {items.map((item, index) => (
              <div
                key={index}
                className="leads-card"
              >
                <h3 className="leads-card-title">{item.nombre}</h3>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
                    <div>
                        <p><span className="leads-card-label">Nombre Inmueble: </span></p>
                        <p><span className="leads-card-label">Código: </span></p>
                        <p><span className="leads-card-label">Fecha de ingreso: </span></p>
                    
                    
                    
                    </div>
                    <div>
                    <p className="leads-card-text">
                  {item.inmueble}
                </p>
                <p className="leads-card-text">
                  
                  {item.codigo}
                </p>
                <p className="leads-card-text">
                 
                 {item.fechaIngreso}
               </p>
                    </div>
                </div>



                <button className="leads-card-button">Ver información completa</button>
              </div>
            ))}
          </div>
        </div>
            </div>
        
        {/* </div> */}
        </>
       
      );
    };
export default Leads;