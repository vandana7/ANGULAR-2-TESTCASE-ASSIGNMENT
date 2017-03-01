/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />

import { AppComponent } from '../app.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By, BrowserModule}           from '@angular/platform-browser';
import {DebugElement, Class} from '@angular/core';
import {Router, RouterOutletMap, ActivatedRoute} from '@angular/router';
import {routes} from "../app.router";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppService} from "../app.service";
import {RouterTestingModule} from '@angular/router/testing'
import {ShowTaskComponent} from "./showTask.component";
import {Observable} from "rxjs/Observable";

describe('ShowTaskComponent ', function () {
  let de: DebugElement;
  let comp: ShowTaskComponent;
  let fixture: ComponentFixture<ShowTaskComponent>;
  let service:AppService;
  let router:Router;

class MockRouter{
  navigate(): Promise<boolean> {
    return Promise.resolve(true)
  }

  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTaskComponent ],
      providers: [ {provide:Router,useClass:MockRouter},RouterOutletMap,AppService],
      imports: [RouterTestingModule,BrowserModule,FormsModule,HttpModule]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTaskComponent);
    comp = fixture.componentInstance;
    comp.newTask=[{
      _id: '5',
    date: '12/12/12',
    title: 'title1',
    description:'newDescription1',
    priority:'high'

  }]
    de = fixture.debugElement.query(By.css('h1'));
    service=fixture.debugElement.injector.get(AppService);
    router = fixture.debugElement.injector.get(Router);
  });

  it('should create component', () => expect(comp).toBeDefined() );

  it('should show list of task', () => {
    spyOn(service, 'showData').and.returnValue(
      Observable.of<any>(
        [{
          _id:'',
          date: '',
          title: '',
          description: '',
          priority: ''
        }]
      )
    );
    comp.ngOnInit();
    //expect(console.log).toHaveBeenCalled();
    expect(comp.newTask).toEqual([{
      _id:'',
      date: '',
      title: '',
      description: '',
      priority: ''
    }])
  });
  it('should delete a task', () => {
    spyOn(window,'alert')
    spyOn(service, 'remove').and.returnValue(
        Observable.of<any>(
            [{
              _id:'',
              date: '',
              title: '',
              description: '',
              priority: ''
            }]
        )
    );
    comp.deleteByIndex(0);
    expect(window.alert).toHaveBeenCalledWith('task removed')
  });

  it(' should  edit a task ', () => {
    comp.editTask(0);
    router.navigate([]).then(data => {
      expect(data).toBe(true);
    })

  });
  it(' should generate error while showing task if required', () => {
    spyOn(window, 'alert');
    spyOn(service, 'showData').and.returnValue(
      Observable.throw(Error('Observable Error Occurs'))
    );
    comp.ngOnInit();
    expect(window.alert).toHaveBeenCalled();
  });

});
