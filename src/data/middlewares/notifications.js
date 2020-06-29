import { toast } from "react-toastify";
const notificationsMiddleware = () => next => action => {
  if (action.successMessage && /(.*)_(SUCCESS)/.test(action.type)) {
    toast.success(action.successMessage, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  }
  next(action);
};

export default notificationsMiddleware;
