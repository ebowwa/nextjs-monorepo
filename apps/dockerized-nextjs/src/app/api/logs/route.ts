import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
    try {
        const searchParams = new URL(request.url).searchParams;
        const service = searchParams.get('service') || 'web';
        const lines = parseInt(searchParams.get('lines') || '100');

        const logDir = path.join(process.cwd(), 'logs', 'app');
        const logFile = path.join(logDir, `${service}.log`);

        // Create logs directory if it doesn't exist
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }

        // If log file doesn't exist, create it
        if (!fs.existsSync(logFile)) {
            fs.writeFileSync(logFile, '');
        }

        // Read the last N lines of the log file
        const data = fs.readFileSync(logFile, 'utf-8');
        const logLines = data.split('\n').slice(-lines).join('\n');

        return NextResponse.json({
            success: true,
            logs: logLines,
            service,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error reading logs:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to read logs'
        }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { message, level = 'info', service = 'web' } = await request.json();
        
        const logDir = path.join(process.cwd(), 'logs', 'app');
        const logFile = path.join(logDir, `${service}.log`);

        // Create logs directory if it doesn't exist
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }

        // Format the log entry
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;

        // Append to log file
        fs.appendFileSync(logFile, logEntry);

        return NextResponse.json({
            success: true,
            message: 'Log entry added successfully'
        });
    } catch (error) {
        console.error('Error writing log:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to write log'
        }, { status: 500 });
    }
}
