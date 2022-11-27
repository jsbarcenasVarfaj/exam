import {IRickAndMortyGetCharactersResponse} from './api.dto';

export interface IInitialState {
  rickAndMortyCharacters: IRickAndMortyGetCharactersResponse;
}

export enum EActions {
  CHARACTERS_SAVE = 'CHARACTERS_SAVE',
  CHARACTERS_ADD_NEW_RESULTS = 'CHARACTERS_ADD_NEW_RESULTS',
}

export type Actions = {type: EActions; payload: Partial<IInitialState>};
