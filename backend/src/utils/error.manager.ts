import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

// export class ErrorManager extends Error {
//   constructor({
//     type,
//     message,
//   }: {
//     type: keyof typeof HttpStatus;
//     message: string;
//   }) {
//     super(`${type} : ${message}`);
//   }

//   public static createSignatureError(message: string) {
//     const name = message.split(' : ')[0];
//     if (name) {
//       throw new HttpException(message, HttpStatus[name]);
//     } else {
//       throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }
// }

export class ErrorManager extends Error {
  constructor({
    type,
    message,
  }: {
    type: keyof typeof HttpStatus;
    message: string;
  }) {
    super(`${type} : ${message}`);
  }

  public static createSignatureError(message: string) {
    const name = message.split(' : ')[0];
    if (name) {
      throw new HttpException(message, HttpStatus[name]);
    } else {
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

@Catch(ErrorManager)
export class ErrorManagerFilter implements ExceptionFilter {
  catch(exception: ErrorManager, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const { message,name} = exception;
   
    const statusName = message.split(' : ')[0];
    const onlyMsj = message.split(' : ')[1];

    let statusCode = HttpStatus[statusName];
    let error = statusName;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      error = HttpStatus[statusCode];
    }

    response.status(statusCode).json({
      statusCode,
      error,
      message:onlyMsj,
      
    });
  }
}