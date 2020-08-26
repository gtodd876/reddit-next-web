import { Box } from '@chakra-ui/core';
import { ReactNode } from 'react';

interface wrapperProps {
  variant?: 'regular' | 'small';
  children: ReactNode;
}

export default function Wrapper({
  children,
  variant = 'regular',
}: wrapperProps) {
  return (
    <Box
      maxW={variant === 'regular' ? '800px' : '400px'}
      w="100%"
      mx="auto"
      mt={8}
    >
      {children}
    </Box>
  );
}
