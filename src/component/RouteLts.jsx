function RouteLts({ routes, stops, handleClick }) {
  const stop_name = [];
  for (let route of routes) {
    for (let stopMatching of stops.data) {
      if (route.stop == stopMatching["stop"]) {
        stop_name.push({
          name_tc: stopMatching["name_tc"],
          stopMatching,
          route,
        });
      }
    }
  }
  return (
    <div>
      {stop_name.map((item, index) => (
        <div key={index}>
          <button
            className="mt-2 w-100 px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
            onClick={() => handleClick(item.stopMatching, item.route)}
          >
            {" "}
            stop {index + 1} : {item.name_tc}
          </button>
        </div>
      ))}
    </div>
  );
}

export default RouteLts;
