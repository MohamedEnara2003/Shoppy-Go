import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { FileUpload } from 'primeng/fileupload';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PasswordModule } from 'primeng/password';
import { BadgeModule } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';
import { Checkbox } from 'primeng/checkbox';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { InputMaskModule } from 'primeng/inputmask';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AccordionModule } from 'primeng/accordion';

const Imports = [
  CommonModule,
  RouterLink,
  RouterModule,
  ReactiveFormsModule,
  FormsModule,
  NgxSliderModule,
  
  // PrimeNG Modules
  InputIconModule,
  IconFieldModule,
  InputTextModule,
  FloatLabelModule,
  ButtonModule,
  CardModule,
  TableModule,
  ToastModule,
  ConfirmDialogModule,
  DialogModule,
  DropdownModule,
  InputNumberModule,
  RatingModule,
  RippleModule,
  ToolbarModule,
  TagModule,
  AutoCompleteModule,
  CheckboxModule,
  SelectModule,
  FileUpload,
  ConfirmPopupModule,
  ProgressSpinnerModule,
  PasswordModule,
  BadgeModule,
  DividerModule,
  Checkbox,
  InputMaskModule,
  RadioButtonModule,
  AccordionModule
];

@NgModule({
  declarations: [],
  imports: [...Imports],
  exports: [...Imports]
})
export class SharedModule { }
