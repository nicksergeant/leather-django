from django.template.defaultfilters import slugify


def slugify_uniquely(value, model, user, slugfield="slug"):
    potential = base = slugify(value)[:255]
    suffix = 1

    while True:
        if suffix == 1:
            if value:
                potential = base
            else:
                potential = str(suffix)
        else:
            if value:
                potential = "-".join([base, str(suffix)])
            else:
                potential = str(suffix)

        if not model.objects.filter(user=user,
                                    **{slugfield: potential}).count():
            return potential

        suffix = suffix + 1
