/**
 * Devuelve un mock para el componente Upload
 */
export function getUploadMock() {
  return {
    Upload: () => <div data-testid="upload-icon" />,
  };
}

/**
 * Devuelve un mock para el componente Send
 */
export function getSendMock() {
  return {
    Send: () => <div data-testid="send-icon" />,
  };
}

/**
 * Devuelve un mock para el componente NoSend
 */
export function getNoSendMock() {
  return {
    NoSend: () => <div data-testid="no-send-icon" />,
  };
}
