import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HumanService {
  constructor(private http: Http) {
    console.log('Service initialized...');
  }

  getHumans() {
    return this.http.get('/api/human')
               .map(response => response.json());
  }


  addHuman(human: Object) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('/api/human', JSON.stringify(human), { headers: headers })
    .map(response => response.json());
  }

  removeHuman(id: string) {
    return this.http.delete('/api/human/' + id)
               .map(response => response.json());
  }

  updateHuman(id: string, human: Object) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put('/api/human/' + id, JSON.stringify(human), { headers: headers })
    .map(response => response.json());
  }
}