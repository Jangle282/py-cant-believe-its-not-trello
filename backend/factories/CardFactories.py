import factory
import factory.django
from backend.factories.ColumnFactories import ColumnFactory
from backend.models import Card, Column


class CardFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Card
    
    name = factory.Faker('text')
    description = factory.Faker('text')
    order = factory.Sequence(lambda n: '%d' % n)
    column = factory.Iterator(Column.objects.all())
