import './SidebarFilter.css'
import { useState } from 'react'

const categories = [
  'Todas',
  'Mercados',
  'Padarias',
  'Açougues',
  'Restaurantes',
  'Serviços',
  'Profissionais'
]

export default function SidebarFilter() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* BOTÃO MOBILE */}
      <button
        className={`sidebar-toggle ${open ? 'open' : ''}`}
        onClick={() => setOpen(!open)}
      >
        {open ? '‹' : '›'}
      </button>

      {/* SIDEBAR */}
      <aside className={`sidebar-filter ${open ? 'open' : ''}`}>
        <h3>Categorias</h3>

        <ul>
          {categories.map(category => (
            <li
              key={category}
              className={category === 'Todas' ? 'active' : ''}
            >
              {category}
            </li>
          ))}
        </ul>
      </aside>
    </>
  )
}
