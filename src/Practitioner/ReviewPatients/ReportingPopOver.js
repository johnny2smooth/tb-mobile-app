import React, { useCallback, useMemo, useState } from 'react'
import PopOverV2 from '../../Components/Shared/PopOverV2'
import { useHistory, useParams, useLocation, Switch, Route, useRouteMatch } from 'react-router-dom'
import SharedAPI from '../../API/SharedAPI';
import useAsync from '../../Hooks/useAsync';
import ReportingCalendar from '../../Components/Shared/ReportViews/Calendar';
import { Box, Button, Fade, Typography } from '@material-ui/core';
import Loading from '../Shared/CardLoading';
import CalendarKey from '../../Components/Shared/ReportViews/Calendar/CalendarKey';
import { useTranslation } from 'react-i18next';
import ViewDailyReport from '../../Components/Shared/ViewDailyReport';
import { DateTime } from 'luxon';
import Colors from '../../Basics/Colors';
import { CameraAlt, ChevronLeft, Event, ListAlt } from '@material-ui/icons';
import LinkTabs from '../../Components/Shared/LinkTabs';
import ReportList from '../../Components/Shared/ReportViews/List';
import StickyTopBar from '../../Components/Shared/StickyTopBar';
import useQuery from '../../Hooks/useQuery';

const links = [
    { link: "calendar", text: "Calendar", icon: Event },
    { link: "list", text: "List", icon: ListAlt },
    { link: "photos", text: "Photos", icon: CameraAlt }
]

export default function ReportingPopover({ patient, handleExit }) {

    const { t } = useTranslation('translation');

    const { patientId } = useParams();

    const getDailyReports = useCallback(() => {
        return SharedAPI.getDailyReports(patientId)
    }, [patientId]);

    const { value, status } = useAsync(getDailyReports);

    const reportHash = useMemo(() => {
        return value ? value.reduce((prev, current,) => {
            const { date } = current;
            return { ...prev, [date]: current };
        }, {}) : {}
    }, [value])


    const location = useLocation();
    const history = useHistory();
    const query = useQuery();
    const date = query.get('date')


    return (<PopOverV2 open={true} topBarTitle={patient ? `${patient.fullName} ${t('coordinator.patientProfile.listReports')}` : ""} handleExit={handleExit}>
        <StickyTopBar>
            {date ? <Button onClick={history.goBack}>Go Back</Button> : <LinkTabs tabs={links} />}
        </StickyTopBar>
        {status === "pending" ? <Loading height={"50vh"} /> :
            <>{date ?
                <Fade in appear>
                    <Box>
                        <ViewReport reportHash={reportHash} />
                    </Box>
                </Fade>
                :
                <Switch>
                    <Route path="*/calendar">
                        <CalendarStuff patient={patient} reportHash={reportHash} />
                    </Route>
                    <Route path="*/list">
                        <ReportList reportHash={reportHash} patient={patient} />
                    </Route>
                    <Route path="*/photos">
                        <p>Coming Soon</p>
                    </Route>
                </Switch>
            }</>}
    </PopOverV2 >)

}

const Tabs = () => {

    const location = useLocation();
    const history = useHistory();
    const date = new URLSearchParams(location.search).get('date')

    return (<StickyTopBar>
        {date ? <Button onClick={history.goBack}>Go Back</Button> : <LinkTabs tabs={links} />}
    </StickyTopBar>)
}

const CalendarStuff = ({ patient, reportHash }) => {

    const [state, setState] = useState({
        calendarStartDate: new Date()
    });

    const { calendarStartDate } = state;

    const location = useLocation();
    const history = useHistory();

    const updateMonth = (forward = true) => {
        setState({ ...state, calendarStartDate: DateTime.fromJSDate(state.calendarStartDate).startOf("month").plus({ month: forward ? 1 : -1 }).toJSDate() })
    }

    return (
        <Box padding="1em">
            <ReportingCalendar
                updateMonth={updateMonth}
                displayStartDate={calendarStartDate}
                handleDateChange={(date) => { history.push(`?date=${date}`) }}
                patient={patient}
                reports={reportHash} />
            <Box height="2em" />
            <Box bgcolor={Colors.lighterGray} padding=".5em" borderRadius="4px">
                <CalendarKey />
            </Box>
        </Box>
    )
}

const ViewReport = ({ reportHash }) => {

    const query = useQuery();
    const reportDate = query.get('date')

    return <ViewDailyReport date={reportDate} report={reportHash[reportDate]} />
}