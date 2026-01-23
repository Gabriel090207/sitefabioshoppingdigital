import './Divider.css'

export default function Divider() {
  return (
    <div className="divider">
      <span className="divider-line" />

      <div className="divider-center">
        <img
          src="/divider-logo.png"
          alt="Divider"
          className="divider-image"
        />
      </div>

      <span className="divider-line" />
    </div>
  )
}
