from django.http import JsonResponse

def home(request):
    return JsonResponse({"message": "Bienvenue sur l'API Mollidays !"})