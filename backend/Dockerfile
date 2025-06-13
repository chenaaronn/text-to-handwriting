FROM python:3.9-slim

WORKDIR /app

# Install Poetry
RUN pip install --no-cache-dir poetry

# Copy only requirements first for caching
COPY pyproject.toml poetry.lock* ./
RUN poetry config virtualenvs.create false && \
	poetry install --no-interaction --no-ansi --no-root

# Copy the rest of the code
COPY . .

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"] 