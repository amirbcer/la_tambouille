import { useState } from 'react';
import { Alert, Toast } from 'react-daisyui';

type ToastOptions = {
  message: string;
  type: 'success' | 'error';
  duration?: number;
};

function useToast() {
  const [toast, setToast] = useState<ToastOptions | null>(null);

  const showToast = (options: ToastOptions) => {
    setToast(options);
    const duration = options.duration || 3000;
    setTimeout(() => setToast(null), duration);
  };

  const ToastComponent = () => {
    if (!toast) return null;

    return (
      <Toast vertical="bottom" horizontal="end">
        <Alert status={toast.type} className={`font-semibold text-white`}>
          {toast.message}
        </Alert>
      </Toast>
    );
  };

  return { showToast, ToastComponent };
}

export default useToast;
