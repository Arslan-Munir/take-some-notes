export class Error {

  private errors = new Map([
    ['auth/argument-error', 'Invalid credentials'],
    ['auth/wrong-password', 'Invalid credentials'],
    ['auth/user-not-found', 'Invalid credentials'],
    ['auth/weak-password', 'Password should be at least 6 characters'],
    ['auth/email-already-in-use', 'Email is already taken'],
    ['auth/too-many-requests', 'Account is temporary disable due to too many login requests. Please try latter.'],
  ]);

  getErrorDetails(errorCode): string {
    return this.errors.get(errorCode);
  }
}
