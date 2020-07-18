export interface BusState {
  updatePeriod: number;
  isActive: boolean;
}

export type BusStateCmd = Partial<BusState>;
