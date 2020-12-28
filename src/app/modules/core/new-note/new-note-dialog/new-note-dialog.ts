import {Component, ElementRef, ViewChild} from '@angular/core';
import {Note} from '../../../shared/models/note/note.model';
import {ToastService} from '../../../shared/services/toast.service';
import {NoteService} from '../../../shared/services/note.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'new-note-dialog',
  templateUrl: 'new-note-dialog.html',
  styleUrls: ['new-note-dialog.scss']
})
export class NewNoteDialog {

  isBusy = false;

  note: Note = new Note();

  constructor(
    private dialog: MatDialogRef<NewNoteDialog>,
    private noteService: NoteService,
    private toast: ToastService) {
  }

  selectRed(id) {
    // this.note.color = this.selectColor(id);
  }

  saveNote() {
    if (!this.note.title && !this.note.details) {
      this.toast.error({errorMessage: 'Please write something to save.'});
      return;
    }

    this.isBusy = true;
    this.noteService.save(this.note).then((res) => {
      this.isBusy = false;
      this.dialog.close();
    }).catch((error) => {
      this.isBusy = false;
      this.toast.error({errorMessage: error});
    });
  }

  selectColor(id) {
    const element = document.getElementById(id);
    const style = window.getComputedStyle(element);
    this.note.backgroundColor = style.getPropertyValue('background-color');
    console.log(this.note.backgroundColor);
  }
}
