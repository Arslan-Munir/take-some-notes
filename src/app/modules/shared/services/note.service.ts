import {Injectable} from '@angular/core';
import {Note} from '../models/note/note.model';
import {StorageService} from './storage.service';
import {AngularFirestore, AngularFirestoreDocument, DocumentData, QuerySnapshot} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  public notes = new Observable<Note[]>();
  private user;

  constructor(private fireStore: AngularFirestore,
              private storageService: StorageService) {

    this.notes = this.getUserNotes();
    this.user = this.storageService.getUser();
  }

  save(note: Note): Promise<any> {
    let result: any;

    if (!note.id) {
      result = this.add(note);

    } else {
      result = this.update(note);
    }

    // this.notes = this.getUserNotes();
    return result;
  }

  getUserNotes(): Observable<Note[]> {
    return this.fireStore.collection('users').doc(this.user).collection<Note>('notes').valueChanges({idField: 'id'});
  }

  delete(note: Note): Promise<void> {
    return this.fireStore.collection('users')
      .doc(this.user)
      .collection('notes')
      .doc(note.id)
      .delete();
  }

  private add(note: Note): Promise<DocumentData> {
    return this.fireStore.collection('users').doc(this.user).collection('notes').add(this.noteToSave(note));
  }

  private update(note: Note): Promise<void> {
    return this.fireStore.collection('users').doc(this.user).collection('notes').doc(note.id).update(this.noteToSave(note));

  }

  private noteToSave(note: Note): any {
    return {
      title: note.title,
      details: note.details,
      backgroundColor: note.backgroundColor,
      colorIdentifier: note.colorIdentifier,
      labels: note.labels
    };
  }
}
