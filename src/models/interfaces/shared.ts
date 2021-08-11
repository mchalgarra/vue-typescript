export interface ISnackbarData {
  text: string;
  color: string;
  timeout?: number;
  show: false;
}

export interface ISharedState {
  snackbar: ISnackbarData;
  isLoading: boolean;
}

export interface ISharedGetters {
  snackbar(state: ISharedState): ISnackbarData;
  isLoading(state: ISharedState): boolean;
}

export interface IShowSnackbarPayload {
  text: string;
  color: string;
  timeout?: number;
}
