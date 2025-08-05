// ** Return which component to render based on its data
export const resolveVerticalNavMenuItemComponent = item => {
  if (item.header) return 'VerticalNavMenuSectionHeader'
  if (item.children) return 'VerticalNavMenuGroup'
  return 'VerticalNavMenuLink'
}

// ** Return which component to render for horizontal nav
export const resolveHorizontalNavMenuItemComponent = item => {
  if (item.children) return 'HorizontalNavMenuGroup'
  return 'HorizontalNavMenuLink'
}

// ** Check if nav-link is active
export const isNavLinkActive = (link, currentURL, routerProps) => {
  return (
    currentURL === link ||
    (routerProps && routerProps.meta && routerProps.meta.navLink && routerProps.meta.navLink === link)
  )
}

// ** Check if the given item has the given URL in one of its children
export const hasActiveChild = (item, currentUrl) => {
  const { children } = item

  if (!children) return false

  for (const child of children) {
    if (child.children && hasActiveChild(child, currentUrl)) {
      return true
    }

    if (
      child?.navLink &&
      currentUrl &&
      (child.navLink === currentUrl || currentUrl.includes(child.navLink))
    ) {
      return true
    }
  }

  return false
}

// ** Remove collapsed children from openGroup
export const removeChildren = (children, openGroup, currentActiveGroup) => {
  children.forEach(child => {
    if (!currentActiveGroup.includes(child.id)) {
      const index = openGroup.indexOf(child.id)
      if (index > -1) openGroup.splice(index, 1)
      if (child.children) removeChildren(child.children, openGroup, currentActiveGroup)
    }
  })
}
