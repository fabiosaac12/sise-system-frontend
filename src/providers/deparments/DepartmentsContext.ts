import { DepartmentState } from '@app/models/department.model';
import { createContext } from 'react';

export const DepartmentContext = createContext({} as DepartmentState);
