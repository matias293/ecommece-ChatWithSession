import express from 'express';
import path from 'path';
import * as http from 'http';
import io from 'socket.io';
import session from 'express-session';
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo';
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };



import apiRouter from '../routes/index';
import authRouter from '../routes/auth'
import { productsPersistencia } from '../persistencia/productos';
import { mensajesPersistencia } from '../persistencia/mensajes';
import Usuario from '../models/usuario'

const StoreOptions = {

  store: MongoStore.create({
    mongoUrl: `mongodb+srv://user:PZvoslz9ew26uxIj@clustercodershop.wuu66.mongodb.net/ecommerce`,
    mongoOptions: advancedOptions,
  }),


  secret: 'shhhhhhhhhhhhhhhhhhhhh',
  resave: false,
  saveUninitialized: false 
};

const app = express();

app.use(cookieParser());
app.use(session(StoreOptions));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));


app.use('/api', apiRouter);
app.use('/',authRouter)

app.use(async(req, res, next) => {
  if(!req.session.user){
    return next()
  }
  const user = Usuario.findById(req.session.user._id)
  
   req.user = user
   next()
})



app.use('/',(req,res,next)=>{
  console.log(req.session)

  if(req.session.loggedIn){
    return res.render('home',{pageTitle:'Home', mensaje:req.session.user.username, isLogIn:req.session.loggedIn,username:''})
  }
  res.render('home',{pageTitle:'Home',isLogIn:false,username:''})
})





const myServer = new http.Server(app);

const myWSServer = io(myServer);

//Productos
myWSServer.on('connect', async(socket) => {
  //Agregar Producto
    socket.on('new-product', async(product) => {
       await productsPersistencia.add(product) 
   })

   //Mostrar La Lista
   let listaProductos = await productsPersistencia.getAll()
   
   myWSServer.emit('products', listaProductos);
 
   //Cuando un usuario se conecta obtiene los productos anteriores
  socket.on('askProduct', async(productos) => {
      let listaProductos = await productsPersistencia.getAll()
        
        socket.emit('products', listaProductos);
  });
 

  //Mensajes
 
  socket.on('new-mensaje', async(message) => {
   
     await mensajesPersistencia.add(message)
  })
  
  //Mostar Mensajes
  let todosMensajes = await  mensajesPersistencia.getAll()
         myWSServer.emit('mensajes', todosMensajes);
 
  //Mostar mensajes anteriores
  socket.on('askMensajes', async(mensajes) => {
   let todosMensajes =  await mensajesPersistencia.getAll()
    
     socket.emit('mensajes', todosMensajes); 
 });
})



export default myServer