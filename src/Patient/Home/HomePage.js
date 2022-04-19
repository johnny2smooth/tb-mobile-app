import React from 'react';
import Progress from './Progress';
import ActionBox from './OneStepActions/';
import Alerts from './Alerts';
import Colors from '../../Basics/Colors';
import Greeting from './Greeting';
import Reminders from './Reminders';
import MedicationReminder from './MedicationReminder';
import CachedReports from './CachedReports';
import VideoCard from './Videos';
import TestInstructions from './TestInstructions';
import RequiresAction from './MissedActions';
import PushNotificationEnrollment from './PushEnrollmentReminder';
import { makeStyles } from '@material-ui/core/styles';
import OneStepReportingUpdate from './OneStepReportingUpdate';

const useStyles = makeStyles({
  body: {
    width: '100%',
    minHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.backgroundGray
  }
})

const HomePage = () => {
  const classes = useStyles();
  return (
    <div className={classes.body}>
      {/* Some of these components are conditionally rendered within thier implementaion */}
      <PushNotificationEnrollment />
      <Greeting />
      <ActionBox />
      <TestInstructions />
      <CachedReports />
      <RequiresAction />
      <VideoCard />
      <Alerts />
      <Progress />
      <MedicationReminder />
      <Reminders />
    </div>
  )

};

export default HomePage;

