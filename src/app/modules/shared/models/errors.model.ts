export class ErrorMessages {

  private errors = new Map([
    ['code', 'details']
  ]);

  constructor(private errorCode: string) {
  }

  getErrorMessage(): string {

  }
}
