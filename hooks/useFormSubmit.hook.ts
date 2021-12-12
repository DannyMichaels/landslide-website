import { useState, useCallback } from 'react';
import { AsyncFunction } from '../types/AsyncFunction';
import UseFormSubmit from '../types/UseFormSubmit';

type OnSubmitFn = AsyncFunction<[string], { error?: string; success: boolean }>;

export default function useFormSubmit(onSubmit: OnSubmitFn): UseFormSubmit {
  if (!onSubmit) {
    throw new Error('useFormSubmit error: onSubmit not passed as param');
  }

  const [isSent, setIsSent] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = useCallback(
    async (e: Event) => {
      e.preventDefault();

      try {
        setSubmitLoading(true);
        const { error = '', success } = await onSubmit();

        if (error) {
          setIsSent(false);
          setSubmitError(error);
        } else {
          setIsSent(success);
          setSubmitError('');
        }

        setSubmitLoading(false);
      } catch (error) {
        setSubmitError(error);
        setSubmitLoading(false);
        setIsSent(false);
      }

      return null;
    },
    [onSubmit]
  );

  return { isSent, submitLoading, submitError, handleSubmit };
}
