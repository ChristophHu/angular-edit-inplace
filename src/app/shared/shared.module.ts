import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewModeDirective } from './directives/viewMode/view-mode.directive';
import { EditModeDirective } from './directives/editMode/edit-mode.directive';
import { EditableComponent } from './components/editable/editable.component';
import { EditableOnEnterDirective } from './directives/editableOnEnter/editable-on-enter.directive';
import { FocusableDirective } from './directives/focusable/focusable.directive';

const directives = [
  EditableOnEnterDirective,
  EditModeDirective,
  FocusableDirective,
  ViewModeDirective
]

@NgModule({
  declarations: [
    ...directives,
    EditableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...directives,
    EditableComponent
  ]
})
export class SharedModule { }
