export interface ResponseType {
  statusCode: 200 | 201 | 202,
  data: unknown,
  meta?: unknown,
}

export interface ErrorType {
  statusCode: 412 | 418 | 401 | 403 | 404 | 503 | 500,
  details: string | Array<{'field': string, 'message': string}>,
  meta?: unknown,
}

export type ApiMeta = { [key: string]: unknown }

export type RequestPayload = {
  name: string;
  pending: boolean;
  error: ErrorType | null;
  meta: ApiMeta;
}

export type UpdateMetaPayload = {
  serviceKey: string;
  meta: ApiMeta;
}

export type ErrorActionPayloadType = {
  error: ErrorType,
  meta: ApiMeta,
}

export interface StandardAction<PayloadType = unknown> {
  type: string;
  payload: PayloadType;
}

export interface ApiPayload<ServiceKeyType = unknown, DataType = unknown, SuccessActionPayloadType = unknown, ErrorActionPayloadType = unknown> {
  serviceKey: keyof ServiceKeyType;
  data: DataType;
  preSendActionCreator?: (data: DataType) => StandardAction<DataType>;
  successActionCreator?: (data: SuccessActionPayloadType) => StandardAction<SuccessActionPayloadType>;
  errorActionCreator?: (data: ErrorActionPayloadType) => StandardAction<ErrorActionPayloadType>;
  pollCount?: number;
  meta?: ApiMeta;
}

// Store

export interface RequestManagementStore { [key: string]: ErrorType | ApiMeta | boolean | null | undefined }

// Others

export type SagaGenerator = Generator<unknown, void, unknown>

export interface DispatchResponse<RequestManagementStore, T = unknown> {
  type: string;
  dispatch: (payload?: T) => StandardAction<T | undefined>;
  reducer: (state: RequestManagementStore, payload: T) => RequestManagementStore;
}

export type DispatcherSet = { [key: string]: DispatchResponse<RequestManagementStore, unknown> }
