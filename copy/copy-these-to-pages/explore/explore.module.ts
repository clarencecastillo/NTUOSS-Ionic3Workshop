import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExplorePage } from './explore';
import { SwingModule } from "angular2-swing/dist";
import { AnimatorModule } from "css-animator";

@NgModule({
  declarations: [
    ExplorePage,
  ],
  imports: [
    SwingModule,
    AnimatorModule,
    IonicPageModule.forChild(ExplorePage),
  ],
})
export class ExplorePageModule {}
