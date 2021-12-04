import { connect } from 'mongoose'
import { MONGO_DB } from '../cofig'

(async () => {
    const db = await connect("mongodb://localhost:27017");
    console.log('DB is connected to:', db.connection.name);
})();







