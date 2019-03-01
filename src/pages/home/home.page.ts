import { Component, OnInit, ViewChild } from '@angular/core'
import { ModalController, IonSegment } from '@ionic/angular'
import { UserService } from '../../services/user/user.service'
import { UserDetailPage } from '../user-detail/user-detail.page';
import { User } from '../../models/user'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  public users: User[]
  public searchItem: string
  public active: number
  public loading: boolean
  @ViewChild(IonSegment) segment: IonSegment

  constructor(private _userService: UserService, private _modalCtrl: ModalController) {
    this.searchItem = null
    this.active = 100
    this.loading = true
  }

  ngOnInit() {
    this.segment.value = '100'
    this.getUsers()
  }

  // Recupera la Data desde servicio y lo ordena por apellido
  getUsers = async () => await this._userService.getUsers().subscribe(
    res => {
      res.sort((a, b) => a.apellido.localeCompare(b.apellido))
      this.users = res
      this.loading = false
    })

  // Escuchar cambios en componente Segment
  segmentChanged = (event: any) => {
    const { value } = event.detail
    this.active = parseInt(value)
  }

  // Abrir modal con el detalle del usuario
  goToUserDetail = async (user) => {
    const modal = await this._modalCtrl.create({
      component: UserDetailPage,
      componentProps: { user }
    })
    await modal.present()
  }

}
