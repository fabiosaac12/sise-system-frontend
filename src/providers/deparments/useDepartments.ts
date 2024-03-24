import { useContext } from 'react';
import { DepartmentContext } from './DepartmentsContext';

export const useDeparments = () => useContext(DepartmentContext);
