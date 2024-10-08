from django.db import models

class Transaction(models.Model):
    transaction_id = models.CharField(max_length=100)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.transaction_id
