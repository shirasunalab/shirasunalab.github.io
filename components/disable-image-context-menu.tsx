"use client"

import { useEffect } from "react"

function isImageTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false
  if (target.closest('[data-allow-image-context-menu="true"]')) return false
  return Boolean(target.closest("img"))
}

export function DisableImageContextMenu() {
  useEffect(() => {
    const onContextMenu = (event: MouseEvent) => {
      if (!isImageTarget(event.target)) return
      event.preventDefault()
    }

    const onDragStart = (event: DragEvent) => {
      if (!isImageTarget(event.target)) return
      event.preventDefault()
    }

    // Capture phase to reliably intercept before the browser opens menus.
    document.addEventListener("contextmenu", onContextMenu, { capture: true })
    document.addEventListener("dragstart", onDragStart, { capture: true })

    return () => {
      document.removeEventListener("contextmenu", onContextMenu, {
        capture: true,
      })
      document.removeEventListener("dragstart", onDragStart, { capture: true })
    }
  }, [])

  return null
}
