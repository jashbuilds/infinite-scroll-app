import { Component } from '@angular/core';
import { ItemsGridComponent } from "./Components/items-grid/items-grid.component";

@Component({
  selector: 'app-root',
  imports: [ItemsGridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'infinite-scroll-app';
}
