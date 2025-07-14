import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlarmasService } from '../services/Alarmas.service';

@Component({
  selector: 'app-panel-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent {
  // Campos de usuarios_login
  rut: string = '';
  clave: string = '';
  categoria: string = 'usuario'; // valor por defecto
  categoriasDisponibles: string[] = ['usuario', 'admin']; // lista para el select

  // Campos de usuarios_datos
  nombre: string = '';
  direccion: string = '';
  email: string = '';
  telefono: string = '';

  // Contacto de emergencia
  contactoNombre: string = '';
  contactoDireccion: string = '';
  contactoEmail: string = '';
  contactoTelefono: string = '';

  mensaje: string = '';

  constructor(private alarmasService: AlarmasService) {}

  crearUsuario() {
    // Paso 1: crear usuario login
    this.alarmasService.crearUsuarioLogin(this.rut, this.clave, this.categoria).subscribe({
      next: () => {
        // Paso 2: crear datos personales
        this.alarmasService.crearUsuarioDatos(
          this.nombre, this.rut, this.direccion, this.email, this.telefono,
          this.contactoNombre, this.contactoDireccion, this.contactoEmail, this.contactoTelefono
        ).subscribe({
          next: () => {
            this.mensaje = '✅ Usuario creado correctamente.';
            this.limpiarFormulario();
          },
          error: () => {
            this.mensaje = '❌ Error al guardar los datos personales.';
          }
        });
      },
      error: () => {
        this.mensaje = '❌ No se pudo crear el usuario (¿RUT duplicado?).';
      }
    });
  }

  limpiarFormulario() {
    this.rut = '';
    this.clave = '';
    this.categoria = 'usuario';
    this.nombre = '';
    this.direccion = '';
    this.email = '';
    this.telefono = '';
    this.contactoNombre = '';
    this.contactoDireccion = '';
    this.contactoEmail = '';
    this.contactoTelefono = '';
  }
}
