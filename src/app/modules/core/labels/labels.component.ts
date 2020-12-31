import {Component, OnInit} from '@angular/core';
import {Label} from '../../shared/models/label/label.model';
import {LabelService} from '../../shared/services/label.service';

@Component({
  selector: 'labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {

  labels = new Array<Label>();
  isBusy = true;

  constructor(private labelService: LabelService) {

  }

  ngOnInit(): void {
    const sub = this.labelService.getLabels().subscribe((labels) => {
      this.labels = labels;
      this.isBusy = false;
      sub.unsubscribe();
    });
  }

}
