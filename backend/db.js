const mongoose = require('mongoose');
// db.adminCommand('listDatabases');

main().catch(err => console.error(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/inotebook?directConnection=true');
  console.log("mongooose connected");
}
