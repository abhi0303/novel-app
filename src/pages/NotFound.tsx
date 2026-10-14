import { Link } from 'react-router-dom'
import { useT } from '../i18n/strings'

export default function NotFound() {
  const t = useT()
  return (
    <div className="page container not-found">
      <div className="soon-mark" aria-hidden="true">
        ?
      </div>
      <p>{t.notFound}</p>
      <Link to="/" className="btn">
        {t.backToLibrary}
      </Link>
    </div>
  )
}
