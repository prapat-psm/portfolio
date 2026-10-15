import * as migration_20261015_121333_baseline from './20261015_121333_baseline';

export const migrations = [
  {
    up: migration_20261015_121333_baseline.up,
    down: migration_20261015_121333_baseline.down,
    name: '20261015_121333_baseline'
  },
];
