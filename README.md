### Необходимые зависимости:

> - `node    v20.16.0+`
> - `npm     v10.8.1+`

### Установка зависимостей:

```bash
npm install
```

### Сборка и запуск билда

```bash
npm run build
npm run start
```

Приложение запустится на `http://localhost:5173`.

### Docker Deployment

Сборка и запуск, используя Docker:

```bash
# For npm
docker build -t my-app .
docker run -p 3000:3000 my-app
```
