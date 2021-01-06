import {Component, Inject, OnInit} from '@angular/core';
import {Label} from '../../shared/models/label/label.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastService} from '../../shared/services/toast.service';
import {LabelService} from '../../shared/services/label.service';

@Component({
  selector: 'label-dialogue',
  templateUrl: './label-dialogue.component.html',
  styleUrls: ['./label-dialogue.component.scss']
})
export class LabelDialogueComponent implements OnInit{

  isBusy = false;
  label: Label = new Label();

  constructor(
    private dialog: MatDialogRef<LabelDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogueLabel: Label,
    private labelService: LabelService,
    private toast: ToastService) {

  }

  ngOnInit(): void {
    if (this.dialogueLabel) {
      this.label = this.dialogueLabel;
    }
  }

  saveLabel() {
    if (!this.label.title) {
      this.toast.error({errorMessage: 'Please write something to save.'});
      return;
    }

    this.isBusy = true;

    this.labelService.save(this.label).then((res) => {
      this.isBusy = false;
      this.dialog.close();
    }).catch((error) => {
      this.isBusy = false;
      this.toast.error({errorMessage: error});
    });
  }
}
