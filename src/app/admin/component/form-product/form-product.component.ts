import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.buildForm();
  }

  ngOnInit() {
  }

  private buildForm() {
    this.formulario = this.formBuilder.group({
      id: ['', [Validators.required]],
      title: ['',[Validators.required]],
      price: ['', [Validators.required]],
      image: '',
      description: ['',[Validators.required]]
    });
  }

}
