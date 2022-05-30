import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { showRightSidebar, changeSidebarType } from 'redux/actions'
import * as layoutConstants from 'appConstants'
import { useRedux, useToggle, useUser, useViewport } from 'hooks'
import { profileMenus } from './data'
import ProfileDropdown from './ProfileDropdown'
import logoSmDark from 'assets/images/logo_sm_dark.png'
import logoSmLight from 'assets/images/logo_sm.png'
import logo from 'assets/images/logo-light.png'
import profile from 'assets/images/profile/profile.jpeg'

type TopbarProps = {
    hideLogo?: boolean
    navCssClasses?: string
    openLeftMenuCallBack?: () => void
    topbarDark?: boolean
}

const Topbar = ({ hideLogo, navCssClasses, openLeftMenuCallBack, topbarDark }: TopbarProps) => {
    const { dispatch, appSelector } = useRedux()

    const { width } = useViewport()
    const [isMenuOpened, toggleMenu] = useToggle()
    const [user] = useUser()
    const admin = user.user

    const containerCssClasses = !hideLogo ? 'container-fluid' : ''

    const { layoutType, leftSideBarType } = appSelector((state) => ({
        layoutType: state.Layout.layoutType,
        leftSideBarType: state.Layout.leftSideBarType,
    }))

    /**
     * Toggle the leftmenu when having mobile screen
     */
    const handleLeftMenuCallBack = () => {
        toggleMenu()
        if (openLeftMenuCallBack) openLeftMenuCallBack()

        if (width >= 768) {
            if (leftSideBarType === 'fixed' || leftSideBarType === 'scrollable')
                dispatch(changeSidebarType(layoutConstants.SideBarWidth.LEFT_SIDEBAR_TYPE_CONDENSED))
            if (leftSideBarType === 'condensed')
                dispatch(changeSidebarType(layoutConstants.SideBarWidth.LEFT_SIDEBAR_TYPE_FIXED))
        }
    }

    /**
     * Toggles the right sidebar
     */
    const handleRightSideBar = () => {
        dispatch(showRightSidebar())
    }

    return (
        <div className={classNames('navbar-custom', navCssClasses)}>
            <div className={containerCssClasses}>
                {!hideLogo && (
                    <Link to="/" className="topnav-logo">
                        <span className="topnav-logo-lg">
                            <img src={logo} alt="logo" height="16" />
                        </span>
                        <span className="topnav-logo-sm">
                            <img src={topbarDark ? logoSmLight : logoSmDark} alt="logo" height="16" />
                        </span>
                    </Link>
                )}

                <ul className="list-unstyled topbar-menu float-end mb-0">
                    <li className="notification-list">
                        <button
                            className="nav-link dropdown-toggle end-bar-toggle arrow-none btn btn-link shadow-none"
                            onClick={handleRightSideBar}
                        >
                            <i className="dripicons-gear noti-icon"></i>
                        </button>
                    </li>
                    <li className="dropdown notification-list">
                        <ProfileDropdown
                            userImage={admin.profile_image || profile}
                            menuItems={profileMenus}
                            nickname={admin.nickname || 'Nickname'}
                            email={admin.email}
                        />
                    </li>
                </ul>

                <button className="button-menu-mobile open-left" onClick={handleLeftMenuCallBack}>
                    <i className="mdi mdi-menu" />
                </button>
            </div>
        </div>
    )
}

export default Topbar
