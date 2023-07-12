from django.shortcuts import render, redirect
from django.shortcuts import render
from django.conf import settings
from django.core.files.storage import default_storage
from django.contrib import messages
import pyrebase
import os


config = {
    "apiKey": "AIzaSyDFCcm8YHY1_3tHoryp1vN9_eVjOL9OFjA",
    "authDomain": "mykos-54bd8.firebaseapp.com",
    "projectId": "mykos-54bd8",
    "storageBucket": "mykos-54bd8.appspot.com",
    "messagingSenderId": "560362512121",
    "appId": "1:560362512121:web:db6c8cecc5417bdeb4cc28",
    "measurementId": "G-03XDQJMWV8",
    "databaseURL": ""
}

firebase = pyrebase.initialize_app(config)
storage = firebase.storage()

# storage = firebase.storage()
# storage.child(PATH/DIRECTORY_ON_CLOUD).put(PATH_TO_LOCAL_IMAGE  )

# # Example (same directory, same file name)
# storage.child("images/example.jpg").put("example.jpg")

# # Example (different directory, different file name)
# storage.child("images/renamed_img.jpg").put("media/original_img.jpg")

def index(request):
    if request.method == 'POST':
        file = request.FILES['file']
        file_save = default_storage.save(file.name, file)
        storage.child("files/" + file.name).put("media/" + file.name)
        delete = default_storage.delete(file.name)
        messages.success(request, "File upload in Firebase Storage successful")
        return redirect('index')
    else:
        return render(request, 'index.html')