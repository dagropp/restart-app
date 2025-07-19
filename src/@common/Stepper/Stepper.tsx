import Button from '@common/Button';
import Typography from '@common/Typography';
import MuiStep from '@mui/material/Step';
import MuiStepLabel from '@mui/material/StepLabel';
import MuiStepper from '@mui/material/Stepper';
import { useTranslations } from '@translations';
import clsx from 'clsx';
import { cloneElement, FormEvent, useRef, useState } from 'react';

import { StepperData, StepperProps } from './types';

const Stepper = <K extends string>({
  steps,
  defaultStep,
  onFinish,
  className,
  childrenClassName,
}: StepperProps<K>) => {
  const translations = useTranslations().stepper;
  const data = useRef({} as StepperData<K>);

  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [skipped, setSkipped] = useState<Set<number>>(new Set());
  const [step, setStep] = useState(defaultStep ?? 0);

  const currentStep = steps[step];

  const isLastStep = step === steps.length - 1;

  const goToPrevStep = () => setStep((prev) => prev - 1);

  const handleStepSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      currentStep.onFinish?.(new FormData(form));
      data.current[currentStep.key] = new FormData(form);
      setCompleted((prev) => {
        const update = new Set(prev);
        update.add(step);
        return update;
      });
      if (isLastStep) {
        onFinish(data.current);
      } else {
        setStep((prev) => prev + 1);
      }
    }
  };

  const skipStep = () => {
    setSkipped((prev) => {
      const update = new Set(prev);
      update.add(step);
      return update;
    });
    setStep((prev) => prev + 1);
  };

  return (
    <form onSubmit={handleStepSubmit} className={className}>
      <MuiStepper activeStep={step}>
        {steps.map(({ key, optional, label }, index) => {
          const isCompleted = completed.has(index);
          const isCompletedOrSkippedNotActive =
            step !== index && (isCompleted || skipped.has(index));

          return (
            <MuiStep key={key} completed={isCompleted}>
              <MuiStepLabel
                role={isCompletedOrSkippedNotActive ? 'button' : undefined}
                className={clsx(
                  isCompletedOrSkippedNotActive &&
                    '!cursor-pointer hover:brightness-120 hover:underline transition',
                )}
                onClick={
                  isCompletedOrSkippedNotActive
                    ? () => setStep(index)
                    : undefined
                }
                optional={
                  optional && (
                    <Typography variant="caption">
                      {translations.optional}
                    </Typography>
                  )
                }
              >
                {label}
              </MuiStepLabel>
            </MuiStep>
          );
        })}
      </MuiStepper>

      <div className={childrenClassName}>
        {cloneElement(currentStep.element, { key: currentStep.key })}
      </div>

      <div className="flex items-center justify-between gap-4">
        <div>
          {step !== 0 && (
            <Button onClick={goToPrevStep}>{translations.back}</Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {currentStep.optional && (
            <Button onClick={skipStep}>{translations.skip}</Button>
          )}
          <Button type="submit">
            {step === steps.length - 1
              ? translations.finish
              : translations.next}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Stepper;
