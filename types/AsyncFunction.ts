export type AsyncFunction<Args, PromiseResult> = (
  ...args: Array<Args>
) => Promise<PromiseResult>;
