from django.http import JsonResponse

def home(request):
    return JsonResponse({
        "message": "FinLoan Pro Backend Running",
        "status": "success"
    })