import React from 'react';
import Authorization from './Authorization';
import List from './List';
import Ext from './Ext';
import Acc from './Acc';

import { Route, Routes } from 'react-router-dom';

export const Main = (props) => {
  return (
    <Routes>
      <Route path="/" element={<Authorization />} />
      <Route path="/main" element={<List />} />
      <Route path="/ext" element={<Ext />} />
      <Route path="/acc/:page" element={<Acc />} />
    </Routes>
  );
};
