import { useId, useState, type ReactNode } from 'react'
import './CollapsibleSection.css'

interface Props {
  title: string
  defaultOpen?: boolean
  children: ReactNode
}

export function CollapsibleSection({ title, defaultOpen = false, children }: Props) {
  const [open, setOpen] = useState(defaultOpen)
  const contentId = useId()

  return (
    <div className="collapsible">
      <button
        type="button"
        className="collapsible__trigger"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={`collapsible__chevron ${open ? 'collapsible__chevron--open' : ''}`}>▶</span>
        {title}
      </button>
      {open && (
        <div id={contentId} className="collapsible__content">
          {children}
        </div>
      )}
    </div>
  )
}
