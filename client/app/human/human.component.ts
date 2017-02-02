import { Component, OnInit, } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { HumanService } from '../app.service';
import { Human } from './human';

@Component({
  selector: 'human',
  moduleId: module.id,
  templateUrl: './human.component.html',
  //styleUrls: ['./human.component.css']
  providers: [HumanService],
})
export class HumanComponent {
  form: FormGroup;

  humans: Array<Human>;
  name: string;
  age: number;
  selectedHuman: Human;

  constructor(private HumanService: HumanService, public fb: FormBuilder) {
    //Get all humans on load
    HumanService.getHumans().subscribe(response => {
      this.humans = response;
    })

    //Build new form group
    this.form = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(24),
        Validators.pattern(/^[a-zA-Z\s]+$/)
        ]
      ],
      age: ['', [
        Validators.required,
        Validators.pattern(/^([5-9]|\d{2,})$/)
        ]
      ]
    });
  }

  addHuman() {
    let human = {
      name: this.form.value['name'],
      age: this.form.value['age']
    }

    this.HumanService.addHuman(human)
        .subscribe(data => {
          this.humans.push(data);
          this.name = '';
          this.age = undefined;
        })
  }

  removeHuman(id: string, element: Human) {
    this.HumanService.removeHuman(id)
        .subscribe(data => {
          let index = this.humans.indexOf(element);
          this.humans.splice(index, 1);
        });
  }

  onSelect(human: Human): void {
    this.selectedHuman = human;
  }
}