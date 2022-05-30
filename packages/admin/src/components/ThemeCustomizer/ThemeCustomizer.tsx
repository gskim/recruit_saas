import * as layoutConstants from 'appConstants'
import LayoutColor from './LayoutColor'
import LeftSideBarTheme from './LeftSideBarTheme'
import useThemeCustomizer from './useThemeCustomizer'

const ThemeCustomizer = () => {
    const { layoutColor, leftSideBarTheme, disableSidebarTheme, changeLayoutColorScheme, changeLeftSidebarTheme } =
        useThemeCustomizer()

    return (
        <div className="p-3">
            <LayoutColor
                changeLayoutColorScheme={changeLayoutColorScheme}
                layoutColor={layoutColor}
                layoutConstants={layoutConstants.LayoutColor}
            />
            {disableSidebarTheme && (
                <LeftSideBarTheme
                    changeLeftSidebarTheme={changeLeftSidebarTheme}
                    leftSideBarTheme={leftSideBarTheme}
                    layoutConstants={layoutConstants.SideBarTheme}
                />
            )}
        </div>
    )
}

export default ThemeCustomizer
