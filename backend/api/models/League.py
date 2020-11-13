from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from django.db import models
from django.db.models import CASCADE


class League(models.Model):
  class Format(models.TextChoices):
    STANDARD = 'STANDARD'
    PIONEER = 'PIONEER'
    MODERN = 'MODERN'
    LEGACY = 'LEGACY'
    VINTAGE = 'VINTAGE'
    COMMANDER = 'COMMANDER'
    PAUPER = 'PAUPER'
    DRAFT = 'DRAFT'
    SEALED = 'SEALED'
    OTHER = 'OTHER'

  class Status(models.TextChoices):
    PENDING = 'PENDING'
    ONGOING = 'ONGOING'
    CANCELED = 'CANCELED'
    DONE = 'DONE'

  id = models.AutoField(primary_key=True)
  creator = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="creator")
  players = models.ManyToManyField(User, blank=True, related_name="players")
  status = models.CharField(max_length=16, choices=Status.choices, default=Status.PENDING)
  format = models.CharField(max_length=16, choices=Format.choices, default=Format.STANDARD)
  date_start = models.DateField(blank=True, null=True)
  date_end = models.DateField(blank=True, null=True)
  players_min = models.PositiveIntegerField(validators=[MinValueValidator(2)], default=2)
  players_max = models.PositiveIntegerField(validators=[MinValueValidator(2)], blank=True, null=True)
  rounds = models.PositiveIntegerField(validators=[MinValueValidator(1)], default=1)

  def __str__(self):
    return str(self.id) + " (" + self.status + ")"
