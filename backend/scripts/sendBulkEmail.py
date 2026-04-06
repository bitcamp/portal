import boto3
import time
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError

dynamodb = boto3.resource("dynamodb")
ses = boto3.client("ses", region_name="us-east-1")

# if its a new email u wanna send from, uncoment
# ses.verify_email_identity(EmailAddress="hello@bit.camp")
# print("Verification email sent")

response = ses.get_identity_verification_attributes(Identities=["hello@bit.camp"])
status = response["VerificationAttributes"].get("hello@bit.camp", {})
# print(status["VerificationStatus"])
if status.get("VerificationStatus") == "Success":

    # check if we can send a large amnt
    # quota = ses.get_send_quota()
    # print(f"Max 24-hour send: {quota['Max24HourSend']:.0f}")
    # print(f"Sent last 24 hours: {quota['SentLast24Hours']:.0f}")
    # print(f"Max send rate: {quota['MaxSendRate']:.0f}/sec")
    # print(f"Remaining: {quota['Max24HourSend'] - quota['SentLast24Hours']:.0f}")

    # # last two weeks
    # stats = ses.get_send_statistics()
    # for point in sorted(stats["SendDataPoints"], key=lambda x: x["Timestamp"])[-5:]:
    #     print(
    #         f"{point['Timestamp']}: "
    #         f"attempts={point['DeliveryAttempts']}, "
    #         f"bounces={point['Bounces']}, "
    #         f"complaints={point['Complaints']}, "
    #         f"rejects={point['Rejects']}"
    #     )

    table = dynamodb.Table("portal-prd-registration")

    scan_kwargs = {"ProjectionExpression": "email"}

    done = False
    start_key = None

    emails = []

    while not done:
        if start_key:
            scan_kwargs["ExclusiveStartKey"] = start_key

        table_response = table.scan(**scan_kwargs)

        for item in table_response.get("Items", []):
            if "email" in item:
                emails.append(item["email"])

        start_key = table_response.get("LastEvaluatedKey", None)
        done = start_key is None

    emails = list(set(emails))
    already_sent = set()
    import os

    if os.path.exists("success_log.txt"):
        with open("success_log.txt", "r") as f:
            for line in f:
                already_sent.add(line.strip())

    emails = [e for e in emails if e not in already_sent]

    print(f"Got {len(emails)} emails left to send.")
    print(f"Got {len(emails)} emails.")

    BATCH_SIZE = 7

    for i in range(0, len(emails), BATCH_SIZE):
        current_email_batch = emails[i : i + BATCH_SIZE]

        destinations = [
            {"Destination": {"ToAddresses": [email]}} for email in current_email_batch
        ]

        try:
            ses_response = ses.send_bulk_templated_email(
                Source="hello@bit.camp",
                Template="bitcamp-spons-fair",
                DefaultTemplateData='{"name":"Hacker"}',
                Destinations=destinations,
            )

            for idx, status in enumerate(ses_response["Status"]):
                email = current_email_batch[idx]
                if status["Status"] == "Success":
                    print(f"{email} -> Sent")
                    with open("success_log.txt", "a") as f:
                        f.write(f"{email}\n")
                else:
                    error_msg = status.get("Error")
                    print(f"{email} -> Failed ({error_msg})")
                    with open("fail_log.txt", "a") as f:
                        f.write(f"{email} - {error_msg}\n")

            time.sleep(5)

        except ClientError as e:
            print(
                f"my dude broke {i//BATCH_SIZE + 1}: {e.response['Error']['Message']}"
            )
else:
    print("'hello@bit.camp' is not verified lols")
