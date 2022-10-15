export interface FetchDetails<Data = any> {
  message: string;
  statusCode: number;
  details: Data;
}

export interface FetchOk {
  message: string;
  statusCode: number;
}
