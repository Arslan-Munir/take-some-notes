import {Component} from '@angular/core';
import {Label} from '../../shared/models/label/label.model';
import {MatDialogRef} from '@angular/material/dialog';
import {ToastService} from '../../shared/services/toast.service';
import {LabelService} from '../../shared/services/label.service';

@Component({
  selector: 'label-dialogue',
  templateUrl: './label-dialogue.component.html',
  styleUrls: ['./label-dialogue.component.scss']
})
export class LabelDialogueComponent {

  isBusy = false;
  label: Label = new Label();

  constructor(
    private dialog: MatDialogRef<LabelDialogueComponent>,
    private labelService: LabelService,
    private toast: ToastService) {

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
