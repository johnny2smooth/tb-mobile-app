import React from 'react'
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import PopOver from '../Shared/PopOver';
import MuiButton from '../../Basics/MuiButton';
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    popOverBody:{
        marginBottom: "1em"
    }
})

const ResetPassword = observer(() => {
    const {t} = useTranslation('translation');
    const classes = useStyles();
    const { practitionerStore, patientProfileStore } = useStores();

    return(
    <PopOver close={patientProfileStore.toggleOnPasswordReset} title={t("coordinator.patientProfile.resetPassword")}>
            <Typography className={classes.popOverBody} variant="body1">{t("coordinator.patientProfile.resetPasswordExplanation")}</Typography>
            <MuiButton onClick={practitionerStore.resetPassword}>{t("coordinator.patientProfile.resetPassword")}</MuiButton>
            {practitionerStore.newActivationCode && <p>{practitionerStore.newActivationCode}</p>}
    </PopOver>)
});

export default ResetPassword;
