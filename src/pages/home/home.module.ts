import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

// Modules
import { IonicModule } from '@ionic/angular';
import { UserDetailPageModule } from '../user-detail/user-detail.module';

// Pages
import { HomePage } from './home.page';
import { UserDetailPage } from '../user-detail/user-detail.page';

// Pipes
import { SearchUserByNamePipe  } from '../../pipes/search-user-by-name/search-user-by-name.pipe'
import { SegmentUserByActivePipe  } from '../../pipes/segment-user-by-active/segment-user-by-active.pipe'

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  entryComponents: [
    UserDetailPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    UserDetailPageModule
  ],
  declarations: [
    HomePage,
    SearchUserByNamePipe,
    SegmentUserByActivePipe
  ],
  exports: [
    SearchUserByNamePipe,
    SegmentUserByActivePipe
  ]
})
export class HomePageModule {}
