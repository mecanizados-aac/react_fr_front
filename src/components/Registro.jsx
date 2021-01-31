import React, { useState } from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'

export default function Registro() {

     const [nombre, setNombre] = useState('')
     const [correo, setCorreo] = useState('')
     const [contrasena, setContrasena] = useState('')

     const registro = async (e) => {
          e.preventDefault ( )
          const usuario = {nombre, correo, contrasena}
          const respuesta = await Axios.post('http://localhost:4000/lider/crear', usuario) 
          const mensaje = respuesta.data.mensaje
          if(mensaje!=='Bienvenido'){
               Swal.fire({
                    icon: 'error',
                    title: mensaje,
                    showConfirmButton: false,
                    timer: 2500
               })
          } else {
               const token = respuesta.data.token
               const nombre = respuesta.data.nombre
               const idUsuario = respuesta.data.id

               sessionStorage.setItem('token', token)
               sessionStorage.setItem('nombre', nombre)
               sessionStorage.setItem('idUsuario', idUsuario)

               window.location.href='/index'
          }
     }

     return (
          <div className="container pt-5">
             <div className="row">
                 <div className="col-md-6 mx-auto">
                      <div className="card">
                         <div className="container text-center fa-5x">
                              <i className="fas fa-user-plus"></i>
                         </div> 
                         <div className="card-header text-center">
                              <h4>Registrar Lider</h4>
                         </div> 
                         <div className="card-body">
                              <form onSubmit={registro}>
                                   <div className="form-group">
                                        <label>Nombre</label>
                                        <input type="text" className="form-control" autoFocus required onChange={(e) => setNombre(e.target.value)}/>
                                   </div>
                                   <div className="form-group">
                                        <label>Correo</label>
                                        <input type="email" className="form-control" required onChange={(e) => setCorreo(e.target.value)}/>
                                   </div>
                                   <div className="form-group">
                                        <label>Contraseña</label>
                                        <input type="password" className="form-control" required onChange={(e) => setContrasena(e.target.value)}/>
                                   </div>
                                   <input type="submit" className="btn btn-dark btn-block"></input>    
                              </form> 
                         </div>         
                      </div>
                 </div>      
             </div>
        </div>
     )
}
