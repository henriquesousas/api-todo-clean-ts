export interface Hash {
  create(value: string): Promise<string>;
}