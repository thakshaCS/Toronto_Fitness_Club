from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView
from accounts.serializers import RegisterSerializer, LoginSerializer, UserInfoSerializer
from rest_framework import response, status
from django.contrib.auth import authenticate
from accounts.models import User
from rest_framework.response import Response
import jwt


class RegisterAPIView(APIView):
    """
    APIView to register a user
    """
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})

        serializer.is_valid()
        x = serializer.errors

        # can't send an empty request
        if request.data == {}:
            return response.Response({"username": ["This field is required"],
                                      "email": ["This field is required"],
                                      "password": ["This field is required"],
                                      "password2": ["This field is required"]},
                                     status=status.HTTP_400_BAD_REQUEST)

        # error checking payload
        if request.data['username'] == '':
            x["username"] = ["This field is required"]

        if request.data['email'] == '':
            x["email"] = ["This field is required"]

        if request.data['password'] == '':
            x["password"] = ["This field is required"]

        if request.data['password2'] == '':
            x["password2"] = ["This field is required"]

        # password validation
        if request.data['password'] != '' and request.data['password'] != '':
            # password must at least 8 characters in length
            if len(request.data['password']) < 8:
                x["password"] = ["password must be at least 8 characters"]
            # password must contain at least one special character
            if '~' not in request.data['password'] and '!' not in request.data['password'] and \
                    '@' not in request.data['password'] and '#' not in request.data['password'] and \
                    '$' not in request.data['password'] and '%' not in request.data['password'] and \
                    '&' not in request.data['password'] and '_' not in request.data['password']:
                x["password"] = ["password must be contain one of ~!@#$%&_"]
            # password must equal password2
            if request.data['password'] != request.data['password2']:
                x["password2"] = ["password and password2 don't match"]

            # Checking for upper case letters
            count_upper = 0
            for s in request.data['password']:
                if s.isupper():
                    count_upper += 1

            if count_upper < 1:
                x["password"] = ["password must contain at least 1 upper case letter"]

            if serializer.is_valid() and x == {}:
                serializer.save()
                return response.Response({'message': 'User successfully registered',
                                          'data': serializer.data},
                                         status=status.HTTP_201_CREATED)
            else:
                return response.Response(x, status=status.HTTP_400_BAD_REQUEST)

        return response.Response(x, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
    """
    API view to login a user

    resources used for setting cookie:
    - https://stackoverflow.com/questions/1622793/django-cookies-how-can-i-set-them
    """
    serializer_class = LoginSerializer

    def post(self, request):

        # error check for payload
        if request.data['username'] == '' and request.data['password'] == '':
            return response.Response({"username": "username is required", "password": "password is required"},
                                     status=status.HTTP_400_BAD_REQUEST)                         
        if request.data['username'] == '':
            return response.Response({"username": "username is required"},
                                     status=status.HTTP_400_BAD_REQUEST)
        if request.data['password'] == '':
            return response.Response({"password": "password is required"},
                                     status=status.HTTP_400_BAD_REQUEST)


        # authenticate access to specified User's attributes
        user = authenticate(username=request.data['username'], password=request.data['password'])

        if user:
            serializer = self.serializer_class(user)

            # jwt.encode({'username': user.username, 'email': user.email}, "secret", algorithm="HS256")
            responsee = Response()

            # set auth_token as a cookie
            responsee.set_cookie(key='auth_token', value=serializer.data["auth_token"], samesite=None, secure=False)
            # request.session['login'] = 'true'
            request.session['username'] = request.data['username']

            responsee.data = {
                'message': 'User successfully logged in',
                'data': {
                    'id': user.id,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'username': user.username,
                    'email': user.email,
                    'phone_number': user.phone_number,
                    'avatar': str(user.avatar),
                    'auth_token': serializer.data["auth_token"]
                }
            }

            responsee.status_code = status.HTTP_200_OK

            return responsee
        else:
            return response.Response({'message': "User does not exist, please try again"},
                                     status=status.HTTP_401_UNAUTHORIZED)


class LogoutAPIView(APIView):
    """
    Delete cookie containing auth_token to log out user

    resources used for deleting cookie:
    - https://github.com/flavors/django-graphql-jwt/issues/102
    """

    def post(self, request):
        responsee = Response()

        responsee.status_code = status.HTTP_200_OK
        # delete auth_token cookie
        responsee.delete_cookie('auth_token')
        responsee.data = {
            'message': 'User successfully logged out'
        }
        return responsee


class UserInfoAPIView(APIView):
    """
    Display the User's profile info
    """
    serializer_class = UserInfoSerializer

    def get(self, request):
        auth_token = request.COOKIES.get('auth_token')

        if auth_token:
            user = User.objects.get(username=(jwt.decode(auth_token, 'secret', algorithms="HS256")["username"]))
            serializer = self.serializer_class(user)
            return response.Response({'data': serializer.data}, status=status.HTTP_200_OK)
        else:
            return response.Response({'message': "you are not authorized to access user info, login again"},
                                     status=status.HTTP_401_UNAUTHORIZED)
        # user = User.objects.get(username=(request.session['username']))
        # serializer = self.serializer_class(user)
        # return response.Response({'data': serializer.data}, status=status.HTTP_200_OK)

class UpdateInfoAPIView(UpdateAPIView):
    """
    Update User's profile
    """
    serializer_class = UserInfoSerializer

    def update(self, request, *args, **kwargs):
        auth_token = request.COOKIES.get('auth_token')

        if auth_token:
            user = User.objects.get(username=jwt.decode(auth_token, 'secret', algorithms="HS256")["username"])
            serializer = self.serializer_class(user, data=request.data, context={'request': request}, partial=True)
            
            serializer.is_valid()
            x = serializer.errors


            if serializer.is_valid():
                serializer.save()

                return response.Response({'message': 'User info successfully updated',
                                          'data': serializer.data}, status=status.HTTP_200_OK)
            else:
                return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return response.Response({'message': "you are not authorized to update user info, login again"},
                                     status=status.HTTP_401_UNAUTHORIZED)
