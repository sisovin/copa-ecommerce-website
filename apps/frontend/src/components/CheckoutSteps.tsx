import React from 'react';
import { Stepper, Step, StepLabel } from '@material-ui/core';

interface CheckoutStepsProps {
  activeStep: number;
}

const steps = ['Shipping Address', 'Payment Details', 'Review Order'];

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ activeStep }) => {
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CheckoutSteps;
