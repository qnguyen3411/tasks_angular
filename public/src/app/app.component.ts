import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Restful Tasks API';
  tasks = [];
  newTask: Object;
  selectedTask:Object;

  constructor(private _httpService: HttpService){}

  ngOnInit() {
    this.getTasksFromService();
    this.newTask = { title: "", description: "" };
  }

  submitNew() {
    let observable = this._httpService.newTask(this.newTask)
    observable.subscribe(response => {
      this.getTasksFromService();
    })
    this.newTask = { title: "", description: "" }
  }

  setSelectedTask(task) {
    this.selectedTask = task;
  }

  getTasksFromService() {
    let observable = this._httpService.getTasks();
    observable.subscribe(response => {
      console.log("Got our tasks!", response);
      // const titleArr = (data["data"] as [Object]).map(task => task["title"]);
      this.tasks = response["data"];
      this.tasks.reverse();
    })
  }

  getTaskById(id: string) {
    console.log(id)
    let observable = this._httpService.getTask(id);
    observable.subscribe(response => {
      console.log(response)
      this.selectedTask = response["data"];
    })
  }

  editTask(task) {
    const newData = {'title': task['title'], 'description': task['description']}
    let observable = this._httpService.updateTask(task['_id'], newData)
    observable.subscribe(response => {
      this.getTasksFromService();
    })
    this.selectedTask = null;
  }

  deleteTask(task) {
    let observable = this._httpService.deleteTask(task['_id']);
    observable.subscribe(response => {
      this.getTasksFromService();
    })
  }
}
