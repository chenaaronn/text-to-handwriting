FROM python:3.9-slim

WORKDIR /ml

RUN pip install --no-cache-dir poetry

COPY pyproject.toml poetry.lock* ./
RUN poetry config virtualenvs.create false && \
	poetry install --no-interaction --no-ansi --no-root

COPY . .

CMD ["bash"] 