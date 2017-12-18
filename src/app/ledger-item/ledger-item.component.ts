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
  // string[] = [
  //   'Housing',
  //   'Transportation',
  //   'Entaitement',
  // ];
  Items: Item[];
  // string[] = [
  //   'Internet',
  //   'Movies',
  //   'Foods',
  //   'Telepone',
  //   'Tither'
  // ];
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
    if (this.isEdit && this.ledger) {
      this.itemForm = new FormGroup({
        id: new FormControl(this.ledger.id),
        account: new FormControl(this.ledger.account, Validators.required),
        categoryId: new FormControl(this.ledger.categoryId, Validators.required),
        category: new FormControl(this.ledger.category, Validators.required),
        itemId: new FormControl(this.ledger.itemId, Validators.required),
        item: new FormControl(this.ledger.item, Validators.required),
        projectedAmount: new FormControl(this.ledger.projectedAmount, Validators.required),
        actualAmount: new FormControl(this.ledger.actualAmount),
        periodicity: new FormControl(this.ledger.periodicity, Validators.required),
        memo: new FormControl(this.ledger.memo),
      });
    }else{
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

}
