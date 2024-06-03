import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  nombre: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router, private alertController: AlertController) { }

  async signup() {
    if (!this.validateEmail(this.email)) {
      console.log('Correo electrónico inválido');
      await this.presentAlert('Correo electrónico inválido');
      return;
    }

    console.log('Creando Cuenta con:', this.nombre, this.email, this.password);

    // Redirigir al usuario a la página de inicio después del registro
    this.router.navigate(['/home']);
  }

  validateEmail(email: string): boolean {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
