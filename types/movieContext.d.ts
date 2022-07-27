interface IMovieContext {
  isLogged: boolean;
  setIsLogged: (c: boolean) => void;
  storeLoginData: (c: any) => void;
  isLoading: boolean;
  setIsLoading: (c: boolean) => void;
  logout: () => void;
}
