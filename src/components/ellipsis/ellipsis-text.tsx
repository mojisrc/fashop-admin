import React from 'react';
import isString from 'lodash/isString';
import { TooltipPlus } from './tooltip';
import { getStrFullLength, cutStrByFullLength } from './utils';

interface IProps {
  className?: string;
  length: number;
  tooltip: boolean;
  text: string;
  fullWidthRecognition?: boolean;
}

export const EllipsisText: React.FC<IProps> = (props) => {
  const {
    className,
    tooltip,
    text,
    length,
    fullWidthRecognition
  } = props;

  if (!isString(text)) {
    throw new Error('Ellipsis children must be string.');
  }

  const textLength = fullWidthRecognition
    ? getStrFullLength(text)
    : text.length;

  if (textLength <= length || length < 0) {
    return (
      <span className={className}>
        {text}
      </span>
    )
  }

  const tail = '...';
  let displayText;
  if (length - tail.length <= 0) {
    displayText = '';
  } else {
    displayText = fullWidthRecognition
      ? cutStrByFullLength(text, length)
      : text.slice(0, length);
  }

  return (
    <TooltipPlus tooltip={tooltip} title={text}>
      <span className={className}>
        {displayText}
        {tail}
      </span>
    </TooltipPlus>
  );
};
