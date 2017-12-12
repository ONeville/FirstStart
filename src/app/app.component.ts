import { Component } from '@angular/core';
import { GroupByPipe } from './groupby.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'app';
  people : any[] = [
    {name: "Bob", gender: "Male", details: "d vestibulum scelerisque", asset: 1500 },
    {name: "Jane", gender: "Female", details: "vestibulum posuere. Ut non purus", asset: 2010  },
    {name: "Bill", gender: "Male", details: "Quisque rhoncus scelerisque", asset: 5000 }
  ];
}
