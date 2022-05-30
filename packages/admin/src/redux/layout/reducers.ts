import { LayoutTypes, LayoutColor, LayoutWidth, SideBarTheme, SideBarWidth } from 'appConstants'
import { getLayoutConfigs } from 'utils'
import { LayoutActionType } from './actions'
import { LayoutActionTypes, LayoutStateType } from './constants'
const layoutColor = sessionStorage.getItem('layoutColor')
const leftSideBarTheme = sessionStorage.getItem('leftSideBarTheme')

const INIT_STATE: LayoutStateType = {
    layoutColor: layoutColor ? (layoutColor as LayoutColor) : LayoutColor.LAYOUT_COLOR_LIGHT,
    layoutType: LayoutTypes.LAYOUT_VERTICAL,
    layoutWidth: LayoutWidth.LAYOUT_WIDTH_FLUID,
    leftSideBarTheme: leftSideBarTheme ? (leftSideBarTheme as SideBarTheme) : SideBarTheme.LEFT_SIDEBAR_THEME_DARK,
    leftSideBarType: SideBarWidth.LEFT_SIDEBAR_TYPE_FIXED,
    showRightSidebar: false,
}

const Layout = (state: LayoutStateType = INIT_STATE, action: LayoutActionType<string | boolean | null>) => {
    switch (action.type) {
        case LayoutActionTypes.CHANGE_LAYOUT:
            return {
                ...state,
                layoutType: action.payload,
            }
        case LayoutActionTypes.CHANGE_LAYOUT_COLOR:
            sessionStorage.setItem('layoutColor', action.payload!.toString())
            return {
                ...state,
                layoutColor: action.payload,
            }
        case LayoutActionTypes.CHANGE_LAYOUT_WIDTH:
            return {
                ...state,
                layoutWidth: action.payload,
                ...getLayoutConfigs(action.type, action.payload!),
            }
        case LayoutActionTypes.CHANGE_SIDEBAR_THEME:
            sessionStorage.setItem('leftSideBarTheme', action.payload!.toString())
            return {
                ...state,
                leftSideBarTheme: action.payload,
            }
        case LayoutActionTypes.CHANGE_SIDEBAR_TYPE:
            return {
                ...state,
                leftSideBarType: action.payload,
            }
        case LayoutActionTypes.SHOW_RIGHT_SIDEBAR:
            return {
                ...state,
                showRightSidebar: true,
            }
        case LayoutActionTypes.HIDE_RIGHT_SIDEBAR:
            return {
                ...state,
                showRightSidebar: false,
            }
        default:
            return state
    }
}

export default Layout
