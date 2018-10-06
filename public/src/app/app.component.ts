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
  selectedTask:Object;

  constructor(private _httpService: HttpService){}

  ngOnInit() {
    // this.getTasksFromService();
  }
  getTasksFromService() {
    let observable = this._httpService.getTasks();
    observable.subscribe(response => {
      console.log("Got our tasks!", response);
      // const titleArr = (data["data"] as [Object]).map(task => task["title"]);
      this.tasks = response["data"];
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
}
