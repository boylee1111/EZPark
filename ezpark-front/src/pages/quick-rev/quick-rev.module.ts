import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuickRevPage } from './quick-rev';

@NgModule({
  declarations: [
    QuickRevPage,
  ],
  imports: [
    IonicPageModule.forChild(QuickRevPage),
  ],
})
export class QuickRevPageModule {}
