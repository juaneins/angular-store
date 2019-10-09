import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'platzi-store';
  usuario = 'juan';

  nombres = ['Juan', 'Pedro', 'José'];

  addItem() {
    this.nombres.push('Agregar ítem');
  }

  deleteItem(index: number) {
    this.nombres.splice(index, 1);
  }
}
