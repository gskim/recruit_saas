import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { DefaultLayout, VerticalLayout } from 'layouts'
import PrivateRoute from './PrivateRoute'
import Root from './Root'
import PublicRoute from './PublicRoute'
import { AdminRole } from '@recruit/interface'

// lazy load all the views

// auth
const Login = React.lazy(() => import('pages/account/Login'))
const Logout = React.lazy(() => import('pages/account/Logout'))
const Register = React.lazy(() => import('pages/account/Register'))
const Confirm = React.lazy(() => import('pages/account/Confirm'))

// admins
const AdminList = React.lazy(() => import('pages/admin/Admins'))
const AdminDetail = React.lazy(() => import('pages/admin/AdminsDetail'))

// companies
const CompanyList = React.lazy(() => import('pages/company/CompanyList'))
const CompanyDetail = React.lazy(() => import('pages/company/CompanyDetail'))

// licenses
const LicenseList = React.lazy(() => import('pages/license/LicenseList'))

// schools
const SchoolList = React.lazy(() => import('pages/school/SchoolList'))

// job_categories
const JobCategoryList = React.lazy(() => import('pages/job_category/JobCategoryList'))

// skills
const SkillList = React.lazy(() => import('pages/skill/SkillList'))
const SkillDetail = React.lazy(() => import('pages/skill/SkillDetail'))

// employees
const EmployeeList = React.lazy(() => import('pages/employee/EmployeeList'))
const EmployeeDetail = React.lazy(() => import('pages/employee/EmployeeDetail'))

// subscribes
const SubscribeList = React.lazy(() => import('pages/subscribe/SubscribeList'))
const SubscribeDetail = React.lazy(() => import('pages/subscribe/SubscribeDetail'))

// job_posts
const JobPostList = React.lazy(() => import('pages/job_posts/JobPostList'))
const JobPostDetail = React.lazy(() => import('pages/job_posts/JobPostDetail'))
const JobPostCreate = React.lazy(() => import('pages/job_posts/JobPostCreate'))

// resumes
const ResumeEdit = React.lazy(() => import('pages/resume/EditResume'))
const ResumeList = React.lazy(() => import('pages/resume/ResumeList'))
const ResumeView = React.lazy(() => import('pages/resume/ViewResume'))

// recruits
const RecruitList = React.lazy(() => import('pages/recruit/RecruitList'))
const RecruitDetail = React.lazy(() => import('pages/recruit/RecruitDetail'))

// - other
const ErrorPageNotFound = React.lazy(() => import('pages/error/PageNotFound'))
const ErrorPageNotFoundAlt = React.lazy(() => import('pages/error/PageNotFoundAlt'))

const ServerError = React.lazy(() => import('pages/error/ServerError'))
const ServerErrorAlt = React.lazy(() => import('pages/error/ServerErrorAlt'))

const loading = () => <div className=""></div>

type LoadComponentProps = {
    component: React.LazyExoticComponent<() => JSX.Element>
}

const LoadComponent = ({ component: Component }: LoadComponentProps) => (
    <Suspense fallback={loading()}>
        <Component />
    </Suspense>
)

const AllRoutes = () => {
    let Layout = VerticalLayout

    return useRoutes([
        { path: '/', element: <Root /> },
        {
            // public routes
            path: '/',
            element: <DefaultLayout />,
            children: [
                {
                    path: 'account',
                    children: [
                        { path: 'login', element: <LoadComponent component={Login} /> },
                        { path: 'register', element: <LoadComponent component={Register} /> },
                        { path: 'confirm', element: <LoadComponent component={Confirm} /> },
                        { path: 'logout', element: <LoadComponent component={Logout} /> },
                    ],
                },
                {
                    path: 'error-404',
                    element: <LoadComponent component={ErrorPageNotFound} />,
                },
                {
                    path: 'error-500',
                    element: <LoadComponent component={ServerError} />,
                },
            ],
        },
        {
            path: '/',
            element: <PublicRoute component={Layout} />,
            children: [
                {
                    path: 'error-404-alt',
                    element: <LoadComponent component={ErrorPageNotFoundAlt} />,
                },
                {
                    path: 'error-500-alt',
                    element: <LoadComponent component={ServerErrorAlt} />,
                },
            ],
        },
        {
            // auth protected routes
            path: '/',
            element: <PrivateRoute roles={AdminRole.ADMIN} component={Layout} />,
            children: [
                {
                    path: 'admins',
                    children: [
                        {
                            path: '',
                            element: <LoadComponent component={AdminList} />,
                        },
                        {
                            path: ':id',
                            element: <LoadComponent component={AdminDetail} />,
                        },
                    ],
                },
                {
                    path: 'companies',
                    children: [
                        {
                            path: '',
                            element: <LoadComponent component={CompanyList} />,
                        },
                        {
                            path: ':id',
                            element: <LoadComponent component={CompanyDetail} />,
                        },
                    ],
                },
                {
                    path: 'licenses',
                    children: [
                        {
                            path: '',
                            element: <LoadComponent component={LicenseList} />,
                        },
                    ],
                },
                {
                    path: 'schools',
                    children: [
                        {
                            path: '',
                            element: <LoadComponent component={SchoolList} />,
                        },
                    ],
                },
                {
                    path: 'job_categories',
                    children: [
                        {
                            path: '',
                            element: <LoadComponent component={JobCategoryList} />,
                        },
                    ],
                },
                {
                    path: 'skills',
                    children: [
                        {
                            path: '',
                            element: <LoadComponent component={SkillList} />,
                        },
                        {
                            path: ':id',
                            element: <LoadComponent component={SkillDetail} />,
                        },
                    ],
                },
                {
                    path: 'employees',
                    children: [
                        {
                            path: '',
                            element: <LoadComponent component={EmployeeList} />,
                        },
                        {
                            path: ':id',
                            element: <LoadComponent component={EmployeeDetail} />,
                        },
                    ],
                },
                {
                    path: 'subscribes',
                    children: [
                        {
                            path: '',
                            element: <LoadComponent component={SubscribeList} />,
                        },
                        {
                            path: ':id',
                            element: <LoadComponent component={SubscribeDetail} />,
                        },
                    ],
                },
                {
                    path: 'job_posts',
                    children: [
                        {
                            path: '',
                            element: <LoadComponent component={JobPostList} />,
                        },
                        {
                            path: 'view/:id',
                            element: <LoadComponent component={JobPostDetail} />,
                        },
                        {
                            path: ':id',
                            element: <LoadComponent component={JobPostCreate} />,
                        },
                    ],
                },
                {
                    path: 'resumes',
                    children: [
                        {
                            path: '',
                            element: <LoadComponent component={ResumeList} />,
                        },
                        {
                            path: 'view/:id',
                            element: <LoadComponent component={ResumeView} />,
                        },
                        {
                            path: ':id',
                            element: <LoadComponent component={ResumeEdit} />,
                        },
                    ],
                },
                {
                    path: 'recruits',
                    children: [
                        {
                            path: '',
                            element: <LoadComponent component={RecruitList} />,
                        },
                        {
                            path: ':id',
                            element: <LoadComponent component={RecruitDetail} />,
                        },
                    ],
                },
            ],
        },
        {
            path: '*',
            element: <LoadComponent component={ErrorPageNotFound} />,
        },
    ])
}

export { AllRoutes }
