import './CategoryCard.css'

interface CategoryCardProps {
  icon: React.ElementType
  title: string
}

export default function CategoryCard({
  icon: Icon,
  title
}: CategoryCardProps) {
  return (
    <div className="category-card">
      <Icon className="category-icon" />
      <span className="category-title">{title}</span>
    </div>
  )
}
