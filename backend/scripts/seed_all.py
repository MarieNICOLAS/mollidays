# scripts/seed_all.py
import sys
import os
import django

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(BASE_DIR)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()
import seed_users
import seed_categories
import seed_tags
import seed_circuits
import seed_steps_all
import seed_payments
import seed_reviews
import check_seed

if __name__ == "__main__":
    print("📦 Début du seed des données de démonstration...")

    seed_users.run()
    seed_categories.run()
    seed_tags.run()
    seed_circuits.run()
    seed_steps_all.run()
    seed_payments.run()
    seed_reviews.run()
    check_seed.run()

    print("✅ Seed complet terminé.")