import moment from "moment";

const useMoment = () => {
  moment.updateLocale("en", {
    week: {
      dow: 1,
    },
  });

  return moment;
};

export default useMoment;