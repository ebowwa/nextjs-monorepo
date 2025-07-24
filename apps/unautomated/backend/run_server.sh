#!/bin/bash

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    source venv/bin/activate
fi

# Export environment variables if .env file exists
if [ -f ".env" ]; then
    export $(cat .env | xargs)
fi

# Run the FastAPI server with uvicorn
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
