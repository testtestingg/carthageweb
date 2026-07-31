/**
 * Shared animation tokens written to :root.
 *
 * The homepage hero owns the scroll progress of the oversized-logo handover,
 * but the header renders it. Rather than have one component query the other's
 * DOM, the hero publishes progress as a CSS custom property on the document
 * element and the header styles itself from it — a one-way contract that also
 * avoids re-rendering the header on every scroll frame.
 */
export const LOGO_PROGRESS_VAR = "--carthage-logo-progress"
