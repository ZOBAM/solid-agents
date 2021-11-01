import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SliderModule } from 'primeng/slider';
import { InputNumberModule } from 'primeng/inputnumber';

const PrimeNG = [
  ButtonModule,
  CarouselModule,
  ConfirmPopupModule,
  DropdownModule,
  ToastModule,
  InputTextModule,
  RadioButtonModule,
  CheckboxModule,
  InputTextareaModule,
  SliderModule,
  InputNumberModule,
];

@NgModule({
  imports: [PrimeNG],
  exports: [PrimeNG],
})
export class PrimeModule {}
