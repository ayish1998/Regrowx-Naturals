'use client';

import { ReactNode } from 'react';
import Container from './Container';
import Breadcrumb from './Breadcrumb';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  background?: 'white' | 'gray' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
}

export default function PageHeader({ 
  title, 
  description, 
  breadcrumbs, 
  actions,
  background = 'white',
  size = 'md'
}: PageHeaderProps) {
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    gradient: 'bg-gradient-to-br from-primary-50 via-white to-secondary-50'
  };

  const sizeClasses = {
    sm: 'py-8 sm:py-12',
    md: 'py-12 sm:py-16',
    lg: 'py-16 sm:py-20'
  };

  return (
    <div className={`${backgroundClasses[background]} ${sizeClasses[size]} border-b border-gray-100`}>
      <Container>
        <div className="space-y-4 sm:space-y-6">
          {breadcrumbs && (
            <Breadcrumb items={breadcrumbs} />
          )}
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-2 sm:space-y-4">
              <h1 className="text-responsive-xl font-bold text-gray-900">
                {title}
              </h1>
              {description && (
                <p className="text-responsive-sm text-gray-600 max-w-3xl">
                  {description}
                </p>
              )}
            </div>
            
            {actions && (
              <div className="flex-shrink-0">
                {actions}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}