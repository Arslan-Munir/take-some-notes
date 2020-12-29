import {Component, Inject, OnInit} from '@angular/core';
import {Note} from '../../shared/models/note/note.model';
import {ToastService} from '../../shared/services/toast.service';
import {NoteService} from '../../shared/services/note.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'note-dialogue',
  templateUrl: 'note-dialogue.component.html',
  styleUrls: ['note-dialogue.component.scss']
})
export class NoteDialogueComponent implements OnInit {

  isBusy = false;

  note: Note;

  constructor(
    private dialog: MatDialogRef<NoteDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogueNote: Note,
    private noteService: NoteService,
    private toast: ToastService) {


  }

  ngOnInit(): void {

    if (this.dialogueNote) {
      this.note = this.dialogueNote;
    } else {
      this.note = new Note();
    }
    console.log(this.note);
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
