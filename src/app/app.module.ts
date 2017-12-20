import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import {Routes, RouterModule} from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { GroupByPipe } from './groupby.pipe';
import { ModalDataService } from './modalDataService';

import { LedgerItemsComponent, 
  LedgerItemComponent, 
  DashboardComponent, 
  ConfigurationComponent, 
  ConfigAccountComponent, 
  ConfigCategoryComponent, 
  ConfigItemComponent, 
  LedgerAccountComponent } from './views';


const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  //{path: '**', component: DashboardComponent},
  {path: 'configAccount', component: ConfigAccountComponent},
  {path: 'configCategory', component: ConfigCategoryComponent},
  {path: 'events', component: LedgerItemsComponent},
  {path: 'configItem', component: ConfigItemComponent},
  {path: 'ledgerAccount', component: LedgerAccountComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    GroupByPipe,
    LedgerItemsComponent,
    LedgerItemComponent,
    DashboardComponent,
    ConfigurationComponent,
    ConfigAccountComponent,
    ConfigCategoryComponent,
    ConfigItemComponent,
    LedgerAccountComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {useHash: true}),
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
