import { useContext } from 'react';
import { EventualityContext } from './EventualityContext';

export const useEventuality = () => useContext(EventualityContext);
