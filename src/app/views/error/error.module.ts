import { NgModule } from '@angular/core';
import { P404Component } from '../error/404.component';

// Angular

@NgModule({
  declarations: [P404Component],
  exports: [ P404Component ]
})
export class ErrorModule {}
