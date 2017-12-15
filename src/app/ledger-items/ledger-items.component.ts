import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Ledger } from '../models';

@Component({
  selector: 'app-ledger-items',
  templateUrl: './ledger-items.component.html',
  styleUrls: ['./ledger-items.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class LedgerItemsComponent implements OnInit {
  itemSelected: Ledger = {
    id: 0,
    account: '',
    category: '',
    item: '',
    projectedAmount: 0,
    actualAmount: 0,
    periodicity: '',
    memo: ''
  };
  isEdit: boolean = false;
  expended: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  onEdit(ledger){
    this.isEdit = true;
    this.itemSelected = ledger;
  }
  onSave(ledger, actualAmount, memo) {
    console.log("Saving contact");
    //this.ledger.actualAmount = actualAmount;
    //this.ledger.memo = memo;
    // model.contacts[idx] = angular.copy(model.selected);
    // this.itemSelected
    this.reset();
  };

  create(){

  }

reset() {
  this.isEdit = false;
}
  data: Ledger[] = [{
    id: 1,
    account: 'Bank of America',
    category: 'Entertainment',
    item: 'Movies',
    projectedAmount: 450,
    actualAmount: 0,
    periodicity: 'Monthly',
    memo: ''
  },{
    id: 2,
    account: 'Bank of America',
    category: 'Entertainment',
    item: 'Sporting event',
    projectedAmount: 50,
    actualAmount: 0,
    periodicity: 'Monthly',
    memo: ''
  },{
    id: 3,
    account: 'Bank of America',
    category: 'Housing',
    item: 'Rental Insurance',
    projectedAmount: 15,
    actualAmount: 0,
    periodicity: 'Monthly',
    memo: ''
  },{
    id: 4,
    account: 'Bank of America',
    category: 'Transportation',
    item: 'Gas/Fuel',
    projectedAmount: 30,
    actualAmount: 40,
    periodicity: 'Bi-week',
    memo: ''
  }];
}
