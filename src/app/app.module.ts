import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { GroupByPipe } from './groupby.pipe';
import { ModalDataService } from './modalDataService';

import { LedgerItemsComponent, LedgerItemComponent } from './views';


@NgModule({
  declarations: [
    AppComponent,
    GroupByPipe,
    LedgerItemsComponent,
    LedgerItemComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [
    ModalDataService
  ],
  entryComponents: [
    LedgerItemComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
