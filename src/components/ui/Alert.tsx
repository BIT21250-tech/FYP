import { AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type: AlertType;
  message: string;
  onDismiss?: () => void;
}

const Alert = ({ type, message, onDismiss }: AlertProps) => {
  const alertStyles = {
    success: {
      bg: 'bg-success-100',
      border: 'border-success-300',
      text: 'text-success-500',
      icon: <CheckCircle className="h-5 w-5 text-success-500" />,
    },
    error: {
      bg: 'bg-error-100',
      border: 'border-error-300',
      text: 'text-error-500',
      icon: <XCircle className="h-5 w-5 text-error-500" />,
    },
    warning: {
      bg: 'bg-warning-100',
      border: 'border-warning-300',
      text: 'text-warning-500',
      icon: <AlertCircle className="h-5 w-5 text-warning-500" />,
    },
    info: {
      bg: 'bg-secondary-100',
      border: 'border-secondary-300',
      text: 'text-secondary-500',
      icon: <Info className="h-5 w-5 text-secondary-500" />,
    },
  };

  const styles = alertStyles[type];

  return (
    <div className={`${styles.bg} ${styles.border} border px-4 py-3 rounded-md flex items-start`}>
      <div className="flex-shrink-0 mr-3 pt-0.5">{styles.icon}</div>
      <div className="flex-grow">
        <p className={`${styles.text} text-sm font-medium`}>{message}</p>
      </div>
      {onDismiss && (
        <button
          type="button"
          className={`flex-shrink-0 ${styles.text} hover:opacity-75 focus:outline-none ml-2`}
          onClick={onDismiss}
        >
          <span className="sr-only">Dismiss</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Alert;