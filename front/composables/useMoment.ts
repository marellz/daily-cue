import moment from "moment";

const useMoment = () => {
    moment.updateLocale("en", {
      week: {
        dow: 6,
      },
    });

    return moment
}

export default useMoment