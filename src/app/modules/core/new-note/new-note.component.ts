import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NoteDialogueComponent} from '../note/note-dialogue/note-dialogue.component';

@Component({
  selector: 'new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openNoteDialog() {
    this.dialog.open(NoteDialogueComponent);
  }
}
