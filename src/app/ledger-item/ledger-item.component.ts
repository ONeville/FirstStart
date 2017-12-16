import { Component, OnInit, Input  } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Ledger } from '../models';

@Component({
  selector: 'app-ledger-item',
  templateUrl: './ledger-item.component.html',
  styleUrls: ['./ledger-item.component.css']
})
export class LedgerItemComponent implements OnInit {
  @Input()
  ledger: Ledger;
  itemSelected: Ledger = null;
  isEdit: boolean = false;
  modalRef: BsModalRef;
  constructor(public bsModalRef: BsModalRef) { 
    this.modalRef = bsModalRef;
  }

  ngOnInit() {
  }

  onEdit(ledger){
    this.isEdit = true;
    //this.itemSelected = ledger;
  }

onSave(ledger, actualAmount, memo) {
    console.log("Saving contact");
    this.ledger.actualAmount = actualAmount;
    this.ledger.memo = memo;
    // model.contacts[idx] = angular.copy(model.selected);
    // this.itemSelected
    this.reset();
};

reset() {
  this.itemSelected = null;
}

}
