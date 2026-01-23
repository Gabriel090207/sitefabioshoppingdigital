import './Home.css'
import heroImage from '../../assets/images/hero-delivery.png'
import CategoryCard from '../../components/categories/CategoryCard'

import { FiShoppingCart, FiTool, FiUsers } from 'react-icons/fi'
import { MdBakeryDining, MdRestaurant } from 'react-icons/md'
import { GiMeat } from 'react-icons/gi'

import ProductCard from '../../components/products/ProductCard'

import StepsSection from '../../components/steps/StepsSection'

import Divider from '../../components/divider/Divider'

import { Link } from 'react-router-dom'



const products = [
    {
      id: 1,
      name: 'Pizza artesanal',
      price: 49.9,
      store: 'Pizzaria do Centro',
      rating: 4.8,
      image:
        'https://images.unsplash.com/photo-1548365328-8b849e6f5c9d'
    },
    {
      id: 2,
      name: 'Cesta básica',
      price: 129.9,
      store: 'Mercado do Bairro',
      rating: 4.7,
      image:
        'https://images.unsplash.com/photo-1586201375754-1421e45f4d29'
    }
  ]
  
export default function Home() {
  return (
    <section className="home">
      {/* HERO STRIP */}
      <section
        className="hero-strip"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-strip-overlay" />

        <div className="hero-strip-content">
          {/* TEXTO */}
          <div className="hero-strip-text">
            <h1>Shopping Digital</h1>
            <p>
              Encontre produtos e serviços locais com a mesma
              experiência de grandes marketplaces.
            </p>

            <div className="hero-actions">
            <Link to="/lojas" className="btn-primary">
  Ver lojas
</Link>

              <button className="btn-secondary">Oferecer serviços</button>
            </div>
          </div>
        </div>

       
      </section>


      <StepsSection />

      <Divider />



      <section className="categories-section">
  <div className="categories-container">
  <CategoryCard icon={FiShoppingCart} title="Mercados" />
<CategoryCard icon={MdBakeryDining} title="Padarias" />
<CategoryCard icon={GiMeat} title="Açougues" />
<CategoryCard icon={MdRestaurant} title="Restaurantes" />
<CategoryCard icon={FiTool} title="Serviços" />
<CategoryCard icon={FiUsers} title="Profissionais" />
  </div>
</section>


<section className="products-section">
      <h2>Produtos mais vendidos</h2>

      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>


    </section>

    

    
  )
}
