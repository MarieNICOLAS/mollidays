import uuid
from rest_framework import serializers
from .models import Payment
from .models import Booking

class PaymentSerializer(serializers.ModelSerializer):
    booking = serializers.PrimaryKeyRelatedField(queryset=Booking.objects.all())
    class Meta:
        model = Payment
        fields = '__all__'
        read_only_fields = ['id', 'date']
    
    def create(self, validated_data):
        if not validated_data.get("transaction_ref"):
            validated_data["transaction_ref"] = f"TX-{uuid.uuid4().hex[:10].upper()}"
        return super().create(validated_data)