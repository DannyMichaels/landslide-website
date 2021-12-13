import { AsyncFunction } from './AsyncFunction';

export default interface UseFormSubmit {
  isSent: boolean;
  submitLoading: boolean;
  submitError: Error | null;
  handleSubmit: AsyncFunction<null, null>;
  resetSubmitState: () => void;
}
