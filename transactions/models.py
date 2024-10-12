from django.db import models

class Transaction(models.Model):
    # Define transaction statuses as choices
    PENDING = 'P'
    COMPLETED = 'C'
    FAILED = 'F'
    
    STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (COMPLETED, 'Completed'),
        (FAILED, 'Failed'),
    ]

    amount = models.DecimalField(max_digits=10, decimal_places=2)  # for monetary values
    description = models.CharField(max_length=255)                 # a brief description
    date = models.DateTimeField(auto_now_add=True)                 # automatically set the date when created
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default=PENDING)  # transaction status

    def __str__(self):
        return f"{self.description} - {self.amount} ({self.get_status_display()})"
