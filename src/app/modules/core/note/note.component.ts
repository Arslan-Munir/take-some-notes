import {Component, Input, OnInit} from '@angular/core';
import {Note} from '../../shared/models/note/note.model';
import {MatDialog} from '@angular/material/dialog';
import {NoteDialogueComponent} from '../note-dialogue/note-dialogue.component';

@Component({
  selector: 'note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Input('note') note: Note;
  noteDialogue = false;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  showNoteDialogue() {
    this.noteDialogue = true;
    const dialogRef = this.dialog.open(NoteDialogueComponent, {
      data: this.note
    });
  }
}
