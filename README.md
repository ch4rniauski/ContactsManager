# Contacts Manager

Приложение для управления контактами. В проекте есть backend на ASP.NET Core, frontend на React + Vite.

## Запуск в Docker

### Что должно быть установлено

- Docker 24+
- Docker Compose v2

### Команда запуска

```bash
docker compose up --build
```

### Адреса после запуска

- Frontend: http://localhost:3000
- Backend: http://localhost:8080

---

## Локальное развёртывание

### Что должно быть установлено

- Node.js 22.x и npm
- .NET SDK 10.x
- PostgreSQL 14.23 (или совместимая 14.x)

### Запуск backend

```bash
cd backend/ContactsManager.Api
dotnet run
```

По умолчанию backend запускается на:

- http://localhost:5109

### Запуск frontend

```bash
cd frontend
npm install
npm run dev
```

По умолчанию frontend запускается на:

- http://localhost:5173

---

## Что нужно изменить для локального запуска

### 1. Frontend -> Backend

Если frontend запускается локально, нужно изменить адрес backend в файле:

```text
frontend -> src -> lib -> contactsApi.js
```

Сейчас для Docker используется:

```javascript
baseURL: "http://127.0.0.1:8080";
```

Для локальной разработки нужно поставить:

```javascript
baseURL: "http://localhost:5109";
```

### 2. Backend -> Database

Если backend запускается локально, нужно изменить строку подключения в файле:

```text
backend -> ContactsManager.Api -> appsettings.json
```

Для Docker используется:

```json
"Host=postgresql;Port=5432;Database=Contacts;Username=postgres;Password=5432"
```

Для локальной разработки нужно использовать локальный PostgreSQL, например:

```json
"Host=localhost;Port=5432;Database=Contacts;Username=postgres;Password=5432"
```

---

## Важно

- В Docker-режиме адреса должны оставаться Docker-ориентированными.
- Для локальной разработки нужно использовать локальные адреса:
  - frontend -> backend: `http://localhost:5109`
  - backend -> database: `localhost:5432`
- Если вы меняете backend-адрес в frontend, убедитесь, что он совпадает с портом, на котором реально запущен backend.
