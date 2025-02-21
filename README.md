### Необходимые зависимости:

> - `node    v20.16.0+`
> - `npm     v10.8.1+`

### ENV переменные
> - `VITE_API_BASE_URL=` урл для api запросов
> - `VITE_API_STATIC_URL=` урл для запроса медиа файлов
> - `VITE_INITIAL_DATA_MOCK=` если значение true, тогда будет использоваться моковая window.__INITIAL_DATA__ (для теста сборки)

### Установка зависимостей:

```bash
npm install
```

### Запуск dev версии

```bash
npm run dev
```

Приложение запустится на `http://localhost:5173`.

### Сборка билда

```bash
npm run build
```

### Билд

Итоговый билд будет находится в папке build/client

