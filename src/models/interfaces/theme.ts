export interface IThemeState {
  theme: 'light' | 'dark';
}

export interface IThemeGetters {
  theme(state: IThemeState): string;
  isLight(state: IThemeState): boolean;
  isDark(state: IThemeState): boolean;
}
