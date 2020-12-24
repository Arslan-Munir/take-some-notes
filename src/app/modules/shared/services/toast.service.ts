import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Error} from '../models/error.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private errors = new Error();

  constructor(private toastService: ToastrService) {

  }

  error({errorMessage= '', errorCode=''}) {
    if (errorCode) {
      const error = this.errors.getErrorDetails(errorCode);
      this.toastService.error(error);
    } else if (errorMessage) {
      this.toastService.error(errorMessage);
    } else {
      this.toastService.error('Some unknown error occurred.');
    }
  }
}
