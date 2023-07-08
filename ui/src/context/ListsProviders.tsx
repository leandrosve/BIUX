// authentication-core/context/AuthContext.tsx
import React, { PropsWithChildren } from 'react';
import { ReducedRoutine } from '../model/routines/Routine';
import InstructorService from '../services/api/InstructorService';
import useGenericList, { GenericListProps } from '../hooks/useGenericList';

interface ID {
  id?: string | number;
}

function createGenericListContext<T extends ID>() {
  return React.createContext<GenericListProps<T>>({
    data: [],
    loading: false,
    page: 1,
    onPageChange: () => {},
    onUpdate: () => {},
    fetch: () => {},
    initialized: false,
    searchText: '',
    onSearchTextChange: () => {},
  });
}

export const InstructorRoutinesContext = createGenericListContext<ReducedRoutine>();
export const InstructorRoutinesProvider = (props: PropsWithChildren) => {
  const list = useGenericList<ReducedRoutine>(() => InstructorService.getRoutines());
  return <InstructorRoutinesContext.Provider value={list}>{props.children}</InstructorRoutinesContext.Provider>;
};