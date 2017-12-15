import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { GroupByPipe } from './groupby.pipe';

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
    ModalModule.forRoot()
  ],
  providers: [],
  entryComponents: [
    LedgerItemComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
