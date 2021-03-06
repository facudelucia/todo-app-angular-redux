import * as actions from './../todo.actions';
import { AppState } from './../../app.reducer';
import { FormControl, Validators } from '@angular/forms';
import { Todo } from './../models/todo.model';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  chkCompletado!: FormControl
  txtInput!: FormControl
  @ViewChild('inputFisico') txtInputFisico!: ElementRef
  editando: boolean = false
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.chkCompletado = new FormControl(this.todo.completado)
    this.txtInput = new FormControl(this.todo.texto, Validators.required)
    this.chkCompletado.valueChanges.subscribe(valor => {
      this.store.dispatch(actions.toggle({ id: this.todo.id }))
    })
  }

  editar() {
    this.editando = true
    this.txtInput.setValue(this.todo.texto)
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select()
    }, 1);

  }
  terminarEdicion() {
    this.editando = false
    if (this.txtInput.invalid) return
    if (this.txtInput.value === this.todo.texto) return

    this.store.dispatch(
      actions.editar({
        id: this.todo.id,
        texto: this.txtInput.value
      })
    )
  }
  eliminar() {
    this.store.dispatch(
      actions.eliminar({ id: this.todo.id })
    )
  }
}
