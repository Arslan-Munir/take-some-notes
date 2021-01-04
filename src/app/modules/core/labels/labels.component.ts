import {Component, OnInit} from '@angular/core';
import {Label} from '../../shared/models/label/label.model';
import {LabelService} from '../../shared/services/label.service';
import {LabelDialogueComponent} from '../label-dialogue/label-dialogue.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {

  labels = new Array<Label>();
  isBusy = true;

  constructor(private labelService: LabelService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    const sub = this.labelService.getLabels().subscribe((labels) => {
      this.labels = labels;
      this.isBusy = false;
      sub.unsubscribe();
    });
  }

  openLabelDialog() {
    this.dialog.open(LabelDialogueComponent);
  }

}
