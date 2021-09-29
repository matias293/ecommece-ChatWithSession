
import { dbConnection } from './db/connection';
import Server from './services/server';

const puerto = process.env.PORT || 8080;
dbConnection()
.then(result => {
    
    Server.listen(puerto)
    console.log('Escuchando en puerto',puerto);
  })
  .catch(err => {
    console.log(err);
  });

