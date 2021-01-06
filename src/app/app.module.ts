import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AccountComponent} from './modules/identity/components/account/account.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {SpinnerComponent} from './modules/shared/components/spinner/spinner.component';
import {HomeComponent} from './modules/core/home/home.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NewNoteComponent} from './modules/core/new-note/new-note.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {NoteDialogueComponent} from './modules/core/note-dialogue/note-dialogue.component';
import {MatOptionModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';
import { NotesComponent } from './modules/core/notes/notes.component';
import { NoteComponent } from './modules/core/note/note.component';
import {NgxMasonryModule} from 'ngx-masonry';
import {LabelDialogueComponent} from './modules/core/label-dialogue/label-dialogue.component';
import {LabelsComponent} from './modules/core/labels/labels.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    SpinnerComponent,
    HomeComponent,
    NewNoteComponent,
    NotesComponent,
    LabelsComponent,
    NoteComponent,
    NoteDialogueComponent,
    LabelDialogueComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxMasonryModule,

    MatDialogModule,
    MatButtonModule,
    MatOptionModule,
    MatInputModule,
    MatFormFieldModule,
    MatSliderModule,
    MatAutocompleteModule,

    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
  ],
  entryComponents: [
    NewNoteComponent,
    NoteDialogueComponent
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    // {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}}
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
