import {Routes} from "@angular/router";
import {CreateTaskComponent} from "./createTask/createTask.component";
import {ShowTaskComponent} from "./showTask/showTask.component";


export const routes: Routes = [{
  path : 'CreateTask',
  component: CreateTaskComponent
}, {
  path: 'ShowTask',
  component: ShowTaskComponent
},
  {
    path : 'CreateTask/:indexSent',
    component: CreateTaskComponent

}];
