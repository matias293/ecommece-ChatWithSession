

class Auth {

    getLogin = (req,res) => {
        if(req.session.loggedIn){
            res.redirect('/')
        }
       res.render('login',{pageTitle:'Login'})

     }

     postLogin = (req,res) => {
        const {nombre} = req.body 
            if(nombre.length > 0){
                    req.session.loggedIn = true
                    req.session.nombre = nombre
                    return req.session.save(err => {
                        res.redirect('/')
                      });
                    
            }
     }

     

     getLogOut  = (req,res) => {
        const nombre = req.session.nombre
         
         req.session.destroy();
         
         res.render('home',{pageTitle:'Home',isLogIn:false,nombre})
     }

}

export const authController = new Auth()