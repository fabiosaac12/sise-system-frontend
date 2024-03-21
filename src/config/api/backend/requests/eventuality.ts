import { EmployeeData, Eventuality } from '@app/models/eventuality.model';
import { backend } from '../instance';

export const createEventuality = async ({
  data,
}: {
  data: Eventuality;
}): Promise<boolean> => {
  const response = await backend.post('event/create', {
    ...data,
    idCard: +data.idCard,
  });

  return response.status === 201;
};

export const getEmployee = async ({
  idCard,
}: {
  idCard: number;
}): Promise<EmployeeData | undefined> => {
  const response = await backend.get<{ employee: EmployeeData }>(
    `employee/${idCard}`
  );

  return response.data.employee;
};
