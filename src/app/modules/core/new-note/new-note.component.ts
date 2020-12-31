import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NoteDialogueComponent} from '../note-dialogue/note-dialogue.component';
import {LabelDialogueComponent} from '../label-dialogue/label-dialogue.component';

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
    const dialogRef = this.dialog.open(NoteDialogueComponent);
  }

  openLabelDialog() {
    const dialogRef = this.dialog.open(LabelDialogueComponent);
  }
}
