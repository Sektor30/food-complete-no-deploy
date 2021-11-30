import { connect } from 'mongoose'
import { MONGO_DB } from '../cofig'

(async () => {
    const db = await connect(MONGO_DB);
    console.log('DB is connected to:', db.connection.name);
})();







