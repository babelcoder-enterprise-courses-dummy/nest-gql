import {
  Catch,
  ConflictException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements GqlExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError) {
    switch (exception.code) {
      case 'P2002': {
        throw new ConflictException(exception.meta.target);
      }
      case 'P2003': {
        throw new UnprocessableEntityException();
      }
      case 'P2025': {
        throw new NotFoundException();
      }
      default:
        break;
    }
    return exception;
  }
}
