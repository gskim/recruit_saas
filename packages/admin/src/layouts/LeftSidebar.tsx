import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import SimpleBar from 'simplebar-react'
import classNames from 'classnames'
import { getMenuItems } from 'helpers'
import AppMenu from './Menu/'
import logoSm from 'assets/images/logo/symbol.png'
import logoDark from 'assets/images/logo/02_s.png'
import logoDarkSm from 'assets/images/logo/symbol_gray.png'
import logo from 'assets/images/logo/02_s_white.png'
import helpBoxImage from 'assets/images/help-icon.svg'
import profileImg from 'assets/images/users/avatar-1.jpg'

type SideBarContentProps = {
    hideUserProfile: boolean
}

const SideBarContent = ({ hideUserProfile }: SideBarContentProps) => {
    return (
        <>
            {!hideUserProfile && (
                <div className="leftbar-user">
                    <Link to="/">
                        <img src={profileImg} alt="" height="42" className="rounded-circle shadow-sm" />
                        <span className="leftbar-user-name">Dominic Keller</span>
                    </Link>
                </div>
            )}
            <AppMenu menuItems={getMenuItems()} />

            <div className="clearfix" />
        </>
    )
}

type LeftSidebarProps = {
    hideLogo?: boolean
    hideUserProfile: boolean
    isLight: boolean
    isCondensed: boolean
}

const LeftSidebar = ({ isCondensed, isLight, hideLogo, hideUserProfile }: LeftSidebarProps) => {
    const menuNodeRef = useRef<HTMLDivElement>(null)

    /**
     * Handle the click anywhere in doc
     */
    const handleOtherClick = (e: MouseEvent) => {
        if (menuNodeRef && menuNodeRef.current && menuNodeRef.current.contains(e.target as Node)) return
        // else hide the menubar
        if (document.body) {
            document.body.classList.remove('sidebar-enable')
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleOtherClick, false)

        return () => {
            document.removeEventListener('mousedown', handleOtherClick, false)
        }
    }, [])

    return (
        <div className="leftside-menu" ref={menuNodeRef}>
            {!hideLogo && (
                <>
                    <Link to="/" className="logo text-center logo-light">
                        <span className="logo-lg">
                            <img src={isLight ? logoDark : logo} alt="logo" height="36" />
                        </span>
                        <span className="logo-sm">
                            <img src={isLight ? logoSm : logoDarkSm} alt="logo" height="36" />
                        </span>
                    </Link>

                    <Link to="/" className="logo text-center logo-dark">
                        <span className="logo-lg">
                            <img src={isLight ? logoDark : logo} alt="logo" height="36" />
                        </span>
                        <span className="logo-sm">
                            <img src={isLight ? logoSm : logoDarkSm} alt="logo" height="36" />
                        </span>
                    </Link>
                </>
            )}

            {!isCondensed && (
                <SimpleBar style={{ maxHeight: '100%' }} timeout={500} scrollbarMaxSize={320}>
                    <SideBarContent hideUserProfile={hideUserProfile} />
                </SimpleBar>
            )}
            {isCondensed && <SideBarContent hideUserProfile={hideUserProfile} />}
        </div>
    )
}

export default LeftSidebar
