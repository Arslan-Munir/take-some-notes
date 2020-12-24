import {Component, Input, OnInit} from '@angular/core';
import {Note} from '../../shared/models/note/note.model';

@Component({
  selector: 'note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Input('note') note: Note;

  constructor() {
  }

  ngOnInit(): void {
  }

}
