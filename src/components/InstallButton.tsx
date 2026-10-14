import { useInstallPrompt } from '../lib/install'
import { useT } from '../i18n/strings'
import Icon from './Icon'

export default function InstallButton() {
  const { available, install } = useInstallPrompt()
  const t = useT()
  if (!available) return null
  return (
    <button className="btn btn-small btn-ghost" onClick={install}>
      <Icon name="download" size={16} /> {t.install}
    </button>
  )
}
