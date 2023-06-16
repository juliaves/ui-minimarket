export interface AlertMessage {
  status: AlertMessageStatus;
  message: string;
}

export type AlertMessageStatus = 'ERROR' | 'SUCCESS';