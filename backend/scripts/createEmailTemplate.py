import boto3

ses = boto3.client("ses", region_name="us-east-1")

ses.update_template(
    Template={
        "TemplateName": "bitcamp-spons-fair",
        "SubjectPart": "Bitcamp Sponsor Fair",
        "HtmlPart": """<html>
  <body>
    <p>Hi Hackers!</p>

    <p><i>(Apologies if you are receiving this twice! We had a small hiccup with our email system.)</i></p>

    <p>
      With Bitcamp weekend approaching soon, we hope you are getting very excited!
      We have one last community event before our hackathon, our Sponsor Fair event!
    </p>

    <p>
      This would be a great opportunity to meet our sponsors before Bitcamp weekend
      and find out what their companies are about, what opportunities they will provide
      for hackers during Bitcamp weekend, and also network!
      We will also have some cool swag too!
    </p>

    <p>
      The Bitcamp Sponsor Fair will be on <b>Friday, April 3rd from 4:30PM - 6:30PM</b>
      at UMD's Brendan Iribe Center for Computer Science and Engineering (IRB), <b>Room 1207</b>.
      Make sure to RSVP today at
      <a href="https://bit.camp/sponsor-fair-rsvp">bit.camp/sponsor-fair-rsvp</a>
      as we have limited spots available for this event.
    </p>

    <p>
      If you have any questions or concerns, please feel free to reach out to Bitcamp
      at <a href="mailto:hello@bit.camp">hello@bit.camp</a>.
    </p>

    <p>We hope to see you there!</p>

    <p>Best,<br>Bitcamp</p>
  </body>
</html>""",
        "TextPart": """Hi Hackers!

(Apologies if you are receiving this twice! We had a small hiccup with our email system.)

With Bitcamp weekend approaching soon, we hope you are getting very excited! We have one last community event before our hackathon, our Sponsor Fair event!

This would be a great opportunity to meet our sponsors before Bitcamp weekend and find out what their companies are about, what opportunities they will provide for hackers during Bitcamp weekend, and also network! We will also have some cool swag too!

The Bitcamp Sponsor Fair will be on Friday, April 3rd from 4:30PM - 6:30PM at UMD's Brendan Iribe Center for Computer Science and Engineering (IRB), Room 1207. Make sure to RSVP today at https://bit.camp/sponsor-fair-rsvp as we have limited spots available for this event.

If you have any questions or concerns, please feel free to reach out to Bitcamp at hello@bit.camp.

We hope to see you there!

Best,
Bitcamp""",
    }
)

print("template updated")
