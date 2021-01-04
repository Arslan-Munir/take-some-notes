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

  constructor(private fireStore: AngularFirestore,
              private storageService: StorageService) {

    this.notes = this.getUserNotes();
  }

  save(note: Note): Promise<any> {
    let result: any;

    if (!note.id) {
      result = this.add(note);

    } else {
      result = this.update(note);
    }

    this.notes = this.getUserNotes();
    return result;
  }

  private getUserNotes(): Observable<Note[]> {
    const user = this.storageService.getUser();
    return this.fireStore.collection('users').doc(user).collection<Note>('notes').valueChanges({idField: 'id'});
  }

  private add(note: Note): Promise<DocumentData> {
    const user = this.storageService.getUser();
    return this.fireStore.collection('users').doc(user).collection('notes').add(this.noteToSave(note));
  }

  private update(note: Note): Promise<void> {
    const user = this.storageService.getUser();

    return this.fireStore.collection('users').doc(user).collection('notes').doc(note.id).update(this.noteToSave(note));

  }

  private noteToSave(note: Note): any {
    return {
      title: note.title,
      details: note.details,
      backgroundColor: note.backgroundColor,
      colorIdentifier: note.colorIdentifier
    };
  }
}
