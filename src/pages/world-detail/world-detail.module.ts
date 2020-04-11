import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorldDetailPage } from './world-detail';

@NgModule({
  declarations: [
    WorldDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(WorldDetailPage),
  ],
})
export class WorldDetailPageModule {}
