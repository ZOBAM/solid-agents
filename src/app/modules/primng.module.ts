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
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';

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
  TabViewModule,
  TableModule,
];

@NgModule({
  imports: [PrimeNG],
  exports: [PrimeNG],
})
export class PrimeModule {}
