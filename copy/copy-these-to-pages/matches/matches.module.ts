import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatchesPage } from './matches';

@NgModule({
  declarations: [
    MatchesPage,
  ],
  imports: [
    IonicPageModule.forChild(MatchesPage),
  ],
})
export class MatchesPageModule {}
