from django.db import models
from django.contrib.auth import get_user_model

UserModel = get_user_model()

class Profile(models.Model):
  # on_delete=models.CASCADE = если удалили пользователя, профиль тоже удалится
  # related_name="profile" = чтобы обращаться user.profile
  user = models.OneToOneField(UserModel, on_delete=models.CASCADE, related_name='profile')
  avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
