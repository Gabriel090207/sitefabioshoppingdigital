import './StepsSection.css'
import { FiArrowRight } from 'react-icons/fi'


export default function StepsSection() {
  return (
    <section className="steps-section">
      <div className="steps-container">
        <h2>Como funciona</h2>

        <div className="steps-grid">
  <div className="step-item">
    <div className="step-card">
      <span className="step-number">1</span>
      <h3>Encontre</h3>
      <p>Busque produtos ou serviços perto de você.</p>
    </div>

    <FiArrowRight className="step-arrow" />
  </div>

  <div className="step-item">
    <div className="step-card">
      <span className="step-number">2</span>
      <h3>Escolha</h3>
      <p>Compare preços, avaliações e lojas locais.</p>
    </div>

    <FiArrowRight className="step-arrow" />
  </div>

  <div className="step-item">
    <div className="step-card">
      <span className="step-number">3</span>
      <h3>Compre</h3>
      <p>Finalize seu pedido de forma rápida e segura.</p>
    </div>
  </div>
</div>

      </div>
    </section>
  )
}
