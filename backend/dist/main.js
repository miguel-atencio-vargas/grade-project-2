"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableVersioning({
        defaultVersion: '1',
        type: common_1.VersioningType.URI,
    });
    app.setGlobalPrefix('api');
    app.enableCors({ origin: true });
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    const configService = app.get((config_1.ConfigService));
    const port = configService.get('api_port');
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map