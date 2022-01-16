import factory
import factory.django
from home.models import Column


class ColumnFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Column
        
    name = factory.Faker('text')
    order = factory.Sequence(lambda n: '%d' % n)

