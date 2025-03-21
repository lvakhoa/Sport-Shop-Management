import { TABLE_ACTION_TYPE } from './enum'

export const fullAccessActions = [
  {
    background: '#D4E0FF',
    icon: '/icons/eye.svg',
    alt: 'view',
    type: TABLE_ACTION_TYPE.VIEW,
  },
  {
    background: '#D4FFE0',
    icon: '/icons/edit.svg',
    alt: 'edit',
    type: TABLE_ACTION_TYPE.EDIT,
  },
  {
    background: '#FFD4D7',
    icon: '/icons/delete.svg',
    alt: 'delete',
    type: TABLE_ACTION_TYPE.DELETE,
  },
]

export const viewOnlyActions = [
  {
    background: '#D4E0FF',
    icon: '/icons/eye.svg',
    alt: 'view',
    type: TABLE_ACTION_TYPE.VIEW,
  },
]

export const pageTag = [{ tag: 'customers' }, { tag: 'employees' }]
