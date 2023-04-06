import React from "react";
import { toast } from "react-hot-toast";
import { XMarkIcon } from "@heroicons/react/20/solid";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { Spinner } from "~~/components/Spinner";

type TPositions = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

type TNotificationProps = {
  content: React.ReactNode;
  status: "success" | "info" | "loading" | "error" | "warning";
  duration?: number;
  icon?: string;
  position?: TPositions;
};

type NotificationOptions = {
  duration?: number;
  icon?: string;
  position?: TPositions;
};

const ENUM_STATUSES = {
  success: <CheckCircleIcon className="w-7 text-success" />,
  loading: <Spinner />,
  error: <ExclamationCircleIcon className="w-7 text-error" />,
  info: <InformationCircleIcon className="w-7 text-info" />,
  warning: <ExclamationTriangleIcon className="w-7 text-warning" />,
};

const DEFAULT_DURATION = 3000;
const DEFAULT_POSITION: TPositions = "top-center";

/**
 * Custom Notification
 */

export const notification = {
  success: (content: React.ReactNode, options?: NotificationOptions) => {
    return toast.success("Transaction successful");
  },
  info: (content: React.ReactNode, options?: NotificationOptions) => {
    return console.log(content)
  },
  warning: (content: React.ReactNode, options?: NotificationOptions) => {
    return console.warn(content);
    ;
  },
  error: (content: React.ReactNode, options?: NotificationOptions) => {
    return toast.error("Invalid Operation, Check console for reason");
  },
  loading: (content: React.ReactNode, options?: NotificationOptions) => {
    return toast.loading("Loading...");
  },
  remove: (toastId: string) => {
    toast.remove(toastId);
  },
};