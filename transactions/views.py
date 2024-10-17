from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Transaction
from .serializers import TransactionSerializer

@api_view(['GET'])
def transaction_list(request):
    transactions = Transaction.objects.all()
    serializer = TransactionSerializer(transactions, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)  # Return HTTP 200 for successful GET request

@api_view(['POST'])
def create_transaction(request):
    serializer = TransactionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)  # Return HTTP 201 on success
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Return HTTP 400 on validation failure
