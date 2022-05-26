import { DateTime } from "luxon";

const sum = (prev, current) => prev + current;

const getReportsMap = (patient) => {

    let reports = {};

    for (let report of patient.unresolvedReports) {
        reports[report.date] = report;
    }

    return reports
}

class PatientIssueState {

    supportRequests = [];
    goodDays = [];
    symptomCounts = {};
    missedDays = []

    constructor(patient) {
        this.processReports(patient.unresolvedReports);
        this.processMissedDays(patient);
        this.unreviewedPhotos = patient.unreviewedPhotos;

    }

    get state() {
        return ({
            goodDays: this.goodDays.length,
            missedReporting: this.numberOfMissedDays,
            symptoms: this.numberOfSymptoms,
            unreviewedPhotos: this.unreviewedPhotos.length,
            supportRequests: this.supportRequests.length
        })
    }

    get total() {
        return this.numberOfSymptoms + (this.numberOfMissedDays > 0 ? 1 : 0) + this.unreviewedPhotos.length + this.supportRequests.length
    }

    get numberOfMissedDays() {
        return this.missedDays.length
    }

    get numberOfSymptoms() {
        return Object.values(this.symptomCounts).reduce(sum, 0)
    }

    processReports(reports) {

        for (let report of reports) {

            if (report.doingOkay === false) {
                this.supportRequests.push({
                    date: report.date,
                    reason: report.doingOkayReason
                })
            }

            report.symptoms.forEach(symptom => {
                if (this.symptomCounts[symptom]) {
                    this.symptomCounts[symptom]++;
                } else {
                    this.symptomCounts[symptom] = 1;
                }
            })
        }

    }

    processMissedDays(patient) {
        if (!patient.lastGeneralResolution) return;

        let reportsMap = getReportsMap(patient);
        let iteratorDay = DateTime.fromISO(patient.lastGeneralResolution).startOf('day');
        const endDay = DateTime.local().startOf('day');

        const getReportForDate = () => {
            return reportsMap[`${iteratorDay.toISODate()}`];
        }

        const goToNextDay = () => {
            iteratorDay = iteratorDay.plus({ days: 1 })
        }

        while (!iteratorDay.equals(endDay)) {
            goToNextDay();
            let daysReport = getReportForDate();
            if (daysReport?.medicationWasTaken) {
                this.goodDays.push(iteratorDay.toISODate())
                continue
            }

            if (iteratorDay.toISODate() === DateTime.local().toISODate()) continue;
            this.missedDays.push(iteratorDay.toISODate())
        }
    }

}

function addIssuesToPatients(patients) {
    return patients.map(patient => {
        // let state = {symptoms: 0, missedReporting: 0, missedMedication: 0, feelingBad: 0, photo: 0, missedPhoto: 0, total: 0, missedMedicationDates: [], symptomCounts: {} };
        return { ...patient, issues: new PatientIssueState(patient) }
    })
}


export default addIssuesToPatients;