import {
    getResume,
    getResumeActivities,
    getResumeAwards,
    getResumeCareers,
    getResumeDescriptions,
    getResumeEducations,
    getResumeLanguageLevels,
    getResumeLanguageTests,
    getResumeLicenses,
    getResumeLinks,
} from 'api'
import { PageTitle } from 'components'
import Loading from 'components/Loading'
import ActivityView from 'components/resume/ActivityView'
import AwardView from 'components/resume/AwardView'
import BasicView from 'components/resume/BasicView'
import CareerView from 'components/resume/CareerView'
import DescriptionView from 'components/resume/DescriptionView'
import EducationView from 'components/resume/EducationView'
import LanguageLevelView from 'components/resume/LanguageLevelView'
import LanguageTestView from 'components/resume/LanguageTestView'
import LicenseView from 'components/resume/LicenseView'
import LinkView from 'components/resume/LinkView'
import { Suspense } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

const ViewResume = () => {
    const { id } = useParams()
    const queryOption = {
        suspense: true,
    }

    const { data: resume } = useQuery(`resumes/${id}`, () => getResume(Number(id)), queryOption)
    const { data: careers } = useQuery(`resumes/${id}/careers`, () => getResumeCareers(Number(id)), queryOption)
    const { data: awards } = useQuery(`resumes/${id}/awards`, () => getResumeAwards(Number(id)), queryOption)
    const { data: activities } = useQuery(
        `resumes/${id}/activities`,
        () => getResumeActivities(Number(id)),
        queryOption
    )
    const { data: educations } = useQuery(
        `resumes/${id}/educations`,
        () => getResumeEducations(Number(id)),
        queryOption
    )
    const { data: licenses } = useQuery(`resumes/${id}/licenses`, () => getResumeLicenses(Number(id)), queryOption)
    const { data: descriptions } = useQuery(
        `resumes/${id}/descriptions`,
        () => getResumeDescriptions(Number(id)),
        queryOption
    )
    const { data: links } = useQuery(`resumes/${id}/links`, () => getResumeLinks(Number(id)), queryOption)
    const { data: languageLevels } = useQuery(
        `resumes/${id}/language_levels`,
        () => getResumeLanguageLevels(Number(id)),
        queryOption
    )
    const { data: languageTests } = useQuery(
        `resumes/${id}/language_tests`,
        () => getResumeLanguageTests(Number(id)),
        queryOption
    )

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: '이력서 목록', path: '/resumes' },
                    { label: '이력서 상세', path: '/resumes/view/id', active: true },
                ]}
                title={'이력서 상세'}
            />
            <Row>
                <Suspense fallback={Loading}>
                    <Col>
                        <Card className="d-block">
                            <Card.Body>
                                <BasicView item={resume?.data?.item!!} />
                                {careers?.data?.item_list.length && <hr />}
                                <CareerView itemList={careers?.data?.item_list!!} />
                                {!!educations?.data?.item_list.length && <hr />}
                                <EducationView itemList={educations?.data?.item_list!!} />
                                {!!languageLevels?.data?.item_list.length && <hr />}
                                <LanguageLevelView itemList={languageLevels?.data?.item_list!!} />
                                {!!languageTests?.data?.item_list.length && <hr />}
                                <LanguageTestView itemList={languageTests?.data?.item_list!!} />
                                {!!licenses?.data?.item_list.length && <hr />}
                                <LicenseView itemList={licenses?.data?.item_list!!} />
                                {!!activities?.data?.item_list.length && <hr />}
                                <ActivityView itemList={activities?.data?.item_list!!} />
                                {!!awards?.data?.item_list.length && <hr />}
                                <AwardView itemList={awards?.data?.item_list!!} />
                                {!!descriptions?.data?.item_list.length && <hr />}
                                <DescriptionView itemList={descriptions?.data?.item_list!!} />
                                {!!links?.data?.item_list.length && <hr />}
                                <LinkView itemList={links?.data?.item_list!!} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Suspense>
            </Row>
        </>
    )
}

export default ViewResume
