import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Ledger } from '../models';
import { LedgerItemComponent } from '../ledger-item/ledger-item.component';

@Component({
  selector: 'app-ledger-items',
  templateUrl: './ledger-items.component.html',
  styleUrls: ['./ledger-items.component.css']
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
  bsModalRef: BsModalRef;
  isEdit: boolean = false;
  expended: boolean = true;
  exText:string = `<i class="fa fa-caret-square-o-right" aria-hidden="true"></i>`;
  collText:string = `<i class="fa fa-caret-square-o-down" aria-hidden="true"></i>`;
  constructor(private modalService: BsModalService) { }

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
    this.reset();
  };

  onExpend(){
    this.expended = true;
  }
  onCollapse(){
    this.expended = false;
  }

  editLedger(ledger?:Ledger){
    this.bsModalRef = this.modalService.show(LedgerItemComponent, { animated: true, keyboard: true, backdrop: true, ignoreBackdropClick: false });
    this.bsModalRef.content.title = 'Add a Transaction';
    if (ledger) {
      this.bsModalRef.content.title = 'Edit a Ledger Transaction';
      this.bsModalRef.content.ledger = ledger;
    }
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

