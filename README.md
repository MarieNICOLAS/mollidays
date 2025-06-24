# Mollidays 🌴

[![CI](https://github.com/MarieNICOLAS/mollidays/actions/workflows/ci.yml/badge.svg)](https://github.com/MarieNICOLAS/mollidays/actions)

**Mollidays** est une plateforme web de réservation de voyages spécialement conçue pour les duos parent-enfant adulte.  
Elle permet de rechercher, réserver et évaluer des circuits organisés, avec un parcours utilisateur immersif, accessible et responsive.

---

## ⚙️ Stack technique

### 🧠 Backend (Django + PostgreSQL)
- Django REST Framework
- PostgreSQL (base relationnelle)
- Authentification JWT (SimpleJWT)
- CORS, Swagger (drf_yasg), sécurité CSRF, hashage
- Dockerisé (Django, DB, migrations auto)
- Configurable via `.env`

### 🎨 Frontend (Next.js + React)
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS + ShadCN
- Architecture modulaire (`/src`)
- Responsive & thème accessible
- Dockerisé

### 🚀 CI/CD & Outils DevOps
- Docker & Docker Compose
- Makefile (`make init`, `make up`, etc.)
- GitHub Actions (CI backend + frontend)
- WSL 2 / Ubuntu 22.04
- Git & GitHub Flow

---

## 🧪 Lancer le projet en local (Docker)

```bash
# Cloner le projet
git clone https://github.com/MarieNICOLAS/mollidays.git
cd mollidays

# Lancer le projet (build + up + migrations)
make init

# Accès
Frontend  : http://localhost:3000
Backend   : http://localhost:8000
Admin     : http://localhost:8000/admin
```

---

## 🔐 Variables d’environnement (extrait)

### `backend/.env.docker`

```
SECRET_KEY=***
DEBUG=True
POSTGRES_DB=mollidays_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=toor
POSTGRES_HOST=db
POSTGRES_PORT=5432
```

---

## 🧰 Commandes Makefile disponibles

| Commande         | Action                                     |
|------------------|--------------------------------------------|
| `make init`      | Build + up + migrations + superuser        |
| `make up`        | Lancer les containers                      |
| `make down`      | Stopper les containers                     |
| `make reset-db`  | Réinitialiser la base PostgreSQL           |
| `make logs`      | Afficher les logs Docker en direct         |

---

## ✅ Validation CDA RNCP 37873

Compétences mises en œuvre :
- Création d’une API sécurisée
- Mise en place d’un CI (GitHub Actions)
- Dockerisation du projet complet
- Intégration continue automatisée
- Hébergement local prêt pour déploiement

---

## 👤 Auteure

**Marie Nicolas** – Développeuse Fullstack en formation CDA  
✨ [LinkedIn](https://linkedin.com/in/marie-nicolas)

---

## 📜 Licence

Projet réalisé dans le cadre du titre **Concepteur Développeur d'Applications (RNCP 37873)**.  
© 2025 – Tous droits réservés.