FROM python:3.11-slim

WORKDIR /app/

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

EXPOSE 8000

CMD ["sh", "-c", "python wait_for_db.py && python manage.py migrate && python scripts/seed_all.py && python manage.py runserver 0.0.0.0:8000"]
