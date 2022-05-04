import React from 'react';
import { Grid } from '@material-ui/core';
import { Assignment as Clipboard } from '@material-ui/icons'
import Symptom from '../../Shared/Symptom';
import IssueSection from './IssueSection';
import { useTranslation } from 'react-i18next';

const SymptomSummary = ({ patient }) => {

    const { t } = useTranslation('translation');

    return (
        <IssueSection title={t('commonWords.symptoms')} icon={Clipboard} number={2}>
            {Object.keys(patient.issues.symptomCounts).map((string, index) => {
                const count = patient.issues.symptomCounts[string];
                return (<Grid key={`${patient.id}-symptom-${index}`} container>
                    <Symptom string={string} />
                    {count > 1 && <>: {count}</>}
                </Grid>)
            })}
        </IssueSection>
    )

}

export default SymptomSummary;