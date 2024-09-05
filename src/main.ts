import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
	ExpressAdapter,
	NestExpressApplication,
} from '@nestjs/platform-express';
import helmet from 'helmet';
import compression from 'compression';
import { json } from 'express';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './modules/app-config/filters/all-exceptions.filter';

async function bootstrap() {
	const PORT = process.env.PORT || 8080;
	const app = await NestFactory.create<NestExpressApplication>(
		AppModule,
		new ExpressAdapter(),
	);

	app.enableCors({
		credentials: true,
	});

	// app.use(helmet());
	app.use(compression());
	app.use(json({ limit: '30mb' }));
	// app.setGlobalPrefix('api');
	app.useGlobalFilters(new AllExceptionsFilter());

	app.enableShutdownHooks();

	await app.listen(PORT, () => Logger.log(`App running on port: ${PORT}`));
}
bootstrap();
