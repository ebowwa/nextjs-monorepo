type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
    private static instance: Logger;
    private service: string;

    private constructor(service: string = 'web') {
        this.service = service;
    }

    public static getInstance(service?: string): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger(service);
        }
        return Logger.instance;
    }

    private async logToFile(level: LogLevel, message: string | object) {
        try {
            const formattedMessage = typeof message === 'object' 
                ? JSON.stringify(message) 
                : message;

            await fetch('/api/logs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: formattedMessage,
                    level,
                    service: this.service,
                }),
            });
        } catch (error) {
            console.error('Failed to write to log file:', error);
        }
    }

    public async debug(message: string | object) {
        console.debug(message);
        await this.logToFile('debug', message);
    }

    public async info(message: string | object) {
        console.info(message);
        await this.logToFile('info', message);
    }

    public async warn(message: string | object) {
        console.warn(message);
        await this.logToFile('warn', message);
    }

    public async error(message: string | object) {
        console.error(message);
        await this.logToFile('error', message);
    }

    public async log(level: LogLevel, message: string | object) {
        await this.logToFile(level, message);
    }
}

export const logger = Logger.getInstance();
