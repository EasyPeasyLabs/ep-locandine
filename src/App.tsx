/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FlyerProvider } from './context/FlyerContext';
import { FlyerEditor } from './components/FlyerEditor';

export default function App() {
  return (
    <FlyerProvider>
      <FlyerEditor />
    </FlyerProvider>
  );
}
