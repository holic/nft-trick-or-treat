import { createStateContext } from "react-use";

export type Toast = {
  message: string;
};

const [useToastState, ToastProvider] = createStateContext<Toast[]>([]);

export { ToastProvider };

export const useToast = () => {
  const [toasts, setToastState] = useToastState();

  const removeToast = (toast: Toast) => {
    setToastState(toasts.filter((t) => t !== toast));
  };

  const addToast = (message: string) => {
    const toast = { message };
    setToastState((toasts) => [...toasts, toast]);
    setTimeout(() => {
      removeToast(toast);
    }, 1000 * 10);
  };

  return { toasts, addToast, removeToast };
};
