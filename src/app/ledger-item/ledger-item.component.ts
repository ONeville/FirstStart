import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  itemForm: FormGroup;
  isEdit: boolean = false;
  modalRef: BsModalRef;
  Accounts: string[] = [
    'Checking - Ariel',
    'Checking - Blaise',
    'Credit Card - Ariel',
  ];
  Categories: string[] = [
    'Housing',
    'Transportation',
    'Entaitement',
  ];
  Items: string[] = [
    'Internet',
    'Movies',
    'Foods',
    'Telepone',
    'Tither'
  ];
  Periodicities: string[] = [
    'Weekly',
    'Bi-Weekly',
    'Monthly',
    'Yearly'
  ];
  constructor(public bsModalRef: BsModalRef) {
    this.modalRef = bsModalRef;
  }

  ngOnInit() {
    this.itemForm = new FormGroup({
      id: new FormControl(0),
      account: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      item: new FormControl('', Validators.required),
      projectedAmount: new FormControl(null, Validators.required),
      actualAmount: new FormControl(null),
      periodicity: new FormControl('', Validators.required),
      memo: new FormControl(),
    });
  }

  onEdit() {
    if (this.isEdit && this.ledger.id > 0) {
      this.itemForm = new FormGroup({
        id: new FormControl(this.ledger.id),
        account: new FormControl(this.ledger.account, Validators.required),
        category: new FormControl(this.ledger.category, Validators.required),
        item: new FormControl(this.ledger.item, Validators.required),
        projectedAmount: new FormControl(this.ledger.projectedAmount, Validators.required),
        actualAmount: new FormControl(this.ledger.actualAmount),
        periodicity: new FormControl(this.ledger.periodicity, Validators.required),
        memo: new FormControl(this.ledger.memo),
      });
    }
  }

  getFromControl(item) {
    return {
        id: item.id,
        account: item.account,
        category: item.category,
        item: item.item,
        projectedAmount: item.projectedAmount,
        actualAmount: this.ledger.actualAmount,
        periodicity: this.ledger.periodicity,
        memo: this.ledger.memo
      };
  }
  onSubmit(ledger) {
    console.log('Form submitted --');
    this.modalRef.hide();
    console.log(ledger.account +'-' + ledger.category);
  }

  reset() {
    this.modalRef.hide();
    this.itemForm.reset();
    console.log('Form reseted --');
  }

}
