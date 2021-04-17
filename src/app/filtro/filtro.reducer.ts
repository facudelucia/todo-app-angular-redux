import { filtrosValidos, setFiltro } from './filtro.actions';
import { createReducer, on } from '@ngrx/store';

export const initialState: filtrosValidos = 'todos'

const _filtroReducer = createReducer(initialState,
    on(setFiltro, (state: filtrosValidos, { filtro }) => filtro)
)

export function filtroReducer(state: any, action: any) {
    return _filtroReducer(state, action)
}