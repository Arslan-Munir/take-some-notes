export class Note {
  id: string;
  title: string;
  details: string;
  backgroundColor: string;
  colorIdentifier: string;
  labels: Array<string>;

  constructor() {
    this.title = '';
    this.details = '';
    this.backgroundColor = '';
    this.colorIdentifier = '';
    this.labels = new Array<string>();
  }
}
