import APIHelper from "./Requests";

export default class PatientInformationAPI {

    constructor(patientID) {
        this.patientID = patientID;
        this.api = new APIHelper();
    }

    request(route, method, body, options = { includeStatus: true }) {
        return this.api.executeRawRequest(route, method, body, options)
    }

    get patientPath() {
        return `/v2/patient/${this.patientID}`;
    }

    createContactTracingSurvey(numberContacts, numberTested) {
        const body = {
            contactTracingSurvey: {
                numberOfContacts: numberContacts,
                numberOfContactsTested: numberTested
            }
        }

        return this.request(`${this.patientPath}/contact_tracing_surveys`, "POST", body)
    }

    async submitBackPhotoReport(photoString, date, redoForReportId = null ) {
        //Get presigned upload url from API
        const { uploadURL, fileName } = await this.getPhotoUploadURL();

        //Actually send the photo to the file server
        const uploaded = await this.uploadPhoto(uploadURL, photoString);
        if (uploaded) {
            const newReport = await this.postPhotoReport({ date: date, photoUrl: fileName, backSubmission: true, redoForReportId: redoForReportId })
            return newReport;
        } else {
            console.log("error uploading photo")
            return false;
        }
    }

    async getPhotoUploadURL() {
        return this.request("/v2/photo_upload_urls?type=test-strip-photo", "POST").then(json => {
            return json;
        })
    }

    async postPhotoReport(body) {
        return this.request("/v2/photo_reports","POST",body).then(json => { return json })
    }

    async uploadPhoto(uploadURL, photoString) {

        const imageString = photoString.replace(/^data:image\/\w+;base64,/, "")
        const buffer = Buffer.from(imageString, 'base64');

        return fetch(uploadURL, { method: 'PUT', body: buffer }).then((res) => {
            return true;
        }).catch((e) => {
            console.error(e);
            return false;
        });
    }

    async getPhotoReports(offset,patientId){
        const params = (offset && offset > 0 ) ? `?offset=${offset}` : ""
        if(patientId){
            return this.request(`/v2/patient/${patientId}/photo_reports${params}`);
        }

        return this.request("/v2/photo_reports" + params);
    }

}