import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {ShowTaskComponent} from "./showTask/showTask.component";
import {CreateTaskComponent} from "./createTask/createTask.component";
import {RouterModule} from "@angular/router";
import {routes} from "./app.router";
import {AppService} from "./app.service";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

@NgModule({
  imports:      [ BrowserModule,RouterModule.forRoot(routes),FormsModule,HttpModule],
  declarations: [ AppComponent, CreateTaskComponent,ShowTaskComponent ],
  bootstrap:    [ AppComponent ],
  providers: [AppService]
})
export class AppModule { }
