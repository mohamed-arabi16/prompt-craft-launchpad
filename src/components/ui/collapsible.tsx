import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

/**
 * An interactive component which expands/collapses a content section.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/collapsible
 */
const Collapsible = CollapsiblePrimitive.Root

/**
 * The button that toggles the collapsible component.
 */
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

/**
 * The content that is shown or hidden by the collapsible component.
 */
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
