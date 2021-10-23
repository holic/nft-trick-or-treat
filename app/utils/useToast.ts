import { createStateContext, useMountedState } from "react-use";

export type Toast = {
  id: string;
  message: string;
};

const [useToastState, ToastProvider] = createStateContext<Toast[]>([]);

export { ToastProvider };

export const useToast = () => {
  const isMounted = useMountedState();
  const [toasts, setToastState] = useToastState();

  const removeToast = (toast: Toast) => {
    if (!isMounted) return;
    setToastState((toasts) => toasts.filter((t) => t !== toast));
  };

  const addToast = (message: string) => {
    if (!isMounted) return;
    const toast = {
      id: `${Date.now()}:${Math.random()}`,
      message,
    };
    setToastState((toasts) => [...toasts, toast]);
    setTimeout(() => {
      if (!isMounted) return;
      removeToast(toast);
    }, 1000 * 30);
  };

  return { toasts, addToast, removeToast };
};
