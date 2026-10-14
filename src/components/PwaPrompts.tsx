import { useRegisterSW } from 'virtual:pwa-register/react'
import { useT } from '../i18n/strings'

export default function PwaPrompts() {
  const t = useT()
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW()

  if (!offlineReady && !needRefresh) return null

  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  return (
    <div className="toast" role="status">
      <span>{needRefresh ? t.updateReady : t.offlineReady}</span>
      {needRefresh && (
        <button className="btn btn-small" onClick={() => updateServiceWorker(true)}>
          {t.reload}
        </button>
      )}
      <button className="btn btn-small btn-ghost" onClick={close}>
        {needRefresh ? t.dismiss : t.close}
      </button>
    </div>
  )
}
