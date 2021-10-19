import { createStateContext } from "react-use";

export type Toast = {
  id: string;
  message: string;
};

const [useToastState, ToastProvider] = createStateContext<Toast[]>([]);

export { ToastProvider };

export const useToast = () => {
  const [toasts, setToastState] = useToastState();

  const removeToast = (toast: Toast) => {
    setToastState((toasts) => toasts.filter((t) => t !== toast));
  };

  const addToast = (message: string) => {
    const toast = {
      id: `${Date.now()}:${Math.random()}`,
      message,
    };
    setToastState((toasts) => [...toasts, toast]);
    setTimeout(() => {
      removeToast(toast);
    }, 1000 * 30);
  };

  return { toasts, addToast, removeToast };
};
