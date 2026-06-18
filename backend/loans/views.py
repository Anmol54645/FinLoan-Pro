from rest_framework import viewsets
from .models import Loan
from .serializers import LoanSerializer


class LoanViewSet(viewsets.ModelViewSet):
    serializer_class = LoanSerializer

    def get_queryset(self):
        user = self.request.user

        if user.role == "admin":
            return Loan.objects.all()

        return Loan.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)