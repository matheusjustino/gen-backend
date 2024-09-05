import { Catch, ExceptionFilter, Logger } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	private readonly logger = new Logger(AllExceptionsFilter.name);

	public catch(exception: any) {
		this.logger.error(exception);

		return exception;
	}
}
