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
  noteBackgroundColor: string;
  previousSelectedColor: string;
  colorRing = 'box-shadow: inset 0 0 0 0.15em #828282';

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
      if (this.dialogueNote.colorIdentifier) {
        this.previousSelectedColor = this.dialogueNote.colorIdentifier;
        const element = document.getElementById(this.dialogueNote.colorIdentifier);
        element.style.cssText = this.colorRing;
      }
    } else {
      this.note = new Note();
    }
  }

  saveNote() {
    if (!this.note.title && !this.note.details) {
      this.toast.error({errorMessage: 'Please write something to save.'});
      return;
    }

    this.isBusy = true;

    this.note.backgroundColor = this.noteBackgroundColor;
    this.noteService.save(this.note).then((res) => {
      this.isBusy = false;
      this.dialog.close();
    }).catch((error) => {
      this.isBusy = false;
      this.toast.error({errorMessage: error});
    });
  }

  selectColor(colorIdentifier) {
    const element = document.getElementById(colorIdentifier);
    const style = window.getComputedStyle(element);
    this.noteBackgroundColor = style.getPropertyValue('background-color');
    this.note.colorIdentifier = colorIdentifier;

    if (this.previousSelectedColor) {
      const previousElement = document.getElementById(this.previousSelectedColor);
      previousElement.style.removeProperty('box-shadow');
    }

    this.previousSelectedColor = colorIdentifier;
    element.style.cssText = this.colorRing;
  }
}
