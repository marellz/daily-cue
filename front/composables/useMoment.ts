import moment from "moment";

const useMoment = () => {
    moment.locale("en", {
      week: {
        dow: 6,
      },
    });

    moment.locale("en");

    return moment
}

export default useMoment