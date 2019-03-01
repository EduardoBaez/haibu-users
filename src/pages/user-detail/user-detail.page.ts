import { Component, OnInit, Input } from '@angular/core'
import { ModalController, AlertController } from '@ionic/angular';
import { User } from '../../models/user'
import * as moment from 'moment'

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {
  @Input() user: User
  public statusRut: boolean
  public statusBirthdate: boolean
  public statusPhone: boolean
  public rutError: object
  public birthdateError: object
  public phoneError: object

  constructor(private _modalCtrl: ModalController, private _alertCtrl: AlertController) {
    this.statusRut = true
    this.statusBirthdate = true
    this.statusPhone = true
    this.rutError = { header: 'RUT', subHeader: 'Incorrecto', message: 'El RUT es incorrecto.', buttons: ['OK'] }
    this.birthdateError = { header: 'Fecha de Nacimiento', subHeader: 'Incorrecta', message: 'La fecha de nacimiento es incorrecta.', buttons: ['OK'] }
    this.phoneError = { header: 'Teléfono', subHeader: 'Incorrecto', message: 'El teléfono es incorrecto.', buttons: ['OK'] }
  }

  ngOnInit() {
    this.validateForm()
  }

  // Cerrar Modal
  goBack = () => {
    this._modalCtrl.dismiss()
  }

  // Funcion que agrupa todas las validaciones
  validateForm = () => {
    this.validateRut(this.user.rut)
    this.validateBirthdate(this.user.fechaNacimiento)
    this.validatePhone(this.user.telefono)
  }

  // Validar Teléfono
  validatePhone = (phone: number) => {
    const expCell = /^56+9{1}\d{8}/.test(phone.toString()) // Celular
    const expFix = /^56+2{1}\d{8}/.test(phone.toString()) // Fijo
    const expRegion = /^56+[34567]{1}[^69]{1}\d{8}/.test(phone.toString()) // Regiones

    if (expCell || expFix || expRegion) {
      this.statusPhone = true
    } else {
      this.statusPhone = false
      this.presentAlert(this.phoneError)
      return false
    }
  }

  // Validar Fecha de Nacimiento
  validateBirthdate = (birthdate: Date) => {
    const validDate = moment(birthdate, ['DD/MM/YYYY'], true ).isValid()
    if(!validDate){
      this.statusBirthdate = false
      this.presentAlert(this.birthdateError) 
      return false
    }
    
    this.statusBirthdate = true
  }

  // Validar RUT
  validateRut = (rut) => {
    // Despejar Puntos
    var valor = rut.replace('.', '')

    // Despejar Guión
    valor = valor.replace('-', '')

    // Aislar Cuerpo y Digito Verificador
    var cuerpo = valor.slice(0, -1)
    var dv = valor.slice(-1).toUpperCase()

    // Formatear RUN
    rut = cuerpo + '-' + dv

    // Si no cumple con el minimo ej. (n.nnn.nnn)
    if (cuerpo.length < 7) { this.statusRut = false; this.presentAlert(this.rutError); return false }

    // Calcular Digito Verificador
    var suma = 0
    var multiplo = 2

    // Para cada dígito del Cuerpo
    for (var i = 1; i <= cuerpo.length; i++) {
      // Obtener su Producto con el Múltiplo Correspondiente
      var index = multiplo * valor.charAt(cuerpo.length - i)

      // Sumar al Contador General
      suma = suma + index

      // Consolidar Multiplo dentro del rango [2,7]
      if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2 }
    }

    // Calcular Digito Verificador en base al Modulo 11
    var dvEsperado = 11 - (suma % 11)

    // Casos Especiales (0 y K)
    dv = (dv == 'K') ? 10 : dv
    dv = (dv == 0) ? 11 : dv

    // Validar que el Cuerpo coincide con su Dígito Verificador
    if (dvEsperado != dv) { this.statusRut = false; this.presentAlert(this.rutError); return false }

    // Si todo sale bien, decretar RUT válido
    this.statusRut = true

  }

  // Mostrar Alerta
  async presentAlert(options) {
    const alert = await this._alertCtrl.create(options);

    await alert.present();
  }

}