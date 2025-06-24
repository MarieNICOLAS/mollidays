from rest_framework import generics
from circuits.models.circuit import Circuit
from circuits.serializers.circuit_serialiser import CircuitSerializer

class CircuitDetailAPIView(generics.RetrieveAPIView):
    queryset = Circuit.objects.filter(status="active")
    serializer_class = CircuitSerializer
    lookup_field = "id"