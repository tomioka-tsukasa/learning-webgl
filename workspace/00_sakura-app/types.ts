export type Setup = (
) => void

export type DatGuiParams = {
  group: string,
  child?: {
    [key: string]: Member
  }
}

type Member = {
  target: {
    [key: string]: unknown;
  };
  min?: number;
  max?: number;
}
