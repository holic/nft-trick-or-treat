import { Transition } from "@headlessui/react";
import { useToast } from "@app/utils/useToast";

export const Toasts = () => {
  const { toasts, removeToast } = useToast();

  return (
    <Transition appear show={toasts.length > 0}>
      <div className="pointer-events-none fixed bottom-0 right-0 z-10 p-4 flex flex-col items-end justify-end max-w-sm gap-2">
        {toasts.map((toast) => (
          <Transition.Child
            key={toast.id}
            className="pointer-events-auto bg-black bg-opacity-80 backdrop-blur-sm shadow-xl rounded-md px-3 py-2 cursor-pointer hover:opacity-60 transition duration-100 text-gray-200"
            enter="ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-50"
            onClick={() => removeToast(toast)}
          >
            {toast.message}
          </Transition.Child>
        ))}
      </div>
    </Transition>
  );
};
