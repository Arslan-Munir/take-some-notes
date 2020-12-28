import {Component, OnInit} from '@angular/core';
import {NoteService} from '../../shared/services/note.service';
import {Note} from '../../shared/models/note/note.model';

@Component({
  selector: 'notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes = new Array<Note>();
  isBusy = true;

  constructor(private noteService: NoteService) {

  }

  ngOnInit(): void {
    const sub = this.noteService.getNotes().subscribe((notes) => {
      this.notes = notes;
      this.isBusy = false;
      console.log(this.notes);
      sub.unsubscribe();
    });
  }

}
