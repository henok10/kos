from rest_framework import generics, permissions, status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from .serializers import CustomerSignupSerializer, OwnerSignupSerializer, UserSerializer, UserLoginSerializer, SendPasswordResetEmailSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.views import APIView
from .permissions import IsCustomerUser, IsOwnerUser
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated



from users.models import Owner, Customer, User
from .serializers import OwnerSerializer, CustomerSerializer, UserPasswordResetSerializer, UserChangePasswordSerializer


# Generate Token Manually
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class CustomerSignupView(generics.GenericAPIView):
    serializer_class=CustomerSignupSerializer
    def post(self, request, *args, **kwargs):
        serializer=self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user=serializer.save()
        token = get_tokens_for_user(user)
        access_token = token['access']
        refresh_token = token['refresh']
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token,
            'access_token':  access_token,
            'refresh_token': refresh_token,
            "message": "account created successfully"
        }, status=status.HTTP_201_CREATED)

class OwnerSignupView(generics.GenericAPIView):
    serializer_class=OwnerSignupSerializer
    def post(self, request, *args, **kwargs):
        serializer=self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user=serializer.save()
        token = get_tokens_for_user(user)
        access_token = token['access']
        refresh_token = token['refresh']
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token,
            'access_token':  access_token,
            'refresh_token': refresh_token,
            "message": "account created successfully"
        }, status=status.HTTP_201_CREATED)

class UserLoginView(APIView):
    serializer_class=UserLoginSerializer
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data.get('email')
        password = serializer.data.get('password')
        user = authenticate(email=email, password=password)
        if user is not None:
            token = get_tokens_for_user(user)
            is_customer = user.is_customer
            is_owner = user.is_owner
            user_id = user.pk
            access_token = token['access']
            refresh_token = token['refresh']
    
            return Response({
                'token': token,
                'access_token':  access_token,
                'refresh_token': refresh_token,
                'msg': 'Login Success',
                'email': user.email,
                'is_customer': is_customer,
                'is_owner': is_owner,
                'owner_id': serializer.data.get('owner_id'),
                'customer_id': serializer.data.get('customer_id'),
                'user_id': user_id
            })
        else:
            return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)

class UserChangePasswordView(APIView):
#   renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def post(self, request, format=None):
    serializer = UserChangePasswordSerializer(data=request.data, context={'user':request.user})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Changed Successfully'}, status=status.HTTP_200_OK)

class SendPasswordResetEmailView(APIView):
#   renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = SendPasswordResetEmailSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        return Response({"message": "Password reset email has been sent."}, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserPasswordResetView(APIView):
  def post(self, request, uid, token, format=None):
    serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid, 'token':token})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset Successfully'}, status=status.HTTP_200_OK)

class LogoutView(APIView):
  def post(self, request, format=None):
        refresh_token = request.data.get('refresh_token')
        
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
                return Response({"message": "Logout berhasil."}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": "Token refresh tidak valid."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Token refresh diperlukan."}, status=status.HTTP_400_BAD_REQUEST)
       


class CustomerOnlyView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated & IsCustomerUser]
    serializer_class=UserSerializer

    def get_object(self):
        return self.request.user

class OwnerOnlyView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated & IsOwnerUser]
    serializer_class=UserSerializer

    def get_object(self):
        return self.request.user


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class OwnerList(generics.ListAPIView):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer

class CustomerList(generics.ListAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class OwnerDetail(generics.RetrieveAPIView):
    serializer_class = OwnerSerializer
    lookup_field = 'user'

    def get_object(self):
        user_id = self.kwargs['user']
        user = User.objects.get(id=user_id)
        owner = Owner.objects.get(user=user)
        return owner


class OwnerUpdate(generics.UpdateAPIView):
    # queryset = Owner.objects.all()
    serializer_class = OwnerSerializer
    lookup_field = 'user'
    def get_object(self):
        user_id = self.kwargs['user']
        owner = Owner.objects.get(user=user_id)
        # queryset = Owner.objects.all()
        return owner

class CustomerDetail(generics.RetrieveAPIView):
    serializer_class = CustomerSerializer
    lookup_field = 'user'

    def get_object(self):
        user_id = self.kwargs['user']
        customer = Customer.objects.get(user=user_id)
        return customer

class CustomerUpdate(generics.UpdateAPIView):
    # queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    lookup_field = 'user'
    def get_object(self):
        user_id = self.kwargs['user']
        customer = Customer.objects.get(user=user_id)
        # queryset = Customer.objects.all()
        return customer




