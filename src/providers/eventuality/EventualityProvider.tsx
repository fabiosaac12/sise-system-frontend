import { FC, PropsWithChildren, useState } from 'react';
import { EventualityContext } from './EventualityContext';
import { EmployeeData, EventualityState } from '@app/models/eventuality.model';
import { useRequest } from '@app/hooks/useRequest';
import {
  createEventuality,
  getEmployee as getEmployeeApi,
} from '@app/config/api/backend/requests/eventuality';

export const EventualityProvider: FC<PropsWithChildren> = ({ children }) => {
  const [employee, setEmployee] = useState<EmployeeData>();

  const _getEmployee = useRequest(getEmployeeApi);
  const _createOne = useRequest(createEventuality);

  const createOne: EventualityState['createOne'] = async (data) => {
    const done = await _createOne({ data });
    return !!done;
  };
  const getEmployee: EventualityState['getEmployee'] = async (idCard) => {
    const response = await _getEmployee({ idCard });

    if (response) {
      setEmployee(response);
      return response;
    }
  };

  const state: EventualityState = {
    employee,
    getEmployee,
    createOne,
  };

  return (
    <EventualityContext.Provider value={state}>
      {children}
    </EventualityContext.Provider>
  );
};
