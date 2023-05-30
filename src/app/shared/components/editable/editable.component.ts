import { Component, ContentChild, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';
import { ViewModeDirective } from '../../directives/viewMode/view-mode.directive';
import { EditModeDirective } from '../../directives/editMode/edit-mode.directive';
import { Subject, filter, fromEvent, take, switchMapTo, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'editable',
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.sass']
})
export class EditableComponent implements OnDestroy {
  @Output() update = new EventEmitter()
  @ContentChild(ViewModeDirective) viewModeTpl!: ViewModeDirective;
  @ContentChild(EditModeDirective) editModeTpl!: EditModeDirective;

  mode: 'view' | 'edit' = 'view';

  editMode = new Subject();
  editMode$ = this.editMode.asObservable();

  private sub$: Subject<boolean> = new Subject<boolean>()

  constructor(private host: ElementRef) {}

  ngOnDestroy(): void {
    this.sub$.next(true)
    this.sub$.complete()
  }
  
  get currentView() {
    return this.mode === 'view' ? this.viewModeTpl.tpl : this.editModeTpl.tpl;
  }

  ngOnInit() {
    this.viewModeHandler()
    this.editModeHandler()
  }

  private get element() {
    return this.host.nativeElement
  }

  private viewModeHandler() { 
    fromEvent(this.element, 'dblclick')
    .pipe(
      takeUntil(this.sub$)
    )
    .subscribe(() => {
      this.mode = 'edit'
      this.editMode.next(true)
    });
  }

  private editModeHandler() {
    const clickOutside$ = fromEvent(document, 'click').pipe(
      filter(({ target }) => this.element.contains(target) === false),
      take(1)
    )
 
    this.editMode$.pipe(
      switchMap(() => clickOutside$),
      takeUntil(this.sub$)
    ).subscribe(event => {
      this.update.next(true)
      this.mode = 'view'
    });
  }

  toViewMode() {
    this.update.next(true)
    this.mode = 'view'
  }
}
