class Standing:
  def __init__(
    self,
    username,
    points = 0,
    matches_played = 0,
    matches_won = 0,
    matches_lost = 0,
    matches_drew = 0,
    games_played = 0,
    games_won = 0,
    games_lost = 0,
    games_drew = 0,
    rank = 0,
  ):
    self.username = username
    self.points = points
    self.matches_played = matches_played
    self.matches_won = matches_won
    self.matches_lost = matches_lost
    self.matches_drew = matches_drew
    self.games_played = games_played
    self.games_won = games_won
    self.games_lost = games_lost
    self.games_drew = games_drew
    self.rank = rank

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
    self.rank += other.rank

  def get_rank_values(self):
    return (
      self.points,
      self.matches_won,
      -self.matches_lost,
      self.games_won,
      -self.games_lost,
      self.matches_played,
      self.games_played,
    )

  def __lt__(self, other):
    return self.get_rank_values() < other.get_rank_values()

  def __gt__(self, other):
    return self.get_rank_values() > other.get_rank_values()

  def __eq__(self, other):
    return self.get_rank_values() == other.get_rank_values()

  def to_json(self):
    return {
      "username": self.username,
      "points": self.points,
      "matches_played": self.matches_played,
      "matches_won": self.matches_won,
      "matches_lost": self.matches_lost,
      "matches_drew": self.matches_drew,
      "games_played": self.games_played,
      "games_won": self.games_won,
      "games_lost": self.games_lost,
      "games_drew": self.games_drew,
      "rank": self.rank,
    }
