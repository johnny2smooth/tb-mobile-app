import React from 'react'
import { DateTime } from 'luxon';
import NewButton from '../../Basics/NewButton';
import Clipboard from '@material-ui/icons/Assignment'
import Camera from '@material-ui/icons/CameraAlt';
import InteractionCard from '../../Basics/InteractionCard';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'
import { useTranslation } from 'react-i18next';
import ClickableText from '../../Basics/ClickableText';
import { makeStyles } from '@material-ui/core';
import Styles from '../../Basics/Styles';
import { ReactComponent as DoctorIcon } from '../../Basics/Icons/doctor.svg';
import CheckIcon from '@material-ui/icons/Check';
import Colors from '../../Basics/Colors';


const useStyles = makeStyles({
    confirmation:{
        ...Styles.flexRow,
        marginBottom: "1em",
        alignContent: "center"
    },
    confirmationText:{
        ...Styles.flexColumn,
        paddingLeft: "1em",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "50%",
        textAlign: "left",
    },
    check:{
        color: Colors.approvedGreen,
        fontSize: "2.5em",
    },
    confirmationHeader: {
        ...Styles.flexRow,
        fontSize: "1.25em",
        margin: 0,
        "& > svg": {
            color: Colors.approvedGreen,
            marginLeft: ".5em"
        }
    },
    bottomButton:{
        margin: "1em",
        "& > svg":{
            fontSize: "1.25em"
        }
    }
})

const ActionBox = observer(() => {
    const classes = useStyles();
    const {patientStore,patientUIStore} = useStores();
    const { t, i18n } = useTranslation('translation');

    const handleReportClick = () =>{
        //patientStore.uiState.onTreatmentFlow = true;
        patientUIStore.moveToReportFlow();

    }

    const handlePhotoClick = () =>{
        patientUIStore.openPhotoReport();
    }

    return(
        <InteractionCard upperText={t("patient.home.cardTitles.todaysTasks")} className="intro-tasks">
            {patientStore.dailyActionsCompleted ? 
            <>
            <Confirmation onClick={patientUIStore.editReport} />
            </>
             :
            <>
            <NewButton positive={patientStore.report.hasSubmitted} onClick={handleReportClick} icon={<Clipboard />} text={t("patient.home.todaysActions.logMedication")} />
            {patientStore.isPhotoDay && <NewButton positive={patientStore.report.hasSubmittedPhoto} onClick={handlePhotoClick} icon={<Camera />} text={t("patient.home.todaysActions.uploadPhoto")} />} 
            </>
            }
            { patientStore.requiresSubmission && <ClickableText onClick={patientUIStore.skipToReportConfirmation} className={classes.bottomButton} text="Please Confirm and Submit Your Report" />}
        </InteractionCard>)
});

const Confirmation = (props) => {
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    return(
        <div className={classes.confirmation}>
            <DoctorIcon />
            <div className={classes.confirmationText}>
                <div className={classes.confirmationHeader}>{t("patient.home.completed.title")}<CheckIcon /></div>
                <p>{t("patient.home.completed.subtitle")}</p>
                <ClickableText onClick={props.onClick} hideIcon text={t("patient.home.completed.modify")}/>
            </div>
        </div>
    )


}

export default ActionBox;