import {Injectable} from '@angular/core';
import {Note} from '../models/note/note.model';
import {StorageService} from './storage.service';
import {AngularFirestore, AngularFirestoreDocument, DocumentData, QuerySnapshot} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private notes = new Array<Note>();

  constructor(private fireStore: AngularFirestore,
              private storageService: StorageService) {
  }

  save(note: Note): Promise<DocumentData> {
    const user = this.storageService.getUser();
    return this.fireStore.collection('users').doc(user).collection('notes').add({
      title: note.title,
      details: note.details
    });
  }

  getNotes(): Observable<Note[]> {
    const user = this.storageService.getUser();
    return this.fireStore.collection('users').doc(user).collection<Note>('notes').valueChanges({idField: 'id'});
  }
}