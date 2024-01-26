import React from 'react';
import {MdCategory,  MdProductionQuantityLimits} from 'react-icons/md';
import { FaCarSide, FaFlag } from "react-icons/fa";

const routesConfig = [
  {
    id: 'app',
    title: 'Sample',
    messageId: 'sidebar.sample',
    type: 'group',
    children: [
      {
        id: 'category',
        title: 'Category',
        messageId: 'sidebar.sample.page1',
        type: 'item',
        icon:<MdCategory />,
        path: '/sample/category',
      },
      {
        id: 'country',
        title: 'Country',
        messageId: 'sidebar.sample.page2',
        type: 'item',
        icon: <FaFlag />,
        path: '/sample/country',
      },
      {
        id: 'car',
        title: 'Car',
        messageId: 'sidebar.sample.page3',
        type: 'item',
        icon: <FaCarSide />,
        path: '/sample/car',
      },
      {
        id: 'product',
        title: 'Product',
        messageId: 'sidebar.sample.page4',
        type: 'item',
        icon: <MdProductionQuantityLimits />,
        path: '/sample/product',
      },
    ],
  },
 
];
export default routesConfig;
