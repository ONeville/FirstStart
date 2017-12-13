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
    { id: 1, name: "Bob", gender: "Male", details: "d vestibulum scelerisque", asset: 1500 },
    { id: 2, name: "Jane", gender: "Female", details: "vestibulum posuere. Ut non purus", asset: 2010  },
    { id: 3, name: "Bill", gender: "Male", details: "Quisque rhoncus scelerisque", asset: 5000 }
  ];
  peopleSelected : any = {};

getTemplate(person) {
    if (person.id === this.peopleSelected.id) return 'edit';
    else return 'display';
};

editTemplate(person) {
  console.log("Saving contact");
  this.peopleSelected = person;
};

saveTemplate (idx) {
    console.log("Saving contact");
    this.people[idx] = this.peopleSelected;
    this.reset();
};

reset () {
  this.peopleSelected = {};
};
}
