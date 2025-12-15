import mitt from 'mitt';

export const MittEventBusEvents = {
  /** Cookie файлы были приняты*/
  ACCEPT_COOKIE: 'ACCEPT_COOKIE',
} as const;

type MittEvents = {
  [MittEventBusEvents.ACCEPT_COOKIE]: void;
};

export const mittEmitter = mitt<MittEvents>();
