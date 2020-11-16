from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.db.models import CASCADE
from ..utils.Standing import Standing
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
  round = models.PositiveIntegerField(validators=[MinValueValidator(1)])
  games_won_by_player1 = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(2)], blank=True, null=True)
  games_won_by_player2 = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(2)], blank=True, null=True)
  games_drew = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(3)], blank=True, null=True)

  def _count_games(self):
    return self.games_won_by_player1 + self.games_won_by_player2 + self.games_drew

  def _count_points_for_player1(self):
    if self.games_won_by_player1 > self.games_won_by_player2:
      return 3
    if self.games_won_by_player2 > self.games_won_by_player1:
      return 0
    return 1

  def _count_points_for_player2(self):
    if self.games_won_by_player2 > self.games_won_by_player1:
      return 3
    if self.games_won_by_player1 > self.games_won_by_player2:
      return 0
    return 1

  def _get_standing_for_player1(self):
    points = self._count_points_for_player1()
    return Standing(
      points,
      1,
      1 if points == 3 else 0,
      1 if points == 0 else 0,
      1 if points == 1 else 0,
      self._count_games(),
      self.games_won_by_player1,
      self.games_won_by_player2,
      self.games_drew,
    )

  def _get_standing_for_player2(self):
    points = self._count_points_for_player2()
    return Standing(
      points,
      1,
      1 if points == 3 else 0,
      1 if points == 0 else 0,
      1 if points == 1 else 0,
      self._count_games(),
      self.games_won_by_player2,
      self.games_won_by_player1,
      self.games_drew,
    )

  def get_standing_for(self, username):
    if self.status != 'DONE':
      return Standing(0, 0, 0, 0, 0, 0, 0, 0, 0)
    if self.player1 and self.player1.username == username:
      return self._get_standing_for_player1()
    if self.player2 and self.player2.username == username:
      return self._get_standing_for_player2()
    return Standing(0, 0, 0, 0, 0, 0, 0, 0, 0)


  def __str__(self):
    return str(self.id) + " (" + str(self.player1) + " - " + str(self.player2) + ")"

  def to_json(self):
    return {
      "id": self.id,
      "league": self.league.id,
      "round": self.round,
      "player1": self.player1.username,
      "player2": self.player2.username,
      "status": self.status,
      "games_won_by_player1": self.games_won_by_player1,
      "games_won_by_player2": self.games_won_by_player2,
      "games_drew": self.games_drew,
    }
