import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient){
    // this.getTasks();
  }

  getTasks() {
    return this._http.get('/tasks');
    // tempObservable.subscribe(data => console.log("Got our tasks!", data))
  }

  getTask(id: string) {
    return this._http.get(`/tasks/${id}`)
  }

  newTask(data) {
    return this._http.post('/tasks', data)
  }

  updateTask(id, newData) {
    return this._http.put(`/tasks/${id}`, newData)
  }

  deleteTask(id) {
    return this._http.delete(`/tasks/${id}`)
  }
}
