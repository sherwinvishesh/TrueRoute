const USFlightAnimation = () => {
  // Updated coordinates to match actual geographic positions
  const cities = [
    { name: "New York", x: 825, y: 140, code: "NYC" },
    { name: "Los Angeles", x: 50, y: 300, code: "LAX" },
    { name: "Chicago", x: 595, y: 160, code: "ORD" },
    { name: "Miami", x: 770, y: 440, code: "MIA" },
    { name: "San Francisco", x: 25, y: 225, code: "SFO" },
    { name: "Dallas", x: 450, y: 400, code: "DFW" },
    { name: "Seattle", x: 75, y: 10, code: "SEA" },
    { name: "Denver", x: 300, y: 250, code: "DEN" },
    { name: "Boston", x: 870, y: 100, code: "BOS" },
    { name: "Atlanta", x: 680, y: 320, code: "ATL" }
  ];

  const colors = ["#60A5FA", "#93C5FD", "#BFDBFE"];

  const generateRoutes = () => {
    let routes = [];
    for (let i = 0; i < cities.length; i++) {
      for (let j = i + 1; j < cities.length; j++) {
        routes.push({
          from: cities[i].code,
          to: cities[j].code,
          color: colors[Math.floor(Math.random() * colors.length)],
          duration: (3 + Math.random() * 3).toFixed(1) + "s",
          delay: (Math.random() * 2).toFixed(1) + "s"
        });
      }
    }
    return routes;
  };

  const routes = generateRoutes();
  const getCity = (code) => cities.find((city) => city.code === code);

  return (
    <div className="relative w-full h-[500px] bg-[#1a2e44] rounded-lg shadow-xl border border-gray-700">
      {/* Background Map Container */}
      <div className="absolute inset-0 bg-[#1a2e44]">
        <img 
          src="/us-map.png" 
          alt="US Map"
          className="w-full h-full object-contain opacity-30"
        />
      </div>

      {/* SVG Overlay */}
      <svg 
        viewBox="0 0 900 500" 
        className="absolute inset-0 w-full h-full"
        style={{ padding: '20px' }}
      >
        {/* Flight Routes */}
        {routes.map((route, index) => {
          const from = getCity(route.from);
          const to = getCity(route.to);
          const midX = (from.x + to.x) / 2;
          const midY = Math.min(from.y, to.y) - 40;
          const path = `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;

          return (
            <g key={index}>
              <path
                d={path}
                fill="none"
                stroke={route.color}
                strokeWidth="1.5"
                strokeDasharray="6"
                className="opacity-60"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="1000"
                  to="0"
                  dur={route.duration}
                  begin={route.delay}
                  repeatCount="indefinite"
                />
              </path>
              <circle r="2" fill={route.color} className="animate-pulse">
                <animateMotion
                  path={path}
                  dur={route.duration}
                  begin={route.delay}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}

        {/* Cities */}
        {cities.map((city, index) => (
          <g key={index}>
            <circle
              cx={city.x}
              cy={city.y}
              r="3"
              fill="#F59E0B"
              className="animate-pulse"
            />
            <text
              x={city.x + 8}
              y={city.y + 4}
              fill="#D1D5DB"
              fontSize="11"
              className="text-xs"
            >
              {city.code}
            </text>
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-gray-900 bg-opacity-80 p-2 rounded text-xs text-gray-300">
        <div className="flex items-center mb-1">
          <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full mr-2 animate-pulse" />
          Major Airports
        </div>
        <div className="flex items-center">
          <div className="w-2.5 h-0.5 bg-blue-400 mr-2" />
          Active Routes
        </div>
      </div>
    </div>
  );
};

export default USFlightAnimation;