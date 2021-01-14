import {Component, Inject, OnInit} from '@angular/core';
import {QuickNote} from '../../../shared/models/label/label.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastService} from '../../../shared/services/toast.service';
import {QuickNoteService} from '../../../shared/services/quick-note.service';

@Component({
  selector: 'quick-note-dialogue',
  templateUrl: './quick-note-dialogue.component.html',
  styleUrls: ['./quick-note-dialogue.component.scss']
})
export class QuickNoteDialogueComponent implements OnInit{

  isBusy = false;
  quickNote: QuickNote = new QuickNote();

  constructor(
    private dialog: MatDialogRef<QuickNoteDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogueLabel: QuickNote,
    private quickNoteService: QuickNoteService,
    private toast: ToastService) {

  }

  ngOnInit(): void {
    if (this.dialogueLabel) {
      this.quickNote = this.dialogueLabel;
    }
  }

  saveLabel() {
    if (!this.quickNote.details) {
      this.toast.error({errorMessage: 'Please write something to save.'});
      return;
    }

    this.isBusy = true;

    this.quickNoteService.save(this.quickNote).then((res) => {
      this.isBusy = false;
      this.dialog.close();
    }).catch((error) => {
      this.isBusy = false;
      this.toast.error({errorMessage: error});
    });
  }
}
