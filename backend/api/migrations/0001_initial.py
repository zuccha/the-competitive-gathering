# Generated by Django 3.1 on 2020-11-13 16:55

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='League',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('status', models.CharField(choices=[('PENDING', 'Pending'), ('ONGOING', 'Ongoing'), ('CANCELED', 'Canceled'), ('DONE', 'Done')], default='PENDING', max_length=16)),
                ('format', models.CharField(choices=[('STANDARD', 'Standard'), ('PIONEER', 'Pioneer'), ('MODERN', 'Modern'), ('LEGACY', 'Legacy'), ('VINTAGE', 'Vintage'), ('COMMANDER', 'Commander'), ('PAUPER', 'Pauper'), ('DRAFT', 'Draft'), ('SEALED', 'Sealed'), ('OTHER', 'Other')], default='STANDARD', max_length=16)),
                ('date_start', models.DateField(blank=True, null=True)),
                ('date_end', models.DateField(blank=True, null=True)),
                ('players_min', models.PositiveIntegerField(default=2, validators=[django.core.validators.MinValueValidator(2)])),
                ('players_max', models.PositiveIntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(2)])),
                ('creator', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='creator', to=settings.AUTH_USER_MODEL)),
                ('players', models.ManyToManyField(blank=True, related_name='players', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Match',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('games_won_by_user1', models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(2)])),
                ('games_drew', models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(3)])),
                ('league', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='league', to='api.league')),
                ('player1', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='player1', to=settings.AUTH_USER_MODEL)),
                ('player2', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='player2', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
