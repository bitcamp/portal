/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-destructuring */
const Axios = require('axios');

const csv = require('csvtojson');

const endpoint = 'https://3e01dstvy4.execute-api.us-east-1.amazonaws.com/prd/register';

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Convert a csv file with csvtojson
csv()
  .fromFile('./organizers.csv')
  .then(async (csvResult) => {
    const users = csvResult.map(
      (item) => {
        item.phone = "2026973349";
        item.school_type = "Undergraduate / Bachelors";
        item.track_selected = "Organizer";
        item.school = "UMD";
        item.address = "The Armory :)";
        item.birthday = "01/01/2021"
        return item;
      },
    );

    // eslint-disable-next-line no-restricted-syntax
    for (const user of users) {
      console.log(`Inviting ${user.name}`);
      await Axios.post(endpoint, user);
      await sleep(100);
    }
  });
