# 📤 Инструкция по загрузке проекта на GitHub

Пошаговое руководство по загрузке проекта МатКвест на GitHub.

## 🚀 Быстрый старт

### 1. Создайте аккаунт на GitHub (если ещё нет)
Перейдите на [github.com](https://github.com) и зарегистрируйтесь.

### 2. Установите Git (если ещё не установлен)

**Windows:**
Скачайте с [git-scm.com](https://git-scm.com/download/win)

**macOS:**
```bash
brew install git
```

**Linux:**
```bash
sudo apt-get install git
```

### 3. Настройте Git
```bash
git config --global user.name "Ваше Имя"
git config --global user.email "ваш@email.com"
```

## 📦 Загрузка проекта

### Способ 1: Через веб-интерфейс GitHub (проще)

1. **Создайте новый репозиторий:**
   - Перейдите на [github.com/new](https://github.com/new)
   - Название: `matquest` (или любое другое)
   - Описание: `Интерактивный репетитор по математике для детей`
   - Выберите Public или Private
   - **НЕ** ставьте галочки "Initialize with README" (у нас уже есть)
   - Нажмите "Create repository"

2. **Загрузите файлы через браузер:**
   - На странице репозитория нажмите "uploading an existing file"
   - Перетащите все файлы проекта (кроме `node_modules`)
   - Или используйте архив: создайте ZIP без `node_modules` и загрузите
   - Нажмите "Commit changes"

### Способ 2: Через командную строку (рекомендуется)

1. **Откройте терминал в папке проекта:**
```bash
cd путь/к/проекту/matquest
```

2. **Инициализируйте Git:**
```bash
git init
```

3. **Добавьте все файлы:**
```bash
git add .
```

4. **Сделайте первый коммит:**
```bash
git commit -m "Initial commit: МатКвест - интерактивный репетитор по математике"
```

5. **Переименуйте ветку в main:**
```bash
git branch -M main
```

6. **Добавьте удалённый репозиторий:**
```bash
git remote add origin https://github.com/ВАШ_USERNAME/matquest.git
```
Замените `ВАШ_USERNAME` на ваш логин GitHub.

7. **Отправьте код на GitHub:**
```bash
git push -u origin main
```

## 🌐 Деплой на GitHub Pages

Чтобы сделать сайт доступным по адресу `https://ВАШ_USERNAME.github.io/matquest`:

### 1. Установите gh-pages:
```bash
npm install --save-dev gh-pages
```

### 2. Откройте `package.json` и добавьте:
```json
{
  "homepage": "https://ВАШ_USERNAME.github.io/matquest",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### 3. Задеплойте:
```bash
npm run deploy
```

### 4. Настройте GitHub Pages:
1. Перейдите в Settings вашего репозитория
2. Найдите раздел "Pages"
3. В "Source" выберите "Deploy from a branch"
4. Выберите ветку `gh-pages` и папку `/ (root)`
5. Нажмите "Save"

Через 1-2 минуты сайт будет доступен по адресу:
`https://ВАШ_USERNAME.github.io/matquest`

## 🔄 Обновление проекта

Когда вы внесёте изменения:

```bash
# Добавьте изменения
git add .

# Закоммитьте
git commit -m "Описание изменений"

# Отправьте на GitHub
git push
```

Если используете GitHub Pages, перезадеплойте:
```bash
npm run deploy
```

## 📋 Полезные команды Git

```bash
# Проверить статус файлов
git status

# Посмотреть историю коммитов
git log

# Отменить изменения в файле
git checkout -- имя_файла

# Создать новую ветку
git checkout -b название_ветки

# Переключиться на другую ветку
git checkout название_ветки

# Объединить ветки
git merge название_ветки

# Получить последние изменения с GitHub
git pull origin main
```

## 🛡️ Безопасность

### Не коммитьте:
- ❌ API-ключи (Yandex, и т.д.)
- ❌ Файл `.env` с секретами
- ❌ Папку `node_modules`
- ❌ Личные данные

### Используйте `.gitignore`:
Файл `.gitignore` уже настроен и исключает:
- `node_modules/`
- `.env`
- `dist/`
- Логи и временные файлы

## 📸 Добавление скриншотов

Чтобы добавить скриншоты в README:

1. Сделайте скриншоты
2. Загрузите их в папку `public/screenshots/`
3. Добавьте в README:
```markdown
![Скриншот](public/screenshots/screenshot1.png)
```

Или загрузите изображения прямо в Issue/Pull Request на GitHub.

## 🏷️ Создание релиза

Когда проект готов к публикации:

1. Перейдите в "Releases" → "Draft a new release"
2. Tag version: `v1.0.0`
3. Release title: `МатКвест v1.0.0`
4. Опишите изменения
5. Нажмите "Publish release"

## 📊 Статистика проекта

Добавьте бейджи в README для отображения статистики:

```markdown
![GitHub stars](https://img.shields.io/github/stars/ВАШ_USERNAME/matquest)
![GitHub forks](https://img.shields.io/github/forks/ВАШ_USERNAME/matquest)
![GitHub issues](https://img.shields.io/github/issues/ВАШ_USERNAME/matquest)
```

## 🆘 Решение проблем

### Ошибка: "Permission denied (publickey)"
```bash
# Настройте SSH ключи
ssh-keygen -t ed25519 -C "ваш@email.com"
# Добавьте публичный ключ в GitHub Settings → SSH and GPG keys
```

### Ошибка: "Updates were rejected"
```bash
git pull origin main
git push origin main
```

### Ошибка: "src refspec main does not match any"
```bash
git branch -M main
git push -u origin main
```

## 📞 Поддержка

Если возникли проблемы:
1. Проверьте [GitHub Docs](https://docs.github.com/)
2. Создайте Issue в репозитории
3. Поищите решение на [Stack Overflow](https://stackoverflow.com/)

---

Удачи с загрузкой проекта! 🚀
