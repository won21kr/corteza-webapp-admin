import automation from './automation'
import settings from './settings'
import permissions from './permissions'

export default {
  compose: {
    navGroup: {
      label: 'Compose',
    },
  },

  'compose.settings': settings,
  'compose.permissions': permissions,
  'compose.automation': automation,
}
