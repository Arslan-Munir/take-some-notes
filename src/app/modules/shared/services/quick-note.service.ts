import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {AngularFirestore, DocumentData} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {QuickNote} from '../models/label/label.model';

@Injectable({
  providedIn: 'root'
})
export class QuickNoteService {

  constructor(private fireStore: AngularFirestore,
              private storageService: StorageService) {
  }

  save(quickNote: QuickNote): Promise<any> {
    if (!quickNote.id) {
      return this.add(quickNote);
    }

    return this.update(quickNote);
  }

  getQuickNotes(): Observable<QuickNote[]> {
    const user = this.storageService.getUser();
    return this.fireStore.collection('users')
      .doc(user)
      .collection<QuickNote>('quick-notes')
      .valueChanges({idField: 'id'});
  }

  private add(quickNote: QuickNote): Promise<DocumentData> {
    const user = this.storageService.getUser();
    return this.fireStore.collection('users')
      .doc(user)
      .collection('quick-notes')
      .add(this.quickNoteToSave(quickNote));
  }

  private update(quickNote: QuickNote): Promise<void> {
    const user = this.storageService.getUser();

    return this.fireStore.collection('users')
      .doc(user)
      .collection('quick-notes')
      .doc(quickNote.id)
      .update(this.quickNoteToSave(quickNote));

  }

  private quickNoteToSave(quickNote: QuickNote): any {
    return {
      details: quickNote.details
    };
  }
}
