import {Component, Input, OnInit} from '@angular/core';
import {Note} from '../../shared/models/note/note.model';
import {MatDialog} from '@angular/material/dialog';
import {NoteDialogueComponent} from './note-dialogue/note-dialogue.component';
import {NoteService} from '../../shared/services/note.service';
import {ToastService} from '../../shared/services/toast.service';

@Component({
  selector: 'note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  isBusy = false;
  noteDialogue = true;

  @Input('note') note: Note;

  constructor(private noteService: NoteService,
              private dialog: MatDialog,
              private toast: ToastService) {
  }

  ngOnInit(): void {
  }

  openNoteDialogue() {
    if (this.noteDialogue) {
      this.dialog.open(NoteDialogueComponent, {
        data: this.note
      });
    }
  }

  delete() {
    this.noteDialogue = false;
    this.isBusy = true;

    this.noteService.delete(this.note)
      .then(() => {
        this.isBusy = false;
      }).catch((error) => {
      this.isBusy = false;
      this.toast.error({errorMessage: error});
    });
  }
}
