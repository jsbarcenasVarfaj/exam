import React, {createContext, useEffect, useReducer, useState} from 'react';
import {appReducer, initialState} from './appReducer';
import {Actions, EActions, IInitialState} from '../dto/context.dto';
import {getRickAndMortyCharactersApi} from '../api/api';

interface IAppContextInterface {
  children: React.ReactNode;
}

interface IContextDefaultValueInterface {
  state: IInitialState;
  dispatch: React.Dispatch<Actions>;
  makeNewQueryCharacters: (q: string) => void;
  isLoadingData: boolean;
}

export const MyAppContext = createContext<IContextDefaultValueInterface>({
  dispatch(): void {},
  isLoadingData: false,
  makeNewQueryCharacters(): void {},
  state: initialState,
});

function AppContext(props: IAppContextInterface) {
  const {children} = props;
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const makeNewQueryCharacters = async (nexTPageUrl: string) => {
    const queryFragment = /\?[a-zA-Z]+=[A-Za-z0-9]+/i.exec(nexTPageUrl);
    try {
      setIsLoadingData(true);
      if (queryFragment && !isLoadingData) {
        const res = await getRickAndMortyCharactersApi(
          String(queryFragment[0]),
        );
        dispatch({
          type: EActions.CHARACTERS_ADD_NEW_RESULTS,
          payload: {rickAndMortyCharacters: res.data},
        });
      }
    } catch (e) {
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    (async () => {
      const res = await getRickAndMortyCharactersApi();
      dispatch({
        type: EActions.CHARACTERS_SAVE,
        payload: {rickAndMortyCharacters: res.data},
      });
    })();
  }, []);

  return (
    <MyAppContext.Provider
      value={{state, dispatch, makeNewQueryCharacters, isLoadingData}}>
      {children}
    </MyAppContext.Provider>
  );
}

export default AppContext;
