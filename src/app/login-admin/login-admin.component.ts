import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlarmasService } from '../services/Alarmas.service';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  rut: string = '';
  clave: string = '';
  mensaje: string = '';

  constructor(private alarmasService: AlarmasService, private router: Router) {}

  login() {
    this.alarmasService.verificarLoginAdmin(this.rut, this.clave).subscribe({
      next: (usuario) => {
        if (usuario && usuario.categoria === 'admin') {
          // Redirige al panel solo si es admin
          this.router.navigate(['/admin']);
        } else {
          this.mensaje = 'Acceso denegado: no eres administrador.';
        }
      },
      error: (error) => {
        if (error.status === 401) {
          this.mensaje = 'Credenciales incorrectas.';
        } else {
          this.mensaje = 'Error al conectar con el servidor.';
        }
      }
    });
  }
}
