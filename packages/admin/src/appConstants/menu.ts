export type MenuItemType = {
    key: string
    label: string
    isTitle?: boolean
    icon?: string
    url?: string
    badge?: {
        variant: string
        text: string
    }
    parentKey?: string
    target?: string
    children?: MenuItemType[]
}

const MENU_ITEMS: MenuItemType[] = [
    {
        key: 'admins',
        label: '관리자 관리',
        isTitle: false,
        icon: 'uil-user-circle',
        url: '/admins',
    },
    {
        key: 'companies',
        label: '기업 관리',
        isTitle: false,
        icon: 'uil-building',
        url: '/companies',
    },
    {
        key: 'employees',
        label: '외부직원 관리',
        isTitle: false,
        icon: 'uil-user-check',
        url: '/employees',
    },
    {
        key: 'subscribes',
        label: '구독 관리',
        isTitle: false,
        icon: 'uil-money-bill',
        url: '/subscribes',
    },
    {
        key: 'job_posts',
        label: '채용 공고 관리',
        isTitle: false,
        icon: 'uil-grid',
        url: '/job_posts',
    },
    {
        key: 'resumes',
        label: '이력서 관리',
        isTitle: false,
        icon: 'uil-users-alt',
        url: '/resumes',
    },
    {
        key: 'recruits',
        label: '채용 프로세스',
        isTitle: false,
        icon: 'uil-grids',
        url: '/recruits',
    },
    {
        key: 'job_categories',
        label: '직무 관리',
        isTitle: false,
        icon: 'uil-game-structure',
        url: '/job_categories',
    },
    {
        key: 'skills',
        label: '기술스택 관리',
        isTitle: false,
        icon: 'uil-atom',
        url: '/skills',
    },
    {
        key: 'licenses',
        label: '자격증 관리',
        isTitle: false,
        icon: 'uil-file-info-alt',
        url: '/licenses',
    },
    {
        key: 'schools',
        label: '학교 관리',
        isTitle: false,
        icon: 'uil-book-open',
        url: '/schools',
    },
]

export { MENU_ITEMS }
