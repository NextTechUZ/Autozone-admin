import React from 'react';

export const samplePagesConfigs = [
  {
    path: '/sample/category',
    component: React.lazy(() => import('./Category')),
  },
  {
    path: '/sample/country',
    component: React.lazy(() => import('./Country')),
  },
  {
    path: '/sample/car',
    component: React.lazy(() => import('./Car')),
  },
  {
    path: '/sample/product',
    component: React.lazy(() => import('./Product')),
  }, 
  {
    path: '/sample/form/car',
    component: React.lazy(() => import('./forms/Car')),
  },
  {
    path: '/sample/form/category',
    component: React.lazy(() => import('./forms/Category')),
  },
  {
    path: '/sample/form/country',
    component: React.lazy(() => import('./forms/Country')),
  },
  {
    path: '/sample/form/product',
    component: React.lazy(() => import('./forms/Product')),
  },
];
