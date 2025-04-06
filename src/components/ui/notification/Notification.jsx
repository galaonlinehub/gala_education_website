import { notification } from "antd";
import React from "react";

// Define types for notification parameters
/**
 * @typedef {Object} NotificationConfig
 * @property {string} message - Main notification message
 * @property {string} [description] - Optional detailed description
 * @property {number|null} [duration] - How long notification stays (null = forever)
 * @property {boolean} [closable] - Whether user can close notification
 * @property {string} [position] - Notification position ('topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'top', 'bottom')
 * @property {Object} [customStyle] - Additional custom styling
 */

const NOTIFICATION_KEY = "app-notification";

const baseStyle = {
  padding: "16px",
  paddingLeft: "0px",
  borderRadius: "8px",
  width: "400px",
  minHeight: "30px",
};

const themes = {
  error: {
    backgroundColor: "#FF0000",
    textColor: "white",
  },
  success: {
    backgroundColor: "#52c41a",
    textColor: "white",
  },
  warning: {
    backgroundColor: "#faad14",
    textColor: "white",
  },
  info: {
    backgroundColor: "#1890ff",
    textColor: "white",
  },
};

const formatContent = (text, isMessage, textColor) => (
  <span className={`text-${textColor} ${isMessage ? "text-sm" : "text-xs"}`}>
    {text}
  </span>
);

const notificationService = {
  /**
   * Display error notification
   * @param {NotificationConfig} config - Notification configuration
   */
  error: ({
    message,
    description = "Unexpected error occurred, Please try again later",
    duration = null,
    closable = false,
    position = "top",
    customStyle = {},
  }) => {
    notification.destroy();
    notification.error({
      key: NOTIFICATION_KEY,
      message: formatContent(message, true, themes.error.textColor),
      description: description
        ? formatContent(description, false, themes.error.textColor)
        : null,
      placement: position,
      style: {
        ...baseStyle,
        backgroundColor: themes.error.backgroundColor,
        ...customStyle,
      },
      closable,
      duration,
      closeIcon: null,
      className: "no-icon-notification",
      icon: <div></div>,
    });
  },

  /**
   * Display success notification
   * @param {NotificationConfig} config - Notification configuration
   */
  success: ({
    message,
    description = "",
    duration = 3,
    closable = false,
    position = "top",
    customStyle = {},
  }) => {
    notification.destroy();
    notification.success({
      key: NOTIFICATION_KEY,
      message: formatContent(message, true, themes.success.textColor),
      description: description
        ? formatContent(description, false, themes.success.textColor)
        : null,
      placement: position,
      style: {
        ...baseStyle,
        backgroundColor: themes.success.backgroundColor,
        ...customStyle,
      },
      closable,
      duration,
      closeIcon: null,
      icon: <></>,
    });
  },

  /**
   * Display warning notification
   * @param {NotificationConfig} config - Notification configuration
   */
  warning: ({
    message,
    description = "",
    duration = 5,
    closable = true,
    position = "top",
    customStyle = {},
  }) => {
    notification.destroy();
    notification.warning({
      key: NOTIFICATION_KEY,
      message: formatContent(message, true, themes.warning.textColor),
      description: description
        ? formatContent(description, false, themes.warning.textColor)
        : null,
      placement: position,
      style: {
        ...baseStyle,
        backgroundColor: themes.warning.backgroundColor,
        ...customStyle,
      },
      closable,
      duration,
      closeIcon: null,
      icon: <></>,
    });
  },

  /**
   * Display info notification
   * @param {NotificationConfig} config - Notification configuration
   */
  info: ({
    message,
    description = "",
    duration = 3,
    closable = true,
    position = "top",
    customStyle = {},
  }) => {
    notification.destroy();
    notification.info({
      key: NOTIFICATION_KEY,
      message: formatContent(message, true, themes.info.textColor),
      description: description
        ? formatContent(description, false, themes.info.textColor)
        : null,
      placement: position,
      style: {
        ...baseStyle,
        backgroundColor: themes.info.backgroundColor,
        ...customStyle,
      },
      closable,
      duration,
      closeIcon: null,
      icon: <></>,
    });
  },

  closeAll: () => {
    notification.destroy();
  },
};

export default notificationService;
