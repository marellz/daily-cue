import moment from "moment";

const useMoment = () => {
  moment.updateLocale("en", {
    week: {
      dow: 1,
    },
  });

  return moment;
};

export const weekdaysShort = computed(() =>
  moment.weekdaysShort().slice(1).concat(moment.weekdaysShort()[0])
);

export default useMoment;