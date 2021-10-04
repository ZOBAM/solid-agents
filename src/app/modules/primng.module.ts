import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';

const PrimeNG = [ButtonModule];

@NgModule({
  imports: [PrimeNG],
  exports: [PrimeNG],
})
export class PrimeModule {}
