import { useState, useCallback } from 'react';
import { AsyncFunction } from '../types/AsyncFunction';

type OnSubmitFn = AsyncFunction<[string], any>;

interface UseFormSubmit {
  isSent: boolean;
  submitLoading: boolean;
  submitError: Error | null;
  handleSubmit: AsyncFunction<null, null>;
}

export default function useFormSubmit(onSubmit: OnSubmitFn): UseFormSubmit {
  if (!onSubmit) {
    throw new Error('useFormSubmit error: onSubmit not passed as param');
  }

  const [isSent, setIsSent] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = useCallback(async () => {
    try {
      setSubmitLoading(true);
      await onSubmit();
      setSubmitLoading(false);
      setIsSent(true);
    } catch (error) {
      setSubmitError(error);
      setSubmitLoading(false);
      setIsSent(false);
    }
  }, [onSubmit]);

  return { isSent, submitLoading, submitError, handleSubmit };
}
