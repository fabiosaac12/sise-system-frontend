import { FC, PropsWithChildren } from 'react';
import { EventualityContext } from './EventualityContext';
import { EventualityState } from '@app/models/eventuality.model';
import { useRequest } from '@app/hooks/useRequest';
import { createEventuality } from '@app/config/api/backend/requests/eventuality';

export const EventualityProvider: FC<PropsWithChildren> = ({ children }) => {
  const _createOne = useRequest(createEventuality);

  const createOne: EventualityState['createOne'] = async (data) => {
    const done = await _createOne({ data });
    return !!done;
  };

  const state: EventualityState = {
    createOne,
  };

  return (
    <EventualityContext.Provider value={state}>
      {children}
    </EventualityContext.Provider>
  );
};
