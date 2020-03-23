import React from 'react';
import { toast } from 'react-toastify';

import ToastContent from 'components/ToastContent';

const getConfig = (overide = {}) => ({ closeButton: false, ...overide });

export const errorToast = (text, overide) => toast.error(<ToastContent type="error" text={text} />, getConfig(overide));

export const successToast = (text, overide) => toast.success(<ToastContent type="success" text={text} />, getConfig(overide));

export const warningToast = (text, overide) => toast.warn(<ToastContent type="warning" text={text} />, getConfig(overide));

export const dismissToast = toastId => toast.dismiss(toastId);
