import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {IRickAndMortyGetCharactersResponse} from '../dto/api.dto';

const request: AxiosInstance = axios.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
  baseURL: 'https://rickandmortyapi.com/api',
});

export const getRickAndMortyCharactersApi = (
  queryFragment?: string,
): Promise<AxiosResponse<IRickAndMortyGetCharactersResponse>> => {
  return request.get(`/character${queryFragment ? `/${queryFragment}` : ''}`);
};
