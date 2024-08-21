function RouteBtn({ routes, handleClick }) {
  return (
    <div>
      {routes.map((route, index) => (
        <button
          key={index}
          className="routeNumber mt-1.5 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none mx-0.5"
          data-ripple-light="true"
          onClick={() => handleClick(route, index)}
        >
          {route.orig_tc} to {route.dest_tc}
        </button>
      ))}
    </div>
  );
}
export default RouteBtn;
