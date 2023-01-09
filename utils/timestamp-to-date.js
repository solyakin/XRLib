import { Timestamp } from "firebase/firestore"

const timestampToDate = (timeStamp, mmddyy) => {
    //let checkTimeStamp = new Timestamp(timeStamp);
    //if (typeof checkTimeStamp !== timeStamp) throw new Error("Invalid input")
    if (!timeStamp) return false
    if (mmddyy) {
        let timeStampInDate = timeStamp.toDate()
        const yyyy = timeStampInDate.getFullYear();
        let mm = timeStampInDate.getMonth() + 1; // Months start at 0!
        let dd = timeStampInDate.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        const formattedDay = dd + '/' + mm + '/' + yyyy;
        return formattedDay
    }

    return timeStamp.toDate()
}

export default timestampToDate
