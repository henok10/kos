from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from listings.api import views as listings_api_views
from users.api import views as users_api_views
from django.views.generic import TemplateView
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from . import views
import cloudinary
import cloudinary_storage



urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('api/', include('users.api.urls')),
    path('api/', include('listings.api.urls')),

    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
       # Your other URL patterns go here  from react js

    path('', TemplateView.as_view(template_name='index.html')),
    path('manifest.json', TemplateView.as_view(template_name="manifest.json", content_type="application/json")),
    path('customer/signup/', TemplateView.as_view(template_name='index.html')),
    path('owner/signup/', TemplateView.as_view(template_name='index.html')),
    path('customer/home/', TemplateView.as_view(template_name='index.html')),
    path('owner/home/', TemplateView.as_view(template_name='index.html')),
    path('login/', TemplateView.as_view(template_name='index.html')),
    path('listings/', TemplateView.as_view(template_name='index.html')),
    path('register/', TemplateView.as_view(template_name='index.html')),
    path('coba/', TemplateView.as_view(template_name='index.html')),
    path('order/<int:id>/', TemplateView.as_view(template_name='index.html')),
    path('profileOwner/', TemplateView.as_view(template_name='index.html')),
    path('profileCustomer/', TemplateView.as_view(template_name='index.html')),
    path('listings/<int:id>/', TemplateView.as_view(template_name='index.html')),
    path('listingadd/', TemplateView.as_view(template_name='index.html')),
    path('listingupdate/', TemplateView.as_view(template_name='index.html')),
    path('listingsOwner/<int:id>/', TemplateView.as_view(template_name='index.html')),
    path('datakos/', TemplateView.as_view(template_name='index.html')),
    path('datakosApprove/<int:id>/', TemplateView.as_view(template_name='index.html')),
    path('datakosUser/<int:id>/', TemplateView.as_view(template_name='index.html')),
    path('riwayatTransaksi/', TemplateView.as_view(template_name='index.html')),
    path('api/user/reset/<str:uid>/<str:token>/', TemplateView.as_view(template_name='index.html')),
    path('sendpasswordresetemail/', TemplateView.as_view(template_name='index.html')),
    path('changePassword/', TemplateView.as_view(template_name='index.html')),
    
    path('kamar-add/<int:id>/', TemplateView.as_view(template_name='index.html')),
    path('kamar-detail/<int:id>/', TemplateView.as_view(template_name='index.html')),
    path('kamar-update/<int:id>/', TemplateView.as_view(template_name='index.html')),
    path('data-kamar/<int:id>/', TemplateView.as_view(template_name='index.html')),
    path('pesan_kamar/<int:id>/', TemplateView.as_view(template_name='index.html')),
    path('syarat_ketentuan/', TemplateView.as_view(template_name='index.html')),
    path('data-kamar/<int:id>/', TemplateView.as_view(template_name='index.html')),

    
] 
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)