import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { TimerComponent } from './timer/timer.component';
import { ModalModule } from 'ngx-bootstrap/modal';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    HttpClientModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
