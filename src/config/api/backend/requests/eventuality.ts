import { Eventuality } from '@app/models/eventuality.model';
import { backend } from '../instance';

export const createEventuality = async ({
  data,
}: {
  data: Eventuality;
}): Promise<boolean> => {
  const response = await backend.post('event/create', {
    ...data,
    idCard: +data.idCard,
    daysOfRest: +data.daysOfRest,
  });

  return response.status === 201;
};
