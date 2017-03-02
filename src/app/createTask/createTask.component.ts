import {Component, OnInit} from '@angular/core'
import {Task} from "../task";
import {AppService} from "../app.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  moduleId:module.id,
  selector :'CreateTask',
  templateUrl: './createTask.component.html'

})

export class CreateTaskComponent implements OnInit {

  index: string;
  newTask:Task[];

  task: Task = new Task('','', '', '', '');

  constructor(private service: AppService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((data: any) => {
      this.index = data.indexSent;
      if (this.index) {
        this.service.showData().subscribe(data =>  {
          //alert(JSON.stringify(data))
          this.newTask=data;
          this.task=this.newTask.filter((task:Task)=>task._id===this.index)[0]
        }, err => {
          alert(err)
        });
        //this.task = this.service.taskArray[this.index];
      }
    });
  }

  addTask() {
    console.log('----------------------')
    if (this.index) {
      //this.service.update(this.index, this.task);
      this.service.updateData(this.task).subscribe((data:any)=>{
        alert(JSON.stringify(data))
      },err => console.error(err));
      this.router.navigate(['ShowTask']);
    } else {
      this.service.adddata(this.task).subscribe((data:any)=>{
        alert('Task Added')
        this.router.navigate(['ShowTask']);
      }, err => console.error(err));

    }

  }


}
