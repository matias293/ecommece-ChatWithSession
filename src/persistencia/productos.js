
import Product from '../models/product'


class Productos {
    getAll = async() =>{
        const products =  await Product.find()
          return products
      
      }
    
      getProduct = async(id) =>{
        const product = await Product.findById(id)
        return product
      
    }

      add = async(data) => {
         const product = new Product(data)
         await product.save()
      }

      update = async(id, data )=> {
        await Producto.findByIdAndUpdate(id,data)
      }

      delete = async(id) => {
      
          const product = await products.findByIdAndDelete(id);
          return product
      }
    
}

export const productsPersistencia = new Productos();