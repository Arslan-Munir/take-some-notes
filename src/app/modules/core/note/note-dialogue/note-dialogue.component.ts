import {Component, Inject, OnInit} from '@angular/core';
import {Note} from '../../../shared/models/note/note.model';
import {ToastService} from '../../../shared/services/toast.service';
import {NoteService} from '../../../shared/services/note.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'note-dialogue',
  templateUrl: 'note-dialogue.component.html',
  styleUrls: ['note-dialogue.component.scss']
})
export class NoteDialogueComponent implements OnInit {

  isBusy = false;
  noteBackgroundColor = '';
  previousSelectedColor = '';
  colorRing = 'box-shadow: inset 0 0 0 0.15em #828282';
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  selectable = true;
  removable = true;
  addOnBlur = true;

  note: Note = new Note();

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
    }
  }


  saveNote() {
    if (!this.note.title && !this.note.details) {
      this.toast.error({errorMessage: 'Please write something to save.'});
      return;
    }

    this.isBusy = true;

    this.note.backgroundColor = this.noteBackgroundColor;
    this.noteService.save(this.note).then(() => {
      this.isBusy = false;
      this.dialog.close();
    }).catch((error) => {
      this.isBusy = false;
      this.toast.error({errorMessage: error});
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.note.labels.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(label: string): void {
    const index = this.note.labels.indexOf(label);

    if (index >= 0) {
      this.note.labels.splice(index, 1);
    }
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
