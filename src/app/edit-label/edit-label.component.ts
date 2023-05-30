import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.sass']
})
export class EditLabelComponent implements OnInit {
  entities = [
    { id: 1, name: 'editable_text', type: 'label', isEditable: true, value: 'Thats a text' }
  ]

  controls!: FormArray
  
  ngOnInit(): void {
    const toGroups = this.entities.map(entity => {
      return new FormGroup({
        name: new FormControl(entity.name, Validators.required),
        isEditable: new FormControl(entity.isEditable)
      });
    });
    this.controls = new FormArray(toGroups)
  }

  getControl(index: number, field: string): any {
    return this.controls.at(index).get(field)
  }

  updateField(index: number, field: string ) {
    const control = this.getControl(index, field)
    if (control.valid) {
      this.entities = this.entities.map((e, i) => {
        if (index === i) {
          return {
            ...e,
            [field]: control.value
          }
        }
        return e
      })
    }
  }
}
