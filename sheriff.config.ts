import { noDependencies, sameTag, SheriffConfig } from '@softarc/sheriff-core';

export const config: SheriffConfig = {
  entryFile: 'src/main.ts',
  enableBarrelLess: true,
  encapsulatedFolderNameForBarrelLess: 'internal',
  modules: {
    'src/app': {
      'core/feat-<name>': ['core', 'type:feature'],
      'core/<type>': ['core', 'type:<type>'],
      'shared/<type>': ['shared', 'type:<type>'],
      domains: {
        '<domain>/feat-<name>': ['domain:<domain>', 'type:feature'],
        '<domain>/<type>': ['domain:<domain>', 'type:<type>'],
      },
    },
  },
  depRules: {
    root: ['type:api', 'core', 'shared', ({ to }) => to.startsWith('domain')],
    core: [sameTag, 'shared', 'root', 'noTag'],
    'domain:*': [sameTag, 'shared', 'root', 'noTag'],
    'type:api': ['type:feature', 'type:ui'],
    'type:feature': ['type:model', 'type:ui', 'type:data', 'type:security'],
    'type:data': ['type:model', 'root'],
    'type:ui': ['type:model'],
    'type:model': noDependencies,
    'type:security': ['root'],
    shared: ['shared', 'root'],
  },
};
