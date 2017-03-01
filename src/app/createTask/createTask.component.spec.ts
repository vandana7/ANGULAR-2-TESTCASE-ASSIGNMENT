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
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from "rxjs/Observable";
import {CreateTaskComponent} from "./createTask.component";

describe('CreateTaskComponent', function () {
  let de: DebugElement;
  let comp:CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;
  let service:AppService;
  let router:Router;
  let route:ActivatedRoute

  class MockRouter{
    navigate(): Promise<boolean> {
      return Promise.resolve(true)
    }

  }

  class MockActivatedRoute {
    params = Observable.of<any>({'indexSent':'2'})
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTaskComponent ],
      providers: [ {provide:Router,useClass:MockRouter},{provide: ActivatedRoute, useClass: MockActivatedRoute},
      RouterOutletMap,AppService],
      imports: [RouterTestingModule,BrowserModule,FormsModule,HttpModule]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskComponent);
    comp = fixture.componentInstance;
    comp.newTask=[{
      _id: '2',
      date: '12/11/12',
      title: 'title2',
      description:'newDescription2',
      priority:'high'

    }]
    de = fixture.debugElement.query(By.css('h1'));
    service=fixture.debugElement.injector.get(AppService);
    route=fixture.debugElement.injector.get(ActivatedRoute);
    router = fixture.debugElement.injector.get(Router);
  });

  it('should create component', () => expect(comp).toBeDefined() );

   it('should create list of task', () => {
    spyOn(service, 'showData').and.returnValue(
      Observable.of<any>(
        [{
          _id:'testData',
          date: 'testData',
          title: 'testData',
          description: 'testData',
          priority: 'testData'
        }]
      )
    );
    comp.ngOnInit();
    //expect(console.log).toHaveBeenCalled();
    expect(comp.newTask).toEqual([{
      _id:'testData',
      date: 'testData',
      title: 'testData',
      description: 'testData',
      priority: 'testData'
    }])
  });
  it(' should be able to update data after getting router parameter', () => {
    comp.index = '0';

    spyOn(service, 'updateData').and.returnValue(
      Observable.of<any>(
        [{
          _id:'testData',
          date: 'testData',
          title: 'testData',
          description: 'testData',
          priority: 'testData'
        }]
      )
    );
    comp.addTask();
    router.navigate([]).then(data => {
      expect(data).toBe(true);
    })

  });

  // it('it should generate error while adding task if required', () => {
  //   spyOn(console, 'error');
  //   spyOn(service, 'adddata').and.returnValue(
  //     Observable.throw(Error('Observable Error Occurs'))
  //   );
  //   comp.addTask();
  //   expect(console.error('Observable Error Occurs')).toHaveBeenCalled();
  // });




  // it(' should generate error while updating task if required', () => {
  //   spyOn(window, 'alert');
  //   spyOn(service, 'updateData').and.returnValue(
  //     Observable.throw(Error('Observable Error Occurs'))
  //   );
  //   comp.addTask();
  //   expect(window.alert).toHaveBeenCalled();
  // });
});
