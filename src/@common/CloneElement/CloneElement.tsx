import { Fragment } from 'react';

import { CloneElementProps } from './types';

const CloneElement = ({ times, children }: CloneElementProps) => {
  if (!times) return null;

  return Array.from({ length: times }, (_, index) => (
    <Fragment key={index}>{children}</Fragment>
  ));
};

export default CloneElement;
