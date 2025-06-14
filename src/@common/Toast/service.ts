import { Dispatch, SetStateAction } from 'react';

import { ToastState } from './types';

class ToastService {
  private setToastState: Dispatch<SetStateAction<ToastState>> = () => ({});

  init(setToastState: Dispatch<SetStateAction<ToastState>>) {
    this.setToastState = setToastState;
  }

  showToast(value: ToastState) {
    this.setToastState(value);
  }

  removeToast() {
    this.setToastState(null);
  }
}

export const toastService = new ToastService();
