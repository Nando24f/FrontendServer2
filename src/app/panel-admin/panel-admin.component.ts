import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlarmasService } from '../services/Alarmas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent {
  // Login
  rut: string = '';
  clave: string = '';
  categoria: string = 'usuario';

  // Datos personales
  nombre: string = '';
  direccion: string = '';
  email: string = '';
  telefono: string = '';
  contactoNombre: string = '';
  contactoDireccion: string = '';
  contactoEmail: string = '';
  contactoTelefono: string = '';

  mensajeLogin: string = '';
  mensajeDatos: string = '';

  constructor(private alarmasService: AlarmasService,private router: Router) {}

  crearUsuarioLogin() {
    this.alarmasService.crearUsuarioLogin(this.rut, this.clave, this.categoria).subscribe({
      next: () => {
        this.mensajeLogin = '✅ Usuario creado correctamente.';
      },
      error: () => {
        this.mensajeLogin = '❌ No se pudo crear el usuario (¿RUT duplicado?).';
      }
    });
  }

  agregarDatosUsuario() {
    this.alarmasService.crearUsuarioDatos(
      this.nombre, this.rut, this.direccion, this.email, this.telefono,
      this.contactoNombre, this.contactoDireccion, this.contactoEmail, this.contactoTelefono
    ).subscribe({
      next: () => {
        this.mensajeDatos = '✅ Datos personales guardados correctamente.';
        this.limpiarFormularioDatos();
      },
      error: () => {
        this.mensajeDatos = '❌ Error al guardar los datos personales.';
      }
    });
  }

  limpiarFormularioDatos() {
    this.nombre = '';
    this.direccion = '';
    this.email = '';
    this.telefono = '';
    this.contactoNombre = '';
    this.contactoDireccion = '';
    this.contactoEmail = '';
    this.contactoTelefono = '';
  }
   cerrarSesion() {
    localStorage.removeItem('adminAutenticado');
    this.router.navigate(['/login']);
  }
}
