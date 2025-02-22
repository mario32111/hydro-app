export interface Stage {
    name: string;
    responsible?: string;
    completed: boolean;
    completionDate?: string;
}

export interface IrrigationSystem {
    name: string;
    progress: number;
    icon: string;
    hours: string;
}

export type RootStackParamList = {
    IrrigationDetails: { system: IrrigationSystem };
};
