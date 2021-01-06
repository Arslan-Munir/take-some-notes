import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {AngularFirestore, DocumentData} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Label} from '../models/label/label.model';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor(private fireStore: AngularFirestore,
              private storageService: StorageService) {
  }

  save(label: Label): Promise<any> {
    if (!label.id) {
      return this.add(label);
    }

    return this.update(label);
  }

  getLabels(): Observable<Label[]> {
    const user = this.storageService.getUser();
    return this.fireStore.collection('users').doc(user).collection<Label>('labels').valueChanges({idField: 'id'});
  }

  private add(label: Label): Promise<DocumentData> {
    const user = this.storageService.getUser();
    return this.fireStore.collection('users').doc(user).collection('labels').add(this.labelToSave(label));
  }

  private update(label: Label): Promise<void> {
    const user = this.storageService.getUser();

    return this.fireStore.collection('users').doc(user).collection('labels').doc(label.id).update(this.labelToSave(label));

  }

  private labelToSave(label: Label): any {
    return {
      title: label.title
    };
  }
}
