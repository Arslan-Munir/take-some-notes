import {Component, OnInit, ViewChild} from '@angular/core';
import {NoteService} from '../../shared/services/note.service';
import {Note} from '../../shared/models/note/note.model';
import {NgxMasonryComponent} from 'ngx-masonry';
import {QuickNoteService} from '../../shared/services/quick-note.service';
import {Observable} from 'rxjs';
import {QuickNote} from '../../shared/models/label/label.model';

@Component({
  selector: 'notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes = new Array<Note>();

  isBusy = true;

  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;

  constructor(private noteService: NoteService) {

  }

  ngOnInit(): void {

    this.noteService.getUserNotes().subscribe((notes) => {
      this.notes = notes;
      this.isBusy = false;
    });
  }

  reset() {
    this.isBusy = true;
    this.masonry.reloadItems();
    this.masonry.layout();
    this.isBusy = false;
  }
}
