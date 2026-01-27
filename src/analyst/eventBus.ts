import mitt from 'mitt';

export const MittEventBusEvents = {
  /** Немедленно открыть описание шагов в StepperBlock */
  OPEN_STEPPERBLOCK_STEPS: 'OPEN_STEPPERBLOCK_STEPS',
  /** Cookie файлы были приняты*/
  ACCEPT_COOKIE: 'ACCEPT_COOKIE',
} as const;

type MittEvents = {
  [MittEventBusEvents.OPEN_STEPPERBLOCK_STEPS]: void;
  [MittEventBusEvents.ACCEPT_COOKIE]: void;
};

export const mittEmitter = mitt<MittEvents>();
