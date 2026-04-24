# Cayman Islands Company Registration

Премиальный корпоративный сайт агентства по регистрации компаний в юрисдикции Каймановых островов.

Вдохновлён структурой [georgia-company-formation.com](https://georgia-company-formation.com/), полностью адаптирован под Cayman Islands: 0% корпоративного налога, отсутствие отчётности, высокая конфиденциальность, престиж юрисдикции.

## Tech Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS + дизайн-система «Light Premium»
- **Animations**: GSAP + `@gsap/react` (ScrollTrigger)
- **Database**: Neon PostgreSQL (через Vercel integration)
- **ORM**: Prisma (с connection pooling)
- **Auth**: NextAuth.js (Auth.js v5)
- **Editor**: TipTap (контент постов)
- **Hosting**: Vercel

## Design System — Light Premium

| Токен | Значение |
| --- | --- |
| Фон | `#FFFFFF`, `#F8FAFC` |
| Блоки | `#F1F5F9` |
| Текст | `#0F172A` |
| Акцент | `#2563EB` / `#0EA5E9` |
| Премиум-акцент | `#C8A961` (золото, минимально) |
| Заголовки | Playfair Display |
| Текст | Inter |

## Структура

```
src/
├─ app/
│  ├─ (public)/            # layout для публичных страниц
│  ├─ admin/                # защищённая админ-панель
│  ├─ api/                  # route handlers
│  ├─ layout.tsx            # корневой layout
│  └─ globals.css
├─ components/
│  ├─ layout/               # Header, Footer
│  ├─ sections/             # Hero, Benefits, Services, ...
│  ├─ admin/                # PostEditor, PostsTable
│  └─ ui/                   # Button, Card, Container, ...
├─ lib/
│  ├─ prisma.ts             # singleton Prisma client
│  ├─ auth.ts               # NextAuth config
│  └─ utils.ts
└─ hooks/
   └─ useGsap*.ts           # GSAP хуки
prisma/
├─ schema.prisma
└─ seed.ts
```

## Setup

```bash
# 1. Install
npm install

# 2. Скопируй .env.example → .env и подставь значения
cp .env.example .env

# 3. Миграция схемы в Neon
npm run db:push

# 4. Засей первого админа
npm run db:seed

# 5. Dev
npm run dev
```

## Deploy to Vercel

1. Импортируй репозиторий в Vercel
2. Подключи Neon через **Storage → Create Database → Neon** (автоматически добавит `POSTGRES_PRISMA_URL` и `POSTGRES_URL_NON_POOLING`)
3. Добавь `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
4. Deploy

После первого деплоя выполни `npm run db:push && npm run db:seed` локально с production-env, либо добавь шаг в CI.

## Admin

После сидинга заходи на `/login` с `ADMIN_EMAIL` / `ADMIN_PASSWORD`. Админка доступна по `/admin`.
