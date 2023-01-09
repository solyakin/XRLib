/**
 * Date to time ago
 * @param date 
 * @returns 
 * 
 */

import moment from "moment/moment";

const timeAgo = (date) => {

    return moment(date).fromNow()
};

export default timeAgo;