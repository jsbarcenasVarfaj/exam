import {Actions, EActions, IInitialState} from '../dto/context.dto';

export const initialState: IInitialState = {
  rickAndMortyCharacters: {
    info: {count: 0, next: '', pages: 0, prev: null},
    results: [],
  },
};

export function appReducer(
  state = initialState,
  action: Actions,
): IInitialState {
  switch (action.type) {
    case EActions.CHARACTERS_SAVE:
      return {
        ...state,
        rickAndMortyCharacters: action.payload.rickAndMortyCharacters!,
      };
    case EActions.CHARACTERS_ADD_NEW_RESULTS:
      return {
        ...state,
        rickAndMortyCharacters: {
          ...state.rickAndMortyCharacters,
          info: {...action.payload.rickAndMortyCharacters?.info!},
          results: [
            ...state.rickAndMortyCharacters.results,
            ...action.payload.rickAndMortyCharacters?.results!,
          ],
        },
      };
    default:
      return {...state};
  }
}
