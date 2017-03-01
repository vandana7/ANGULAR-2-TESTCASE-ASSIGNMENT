import {Component, OnInit} from '@angular/core'
import {AppService} from "../app.service";
import {Router} from "@angular/router";
import {Task} from '../task'

@Component({
  moduleId:module.id,
  selector :'ShowTask',
  templateUrl: './showTask.component.html'
})

export class ShowTaskComponent implements OnInit {
  constructor(private router: Router,
              private service: AppService) {
  }

  newTask: Task[];

  ngOnInit() {
   // this.newTask = this.service.taskArray;
    this.service.showData().subscribe(data =>  {
      //alert(JSON.stringify(data))
      this.newTask=data

    }, err => {
      alert(err)
    });
    //this.service.getData1().then(data =>  {
    //   alert(JSON.stringify(data))
    //
    // }, err => {
    //   alert(err)
    // this.service.getData3().subscribe(data =>  {
    //     alert(JSON.stringify(data))
    //
    //    }, err => {
    //      alert(err)
    // });
    //this.service.getData3().subscribe((data:any)=>alert(JSON.stringify(data)))

  }



  deleteByIndex(index: number) {
    //this.service.delete(index)
    this.service.remove(this.newTask[index]._id).subscribe((data:any)=>alert("task removed"))
  }


  editTask(index: number) {
    this.router.navigate(['CreateTask',this.newTask[index]._id])
  }

}
