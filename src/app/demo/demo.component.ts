import { Component, OnInit } from '@angular/core';
import { ExponentialPipe } from '../shared/pipes/exponential/exponential.pipe';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  title = 'platzi-store';
  usuario = 'juan';

  nombres = ['Juan', 'Pedro', 'José'];

  numero: number;

  constructor() {}

  ngOnInit() {}

  addItem() {
    this.nombres.push('Agregar ítem');
  }

  deleteItem(index: number) {
    this.nombres.splice(index, 1);
  }
}
