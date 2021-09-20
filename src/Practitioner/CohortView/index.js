import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../../Basics/Colors';
import AdherenceGraph from './AdherenceGraph';
import { useTranslation } from 'react-i18next';
import PlusIcon from '@material-ui/icons/AddOutlined'
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import ProfileButton from '../../Components/FlatButton';
import AddPatient from './AddPatient';
import SectionTitle from '../../Components/Practitioner/SectionTitle';
import ActivationCodePopup from './ActivationCodePopUp'
import PatientList from './PatientList';
import Search from '../../Basics/SearchBar';
import Grid from '@material-ui/core/Grid'
import { Tab, Tabs } from '@material-ui/core';
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'

const PatientsView = observer((props) => {
    const classes = useStyles();
    const { t } = useTranslation('translation');
    const { practitionerStore } = useStores();

    const [search, setSearch] = useState('');

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        practitionerStore.getArchivedPatients();
    }, [])

    const toggleAddPatient = () => {
        practitionerStore.onAddPatientFlow = !practitionerStore.onAddPatientFlow
    }

    return (
        <>
            <ActivationCodePopup activationCode={practitionerStore.newActivationCode} close={() => { practitionerStore.newActivationCode = "" }} />
            <div className={classes.superContainer}>
                <div className={classes.container}>
                    <Grid className={classes.options} container justify='space-between'>
                        <SectionTitle>{t("coordinator.titles.myPatients")}</SectionTitle>
                        {!practitionerStore.onAddPatientFlow && <ProfileButton onClick={toggleAddPatient} className={classes.addPatient}><PlusIcon />{t('coordinator.addPatientFlow.title')}</ProfileButton>}
                    </Grid>
                    <AdherenceGraph />
                    <div className={classes.patientListContainer}>
                        <Grid className={classes.options} container justify='space-between'>
                            <SectionTitle>{t("List of Patients")}</SectionTitle>
                            <Search className={classes.search} handleChange={(event) => { setSearch(event.target.value) }}
                                placeholder={t('coordinator.cohortOverview.searchByName').toLocaleLowerCase()} />
                        </Grid>
                        <div className={classes.tabs}>
                            <Button onClick={() => { }}>Active (35)</Button>
                            <Button className={`${classes.offTab}`} onClick={() => { }}>Pending (2)</Button>
                            <Button className={`${classes.offTab}`} onClick={() => { }}>Archived (10)</Button>
                        </div>
                        <PatientList search={search} />
                    </div>
                </div>
                <div className={classes.sidebar}>
                    {practitionerStore.onAddPatientFlow && <AddPatient />}
                </div>
            </div>
        </>
    )
})

const useStyles = makeStyles({
    offTab: {
        backgroundColor: "#ECECEC !important",
        color: Colors.textGray,
        border: "solid 1px lightgray !important"
    },
    tabs: {
        marginBottom: "1em",
        fontSize: "1em",
        "& > button, & > span > button": {
            padding: ".5em .75em .25em .75em",
            borderRadius: "8px 8px 0 0",
            backgroundColor: "#F7F7F7",
            color: Colors.textDarkGray,
            border: "solid 1px gray",
            borderBottom: "none",
        },
        "& > button:hover":{
            backgroundColor: "white"
        }
    },
    patientListContainer: {


    },
    superContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row"
    },
    container: {
        maxWidth: "950px",
        flexGrow: 1,
        display: "flex",
        padding: "0 4em",
        flexDirection: "column",
        justifyContent: "flex-start",
        "& > div": {
            marginTop: "2em"
        },
        "& > div:last-of-type": {
            marginBottom: "2em"
        },
        height: "100vh",
        overflow: "scroll"
    },
    sidebar: {
        width: "300px",
        overflow: "hidden",
        height: "100vh",
        border: "solid 2px lightgray",
        marginLeft: "auto",
        boxSizing: "border-box",
    },
    options: {
        margin: "1em 0"
    },
    search: {
        width: 'fit-content',
        margin: 'unset',
        paddingRight: "1em",
        "&:placeholder": {
            fontSize: "14px"
        }
    }
})

export default PatientsView;