export interface IResponse <T>{
  statusCode: number,
  message: string | string [],
  data?:T
  error?: string
}