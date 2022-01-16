from django.core.management.base import BaseCommand
from backend.factories.ColumnFactories import ColumnFactory
from backend.factories.CardFactories import CardFactory
from backend.models import Card, Column


class Command(BaseCommand):
    # py manage.py seed --columns 5 --cards 20
    help = 'seeds the database'

    def add_arguments(self, parser):
        parser.add_argument('--columns',
                             default=5,
                             type=int,
                             help='The number of fake columns to create.'
                             )
        
        parser.add_argument('--cards',
                             default=200,
                             type=int,
                             help='The number of fake cards to create.'
                             )

    def handle(self, *args, **options):
        self.stdout.write('deleting objects...')
        Card.objects.all().delete()
        Column.objects.all().delete()

        self.stdout.write('seeding data...')
        for i in range(options['columns']):
            ColumnFactory()

        for i in range(options['cards']):
            CardFactory()
