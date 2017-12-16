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
      test: new FormControl(Validators.required),
      account: new FormControl(Validators.required),
      category: new FormControl(Validators.required),
      item: new FormControl(Validators.required),
      projectedAmount: new FormControl(0, Validators.required),
      actualAmount: new FormControl(0),
      periodicity: new FormControl(Validators.required),
      memo: new FormControl(),
    });
  }

  onEdit(ledger) {
    this.isEdit = true;
  }

  onSubmit(ledger) {
    console.log('Form submitted --');
    console.log(ledger.Account);
  }

  reset() {
    this.modalRef.hide();
    this.itemForm.reset();
  }

}
