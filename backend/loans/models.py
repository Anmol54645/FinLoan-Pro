from django.db import models
from django.conf import settings


class Loan(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    name = models.CharField(max_length=100)

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    loan_type = models.CharField(max_length=50)

    tenure = models.IntegerField()

    status = models.CharField(
        max_length=20,
        default="Pending"
    )

    # Admin will set this while approving
    interest_rate = models.FloatField(
        default=0
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.name} - {self.loan_type}"