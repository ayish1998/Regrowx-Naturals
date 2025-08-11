'use client';

import { ReactNode } from 'react';
import { clsx } from 'clsx';
import Container from './Container';

interface SectionProps {
  children: ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'white' | 'gray' | 'primary' | 'gradient';
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  id?: string;
}

export default function Section({ 
  children, 
  padding = 'lg',
  background = 'white',
  containerSize = 'lg',
  className = '',
  id
}: SectionProps) {
  const paddingClasses = {
    none: '',
    sm: 'py-8 sm:py-12',
    md: 'py-12 sm:py-16',
    lg: 'py-16 sm:py-20 lg:py-24',
    xl: 'py-20 sm:py-24 lg:py-32'
  };

  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-primary-50',
    gradient: 'bg-gradient-to-br from-primary-50 via-white to-secondary-50'
  };

  return (
    <section 
      id={id}
      className={clsx(
        paddingClasses[padding],
        backgroundClasses[background],
        className
      )}
    >
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  );
}