export function calcData({
  value,
  offColor,
  onColor,
  data,
  state,
  lga,
  level,
}: {
  value: string;
  onColor: string;
  offColor: string;
  state: string;
  lga: string;
  level: string;
  data: {
    data: any;
    level: string;
    lga: string;
    state: string;
    lat: string;
    lon: string;
  }[];
}) {
  const parsed = data
    ?.filter(
      (d) =>
        d.level == level &&
        (!!state ? d.state == state : true) &&
        (!!lga ? d.lga == lga : true)
    )
    .map((d) => ({ ...d, data: JSON.parse(d.data) }));

  const yes = parsed.filter((d) => d.data[value] == "on")?.length;
  const no = parsed.filter((d) => d.data[value] == "off")?.length;

  const colors: any = {
    red: "rgba(255, 99, 132, 0.2)",
    green: "rgba(54, 235, 163, 0.2)",
  };

  const borderColors: any = {
    red: "rgba(255, 99, 132, 1)",
    green: "#36ebb5",
  };

  const chartData = {
    data: {
      labels: ["No", "Yes"],
      datasets: [
        {
          label: "",
          data: [no, yes],
          backgroundColor: [colors[offColor], colors[onColor]],
          borderColor: [borderColors[offColor], borderColors[onColor]],
          borderWidth: 1,
        },
      ],
    },
  };

  const coord = parsed
    .filter(
      (d) => d.lat != "0" && (d.data[value] == "on" || d.data[value] == "off")
    )
    .map((i) => {
      const icon: any = {
        red: "RedIcon",
        green: "GreenIcon",
      };
      const val = i.data[value];

      return {
        lat: i?.lat,
        lon: i?.lon,
        icon: val == "on" ? icon[onColor] : icon[offColor],
        popupText: `${val == "on" ? "Yes" : "No"} (${i?.lga})`,
      };
    });

  return { coord, chartData };
}
