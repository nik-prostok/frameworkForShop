import 'izitoast/dist/css/iziToast.min.css';
import iZtoast from 'izitoast';

const toast = {
  error: (message, title = 'Error') => iZtoast.error({
    title,
    message,
    position: 'bottomRight',
  }),
  success: (message, title = 'Success') => iZtoast.success({
    title,
    message,
    position: 'bottomRight',
  }),
};

export default toast;
