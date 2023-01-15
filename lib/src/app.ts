import cors from "cors";
import C from "./constants";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import * as path from "path";
import { IAppOptions } from "./interfaces";
import express, { Application } from "express";
import { Logger, LoggerStream } from "./helpers";
import { GlobalErrorHandler } from "./middlewares";
import webpush from "web-push";

dotenv.config({ path: `${process.env.PWD}/.env` });

const allowedOrigins = ['http://localhost:3000', 'https://house-of-sound-bouncei.vercel.app'];
export abstract class AbstractApp {

    readonly engine: Application;
    readonly inProduction: boolean;
    protected readonly port: number;
    protected options: IAppOptions;
    protected connection: any;

    

    constructor(engine: Application, port: number, options?: IAppOptions) {
        this.engine = engine;
        this.port = port;
        this.options = options || {};
        this.inProduction = process.env.NODE_ENV === C.Environment.PRODUCTION;
    }

    protected abstract setupDependencies(): Promise<void>;

    protected abstract installRoutes(): void;

    protected configure(): void {
        const {
            urlencodExtended = true,
            requestSizeLimit = "20mb",
            compression: compressionOption,
            cors: corsOption = {
                allowedHeaders: [
                    'Origin',
                    'X-Requested-With',
                    'Content-Type',
                    'Accept',
                    'X-Access-Token',
                    'X-Auth-Token',
                    'Authorization',
                    'Accept-Encoding',
                    'Connection',
                    'Content-Length'
                ],
                credentials: true,
                methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
                origin: allowedOrigins,
                preflightContinue: false,
            },
            errors: errorOption,
        } = this.options;

        
        this.engine.use(helmet());
        // this.engine.use(helmet({
        //     crossOriginResourcePolicy: false,
        //   }));
        this.engine.use(cookieParser());
        this.engine.use(helmet.hidePoweredBy());
        this.engine.use(cookieParser());
        this.engine.use(cors(corsOption));
        this.engine.use(compression(compressionOption));
        this.engine.use(express.json({ limit: requestSizeLimit }));
        this.engine.use(express.urlencoded({ limit: requestSizeLimit, extended: urlencodExtended }));
        this.engine.use(express.static(path.join(process.cwd(), 'public')));

        if (!["staging", "production"].includes(<string>process.env.NODE_ENV)) {
            this.engine.use(morgan("combined", { stream: LoggerStream }));
        }

        this.installRoutes();

        this.engine.use(GlobalErrorHandler);
    }

    async initialize() {
        await this.setupDependencies();
        this.configure();
    }


    run(): void {
        this.connection = this.engine.listen(this.port, () => {
            Logger.info(`App now running on port ${this.port}`);
        });
    }
    webpush(): void {
        //storing the keys in variables
        const publicVapidKey = 'BKxnAPW0YkkmoRUasp8zMqVthI2Ir69nSNoprsex2Jf0z6pWPKr7T_qOhx-fU7kkSg1wl-AX9HuNSVZxj6t1F3c';
        const privateVapidKey = 'hNpkFZkwgSycgTzbUMjXyFrSEL2HuH9NyTx6Txr_EyE';

        //setting vapid keys details
        webpush.setVapidDetails('mailto:mail@thoseapp.com', publicVapidKey, privateVapidKey);
    }

    close() {
        this.connection?.close();
    }
}
