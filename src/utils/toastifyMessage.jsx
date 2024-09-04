import { toast } from "react-toastify";

export const showSuccess = (msg) => {
	toast.success(msg);
};

export const showWarning = (msg) => {
	toast.warning(msg);
};

export const showInfo = (msg) => {
	toast.info(msg);
};

export const showError = (msg) => {
	toast.error(msg);
};
