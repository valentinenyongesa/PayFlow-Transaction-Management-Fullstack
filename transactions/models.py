from django.db import models

class Transaction(models.Model):
    # Define your fields here
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # for monetary values
    description = models.CharField(max_length=255)                 # a brief description
    date = models.DateTimeField(auto_now_add=True)                 # automatically set the date when created

    def __str__(self):
        return f"{self.description} - {self.amount}"
