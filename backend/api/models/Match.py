from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.db.models import CASCADE
from .League import League


class Match(models.Model):
  class Status(models.TextChoices):
    PENDING = 'PENDING'
    DONE = 'DONE'

  id = models.AutoField(primary_key=True)
  league = models.ForeignKey(League, on_delete=models.CASCADE, related_name="league")
  player1 = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="player1")
  player2 = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="player2")
  status = models.CharField(max_length=16, choices=Status.choices, default=Status.PENDING)
  games_won_by_player1 = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(2)], blank=True, null=True)
  games_won_by_player2 = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(2)], blank=True, null=True)
  games_drew = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(3)], blank=True, null=True)

  def __str__(self):
    return str(self.id) + " (" + str(self.player1) + " - " + str(self.player2) + ")"
