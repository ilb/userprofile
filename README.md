# userprofile

Профиль пользователя

## Установка

### Создать базу данных

Создать базу данных, используя скрипт schema.sql.

```bash
cat sql/schema.sql | mysql -u root
```
### Создать .env файл

```bash
cp .env.example .env
```

### Создать таблицы

```bash
npx prisma db push --preview-feature
```

### Prisma Studio

```bash
npx prisma studio
```