from django.db import models
from django.db.models import CASCADE

from studio.models import Studio


# Create your models here.
from studio.models import Studio


class Class(models.Model):
    SCHEDULE = (
        ('Monday', 1),
        ('Tuesday', 2),
        ('Wednesday', 3),
        ('Thursday', 4),
        ('Friday', 5),
        ('Saturday', 6),
        ('Sunday', 7),
    )
    SCHEDULE_DAY = (
        ('Weekly', 1),
        ('Biweekly', 2),
        ('Monthly', 3),
    )
    name = models.CharField(max_length=200, null=False, blank=False)
    description = models.TextField(null=False)
    coach = models.CharField(max_length=200, null=False)
    # keywords = models.ManyToManyField(Keyword)
    capacity = models.IntegerField(null=False)
    space_available = models.IntegerField(null=False)
    day = models.CharField(choices=SCHEDULE, max_length=80)
    length = models.CharField(choices=SCHEDULE_DAY, max_length=80)
    start_time = models.TimeField()
    end_time = models.TimeField()
    start_date = models.DateField()
    end_date = models.DateField()
    studio = models.ForeignKey(to=Studio, on_delete=CASCADE)
    is_cancelled = models.BooleanField()
    # users = models.ManyToManyField('auth.User', verbose_name='Students',
    #                                related_name='courses', null=True, blank=True)
    # studio = models.ForeignKey(to=Studio, related_name="classes", on_delete=CASCADE)
    # day = models.CharField(max_length=100)
    # start_time = models.TimeField()
    # end_time = models.TimeField()
    is_enrolled = models.BooleanField(default=False)
    objects = models.Manager()

    class Meta:
        verbose_name_plural = "Classes"

    def __str__(self):
        return f'{self.name} '

    def get_class_info(self):
        if self.day == 1:
            self.day = 'Monday'
        if self.day == 2:
            self.day = 'Tuesday'
        if self.day == 3:
            self.day = 'Wednesday'
        if self.day == 4:
            self.day = 'Thursday'
        if self.day == 5:
            self.day = 'Friday'
        if self.day == 6:
            self.day = 'Saturday'
        if self.day == 7:
            self.day = 'Sunday'
        

        return {"name": self.name, "description": self.description,
                "coach": self.coach, "day": self.day, "start_time": self.start_time,
                "end": self.end_time}


class Keyword(models.Model):
    keyword = models.CharField(max_length=200, null=False)
    Classes = models.ForeignKey(to=Class, related_name='Class', on_delete=CASCADE, null=True, blank=True)

    objects = models.Manager()

    def __str__(self):
        return f'{self.keyword}'



