// No storage needed for calculator - pure frontend application
export interface IStorage {}

export class MemStorage implements IStorage {}

export const storage = new MemStorage();
