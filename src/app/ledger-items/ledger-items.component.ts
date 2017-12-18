import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Ledger } from '../models';
import { ModalDataService } from '../modalDataService';
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
    categoryId: 0,
    category: '',
    itemId: 0,
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
  constructor(private modalService: BsModalService,
              private modalData: ModalDataService) { }

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
    if (ledger) {
      this.modalData.setData({ "isEdit": true, "ledger": ledger});
    }else{
      this.modalData.setData({ "isEdit": false, "ledger": null});
    }
    this.bsModalRef = this.modalService.show(LedgerItemComponent, { animated: true, keyboard: true, backdrop: true, ignoreBackdropClick: false });
  }


reset() {
  this.isEdit = false;
}

  data: Ledger[] = [{
    id: 1,
    account: 'Bank of America',
    categoryId: 1,
    category: 'Housing',
    itemId: 0,
    item: '',
    projectedAmount: 450,
    actualAmount: 0,
    periodicity: 'Monthly',
    memo: ''
  },{
    id: 2,
    account: 'Bank of America',
    categoryId: 2,
    category: 'Transportation',
    itemId: 0,
    item: '',
    projectedAmount: 50,
    actualAmount: 0,
    periodicity: 'Monthly',
    memo: ''
  },{
    id: 3,
    account: 'Bank of America',
    categoryId: 3,
    category: 'Entaitement',
    itemId: 0,
    item: '',
    projectedAmount: 15,
    actualAmount: 0,
    periodicity: 'Monthly',
    memo: ''
  },{
    id: 4,
    account: 'Bank of America',
    categoryId: 4,
    category: 'Personal Care',
    itemId: 0,
    item: '',
    projectedAmount: 30,
    actualAmount: 40,
    periodicity: 'Bi-week',
    memo: ''
  },{
    id: 4,
    account: 'Bank of America',
    categoryId: 5,
    category: 'Loans',
    itemId: 0,
    item: '',
    projectedAmount: 30,
    actualAmount: 40,
    periodicity: 'Bi-week',
    memo: ''
  },{
    id: 4,
    account: 'Bank of America',
    categoryId: 6,
    category: 'Foods',
    itemId: 0,
    item: '',
    projectedAmount: 30,
    actualAmount: 40,
    periodicity: 'Bi-week',
    memo: ''
  }];
}

