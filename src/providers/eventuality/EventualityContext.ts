import { EventualityState } from '@app/models/eventuality.model';
import { createContext } from 'react';

export const EventualityContext = createContext({} as EventualityState);
