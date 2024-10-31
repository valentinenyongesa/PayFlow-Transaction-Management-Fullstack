from django.shortcuts import redirect, get_object_or_404
from django.http import HttpResponse
from .models import Transaction

def delete_transaction(request, transaction_id):
    transaction = get_object_or_404(Transaction, id=transaction_id)
    transaction.delete()
    return redirect('transaction_list')