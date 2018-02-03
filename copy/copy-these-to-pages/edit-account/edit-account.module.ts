import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditAccountPage } from './edit-account';

@NgModule({
  declarations: [
    EditAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(EditAccountPage),
  ],
})
export class EditAccountPageModule {}
