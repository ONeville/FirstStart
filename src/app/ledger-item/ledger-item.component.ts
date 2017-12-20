import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Ledger, Category, Item } from '../models';
import { ModalDataService } from '../modalDataService';

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
  title: string;
  Accounts: string[] = [
    'Checking - Ariel',
    'Checking - Blaise',
    'Credit Card - Ariel',
  ];
  Categories: Category[] = Category.getData();
  Items: Item[];
  Periodicities: string[] = [
    'Weekly',
    'Bi-Weekly',
    'Monthly',
    'Yearly'
  ];
  constructor(public bsModalRef: BsModalRef,
    private modalData: ModalDataService) {
    this.modalRef = bsModalRef;
    this.initParams(this.modalData.getData());
  }

  ngOnInit() {

    if(this.ledger && this.ledger.categoryId){
      this.Items = Item.getData().filter(x=>x.categoryId == this.ledger.categoryId);
    }

    this.itemForm = new FormGroup({
      id: new FormControl((this.ledger && this.ledger.id) || 0),
      account: new FormControl((this.ledger && this.ledger.account) || '', [Validators.required, Validators.minLength(1)]),
      // categoryId: new FormControl((this.ledger && this.ledger.categoryId) || 0, [Validators.required, Validators.minLength(1)]),
      category: new FormControl((this.ledger && this.ledger.categoryId) || '', [Validators.required, Validators.minLength(1)]),
      // itemId: new FormControl((this.ledger && this.ledger.itemId) || 0, [Validators.required, Validators.minLength(1)]),
      item: new FormControl((this.ledger && this.ledger.itemId) || '', [Validators.required, Validators.minLength(1)]),
      projectedAmount: new FormControl((this.ledger && this.ledger.projectedAmount) || null, Validators.required),
      actualAmount: new FormControl((this.ledger && this.ledger.actualAmount) || null),
      periodicity: new FormControl((this.ledger && this.ledger.periodicity) || '', [Validators.required, Validators.minLength(1)]),
      memo: new FormControl((this.ledger && this.ledger.memo) || ''),
    });
  }

  initParams(params) {
    this.isEdit = params.isEdit;
    this.ledger = params.ledger;
    this.title = this.isEdit ? 'Edit' : 'Add a new';
  }

  getFromControl(item): Ledger {
    return {
        id: item.id,
        account: item.account,
        categoryId: item.categoryId,
        category: item.category,
        itemId: item.itemId,
        item: item.item,
        projectedAmount: item.projectedAmount,
        actualAmount: item.actualAmount,
        periodicity: item.periodicity,
        memo: item.memo
      };
  }
  onSubmit(ledger) {
    console.log('Form submitted --');
    this.modalRef.hide();
    console.log(ledger.account +'-' + ledger.category);
  }
  onChange(id) {
    console.log(id);
    this.Items = Item.getData().filter(x=>x.categoryId == id);
  }
  reset() {
    this.modalRef.hide();
    this.itemForm.reset();
    console.log('Form reseted --');
  }

  disable(itemForm){
    return itemForm.valid
  }
}
