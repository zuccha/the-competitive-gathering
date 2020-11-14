class Standing:
  def __init__(
    self,
    points,
    matches_played,
    matches_won,
    matches_lost,
    matches_drew,
    games_played,
    games_won,
    games_lost,
    games_drew,
  ):
    self.points = points
    self.matches_played = matches_played
    self.matches_won = matches_won
    self.matches_lost = matches_lost
    self.matches_drew = matches_drew
    self.games_played = games_played
    self.games_won = games_won
    self.games_lost = games_lost
    self.games_drew = games_drew

  def add(self, other):
    self.points += other.points
    self.matches_played += other.matches_played
    self.matches_won += other.matches_won
    self.matches_lost += other.matches_lost
    self.matches_drew += other.matches_drew
    self.games_played += other.games_played
    self.games_won += other.games_won
    self.games_lost += other.games_lost
    self.games_drew += other.games_drew
