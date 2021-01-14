import {Component, OnInit} from '@angular/core';
import {QuickNote} from '../../shared/models/label/label.model';
import {QuickNoteService} from '../../shared/services/quick-note.service';
import {QuickNoteDialogueComponent} from './quick-note-dialogue/quick-note-dialogue.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'quick-notes',
  templateUrl: './quick-notes.component.html',
  styleUrls: ['./quick-notes.component.scss']
})
export class QuickNotesComponent implements OnInit {

  quickNotes = new Array<QuickNote>();
  isBusy = true;

  constructor(private quickNoteService: QuickNoteService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    const sub = this.quickNoteService.getQuickNotes().subscribe((quickNotes) => {
      this.quickNotes = quickNotes;
      this.isBusy = false;
      // sub.unsubscribe();
    });
  }

  openQuickNoteDialog(quickNote?: QuickNote) {
    this.dialog.open(QuickNoteDialogueComponent, {
      data: quickNote
    });
  }

}
