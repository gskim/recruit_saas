import { menus } from 'api'
import { MENU_ITEMS, MenuItemType } from 'appConstants'
import { useQuery } from 'react-query'

const getMenuItems = (): MenuItemType[] => {
    const { data, isLoading } = useQuery(
        'menus',
        () => {
            return menus()
        },
        { suspense: true }
    )
    return data?.data.data.menus
}

const findAllParent = (menuItems: MenuItemType[], menuItem: MenuItemType): string[] => {
    let parents: string[] = []
    const parent = findMenuItem(menuItems, menuItem['parentKey'])

    if (parent) {
        parents.push(parent['key'])
        if (parent['parentKey']) parents = [...parents, ...findAllParent(menuItems, parent)]
    }
    return parents
}

const findMenuItem = (
    menuItems: MenuItemType[] | undefined,
    menuItemKey: MenuItemType['key'] | undefined
): MenuItemType | null => {
    if (menuItems && menuItemKey) {
        for (var i = 0; i < menuItems.length; i++) {
            if (menuItems[i].key === menuItemKey) {
                return menuItems[i]
            }
            var found = findMenuItem(menuItems[i].children, menuItemKey)
            if (found) return found
        }
    }
    return null
}

export { getMenuItems, findAllParent, findMenuItem }
