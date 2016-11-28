from annoying.decorators import ajax_request
from datetime import datetime, timedelta
from django.views.decorators.csrf import csrf_exempt
from leather.ingest.actions import remove_transactions, update_plaid_account
from leather.ingest.errors import IngestError
from leather.ingest.models import Ingest

import json


@ajax_request
@csrf_exempt
def plaid_webhook(request):
    if request.method == 'POST':

        response = json.loads(request.body.decode('utf-8'))

        access_token = response['access_token']
        code = response['code']

        ing = Ingest(access_token=access_token,
                     code=code,
                     message=response['message'],
                     raw=response)
        ing.save()

        from_date = (datetime.now() - timedelta(days=15)) \
            .strftime('%Y-%m-%d')

        # Initial transaction pull finished
        if code == 0:
            update_plaid_account(access_token, from_date=from_date)

        # Historical transaction pull finished
        elif code == 1:
            update_plaid_account(access_token)

        # Normal transaction pull finished
        elif code == 2:
            update_plaid_account(access_token, from_date=from_date)

        # Transactions removed
        elif code == 3:
            remove_transactions(access_token, response['removed_transactions'])

        else:
            raise IngestError('Error for access_token {}'.format(access_token))

    return {}
