import React from 'react';
import css from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return <span className={css.error}>{message}</span>;
};

export default ErrorMessage;
