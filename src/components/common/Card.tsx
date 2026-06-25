import type { ReactNode } from 'react'
import './Card.css'

export function Card({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="card">
      {title && <h3 className="card__title">{title}</h3>}
      {children}
    </div>
  )
}
