from django.urls import path
from listings.api import views as listings_api_views

urlpatterns = [
    path('listings/', listings_api_views.ListingList.as_view()),
    path('listings/create/', listings_api_views.ListingCreate.as_view()),
    path('listings/<int:pk>/', listings_api_views.ListingDetail.as_view()),
    path('listings/<int:user>/list', listings_api_views.ListingUserList.as_view()),
    path('listings/<int:pk>/delete/',
         listings_api_views.ListingDelete.as_view()),
    path('listings/<int:pk>/update/',
         listings_api_views.ListingUpdate.as_view()),
    path('transaction/<int:rumah>/list', listings_api_views.TransactionList.as_view()),
    path('transaction/<int:user>/listu', listings_api_views.TransactionList.as_view()),
    path('transaction/<int:rumah>/user', listings_api_views.TransactionListUser.as_view()),
    path('transaction/<int:user>/userdetail', listings_api_views.TransactionUser.as_view()),
    path('transaction/<int:pk>/update', listings_api_views.TransactionUpdate.as_view()),
    path('transaction/<int:kamar>/kamar-update', listings_api_views.TransactionKamarUpdate.as_view()),
    path('transaction/create', listings_api_views.TransactionCreate.as_view()),
    path('transaction/<int:user>/detail', listings_api_views.TransactionDetail.as_view()), 
    path('transaction/<int:pk>/delete/',
         listings_api_views.TransactionDelete.as_view()),
     path('transaction/<int:kamar>/delete/kamar',
         listings_api_views.TransactionDeleteKamar.as_view()),
     
     path('review/create', listings_api_views.ReviewCreate.as_view()),
     path('review/<int:rumah>/', listings_api_views.ReviewList.as_view()), 

     path('kamar/create', listings_api_views.KamarCreate.as_view()),
     path('kamar/<int:rumah>/', listings_api_views.KamarList.as_view()), 
     path('kamar/<int:pk>/update/',
         listings_api_views.KamarUpdate.as_view()),  
     path('kamar/<int:pk>/detail/', listings_api_views.KamarDetail.as_view()),  
]