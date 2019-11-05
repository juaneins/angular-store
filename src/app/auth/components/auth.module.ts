import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
