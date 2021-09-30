import bcrypt from'bcryptjs'

import Usuario from '../models/usuario'


class Auth {

    getLogin = (req,res) => {
        if(req.session.loggedIn){
            res.redirect('/')
        }
       res.render('login',{pageTitle:'Login'})

     }

     postLogin = async(req,res) => {
        const {username,password} = req.body 
            if(username.length > 0 && password.length > 0){
             const user = await Usuario.findOne({username})
              const match = bcrypt.compare(password,user.password)
                if(!match){
                    return res.redirect('/')
                }
                    req.session.loggedIn = true
                    req.session.user = user
                    return req.session.save(err => {
                        res.redirect('/')
                      });
                    
            }
     }

     

     getLogOut  = (req,res) => {
          if(!req.session.loggedIn){
             return res.redirect('/')
          }

        const username = req.session.username
         
         req.session.destroy();
         
          res.render('home',{pageTitle:'Home',isLogIn:false,username})

         
     }

     getSignUp = (req,res) => {
        res.render('signup',{pageTitle:'Sign Up'})
     }

     postSignUp = async(req,res) => {
        const {username,contraseña} = req.body 
        let password

        if(username.length > 0 && contraseña.length > 0){
            const user = await Usuario.findOne({username})
             if(user){
                return res.redirect('/signup')
             }

             const salt = bcrypt.genSaltSync()
             password = bcrypt.hashSync( contraseña, salt )
             const userToSave = {username,password}
             
            
                const usuario = new Usuario(userToSave)
                
                await usuario.save()
                return res.redirect('/login')

        }
        else res.redirect('/signup')
     }

}

export const authController = new Auth()