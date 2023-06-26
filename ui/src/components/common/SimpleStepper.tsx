import { Box, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, Stepper, StepperProps } from '@chakra-ui/react';
import React from 'react';

interface Props extends Omit<StepperProps, 'children'> {
  steps: React.ReactNode[];
  index: number;
}
const SimpleStepper = ({ steps, index, ...props }: Props) => {
  return (
    <Stepper {...props} index={index} maxWidth={{ base: 325, md: 400 }} lineHeight='none' colorScheme='primary'>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
          </StepIndicator>

          <Box flexShrink='0'>
            <StepDescription>{step}</StepDescription>
          </Box>

          <StepSeparator style={{minWidth: 60}}/>
        </Step>
      ))}
    </Stepper>
  );
};

export default SimpleStepper;
