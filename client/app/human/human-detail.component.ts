import { Component, Input } from '@angular/core';

import { HumanService } from '../app.service';

import { Human } from './human';

@Component({
  selector: 'human-detail',
  moduleId: module.id,
  templateUrl: './human-detail.component.html'
})
export class humanDetailComponent {
  
  constructor(private HumanService: HumanService) {}

  updateHuman(id: string, human: Object) {
    console.log('in updateHuman with', human, 'as parameters');
    return this.HumanService.updateHuman(id, human).subscribe();
  }
  
  @Input()
    human: Human;
  
}