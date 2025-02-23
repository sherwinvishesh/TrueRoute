# Airport coordinates database (add more airports as needed)
AIRPORT_COORDINATES = {
    "ATL": (33.640411, -84.419853),  # Hartsfield-Jackson Atlanta International Airport
    "LAX": (33.942791, -118.410042),  # Los Angeles International Airport
    "ORD": (41.978611, -87.904724),  # O'Hare International Airport, Chicago
    "DFW": (32.897480, -97.040443),  # Dallas/Fort Worth International Airport
    "DEN": (39.849312, -104.673828),  # Denver International Airport
    "JFK": (40.641766, -73.780968),  # John F. Kennedy International Airport, New York
    "SFO": (37.615223, -122.389977),  # San Francisco International Airport
    "SEA": (47.443546, -122.301659),  # Seattle-Tacoma International Airport
    "LAS": (36.086010, -115.153969),  # Harry Reid International Airport, Las Vegas
    "MCO": (28.424618, -81.310753),  # Orlando International Airport
    "EWR": (40.689491, -74.174538),  # Newark Liberty International Airport
    "CLT": (35.213890, -80.943054),  # Charlotte Douglas International Airport
    "PHX": (33.435249, -112.010216),  # Phoenix Sky Harbor International Airport
    "IAH": (29.993067, -95.341812),  # George Bush Intercontinental Airport, Houston
    "MIA": (25.795160, -80.279594),  # Miami International Airport
    "BOS": (42.366978, -71.022362),  # Boston Logan International Airport
    "MSP": (44.881972, -93.221767),  # Minneapolis-Saint Paul International Airport
    "FLL": (26.074215, -80.150726),  # Fort Lauderdale-Hollywood International Airport
    "DTW": (42.213249, -83.352859),  # Detroit Metropolitan Wayne County Airport
    "PHL": (39.872940, -75.243988),  # Philadelphia International Airport
    "LGA": (40.776863, -73.874069),  # LaGuardia Airport, New York
    "BWI": (39.177540, -76.668526),  # Baltimore/Washington International Thurgood Marshall Airport
    "SLC": (40.788389, -111.977772),  # Salt Lake City International Airport
    "IAD": (38.944533, -77.455811),  # Washington Dulles International Airport
    "DCA": (38.852153, -77.037697),  # Ronald Reagan Washington National Airport
    "MDW": (41.785972, -87.752417),  # Chicago Midway International Airport
    "SAN": (32.731770, -117.197624),  # San Diego International Airport
    "HNL": (21.318681, -157.922428),  # Daniel K. Inouye International Airport, Honolulu
    "TPA": (27.975472, -82.533249),  # Tampa International Airport
    "PDX": (45.588997, -122.592601),  # Portland International Airport
    "BNA": (36.131687, -86.668823),  # Nashville International Airport
    "AUS": (30.197535, -97.662015),  # Austin-Bergstrom International Airport
    "STL": (38.748697, -90.370028),  # St. Louis Lambert International Airport
    "HOU": (29.645419, -95.278889),  # William P. Hobby Airport, Houston
    "OAK": (37.721298, -122.220757),  # Oakland International Airport
    "MCI": (39.297606, -94.713905),  # Kansas City International Airport
    "RDU": (35.877639, -78.787472),  # Raleigh-Durham International Airport
    "SNA": (33.678925, -117.862869),  # John Wayne Airport, Orange County
    "CLE": (41.411667, -81.849722),  # Cleveland Hopkins International Airport
    "SMF": (38.695417, -121.590778),  # Sacramento International Airport
    "PIT": (40.491467, -80.232872),  # Pittsburgh International Airport
    "SAT": (29.533694, -98.469778),  # San Antonio International Airport
    "RSW": (26.536167, -81.755167),  # Southwest Florida International Airport
    "IND": (39.717331, -86.294383),  # Indianapolis International Airport
    "CVG": (39.053276, -84.663017),  # Cincinnati/Northern Kentucky International Airport
    "DAL": (32.847111, -96.851778),  # Dallas Love Field
    "BDL": (41.938889, -72.683222),  # Bradley International Airport, Hartford
    "JAX": (30.494056, -81.687306),  # Jacksonville International Airport
    "MSY": (29.993389, -90.258028),  # Louis Armstrong New Orleans International Airport
    "MKE": (42.947222, -87.896583),  # Milwaukee Mitchell International Airport
    "PBI": (26.683161, -80.095589),  # Palm Beach International Airport
    "BUF": (42.940525, -78.732167),  # Buffalo Niagara International Airport
    "OMA": (41.303167, -95.894069),  # Eppley Airfield, Omaha
    "ANC": (61.174361, -149.996361),  # Ted Stevens Anchorage International Airport
    "RNO": (39.499108, -119.768108),  # Reno-Tahoe International Airport
    "SJC": (37.363949, -121.928940),  # Mineta San José International Airport
    "ABQ": (35.040222, -106.609194),  # Albuquerque International Sunport
    "ONT": (34.056111, -117.601111),  # Ontario International Airport
    "PVD": (41.732581, -71.420389),  # T. F. Green Airport, Providence
    "BHM": (33.562942, -86.753472),  # Birmingham-Shuttlesworth International Airport
    "ROC": (43.118866, -77.672389),  # Frederick Douglass/Greater Rochester International Airport
    "OKC": (35.393089, -97.600733),  # Will Rogers World Airport, Oklahoma City
    "TUS": (32.116112, -110.941109),  # Tucson International Airport
    "SDF": (38.174444, -85.736000),  # Louisville Muhammad Ali International Airport
    "MEM": (35.042417, -89.976667),  # Memphis International Airport
    "RIC": (37.505167, -77.319667),  # Richmond International Airport
    "BOI": (43.564361, -116.222861),  # Boise Airport
    "CHS": (32.898647, -80.040528),  # Charleston International Airport
    "ORF": (36.894611, -76.201222),  # Norfolk International Airport
    "TUL": (36.198389, -95.888111),  # Tulsa International Airport
    "GEG": (47.619861, -117.533833),  # Spokane International Airport
    "ELP": (31.807333, -106.377583),  # El Paso International Airport
    "ALB": (42.748267, -73.801692),  # Albany International Airport
    "SYR": (43.111187, -76.106311),  # Syracuse Hancock International Airport
    "GSP": (34.895556, -82.218889),  # Greenville-Spartanburg International Airport
    "LIT": (34.729444, -92.224306),  # Bill and Hillary Clinton National Airport, Little Rock
    "PSP": (33.829667, -116.506694),  # Palm Springs International Airport
    "SAV": (32.127583, -81.202139),  # Savannah/Hilton Head International Airport
    "PNS": (30.473425, -87.186611),  # Pensacola International Airport
    "MSN": (43.139858, -89.337514),  # Dane County Regional Airport, Madison
    "DSM": (41.533972, -93.663083),  # Des Moines International Airport
    "BZN": (45.777643, -111.160151),  # Bozeman Yellowstone International Airport
    "JAN": (32.311167, -90.075889),  # Jackson-Medgar Wiley Evers International Airport
    "XNA": (36.281944, -94.306389),  # Northwest Arkansas National Airport
    "HSV": (34.640444, -86.775833),  # Huntsville International Airport
    "ICT": (37.649944, -97.433056),  # Wichita Dwight D. Eisenhower National Airport
    "SRQ": (27.395444, -82.554389),  # Sarasota-Bradenton International Airport
    "PWM": (43.646161, -70.309281),  # Portland International Jetport
    "MHT": (42.932556, -71.435667),  # Manchester-Boston Regional Airport
    "CAE": (33.938833, -81.119528),  # Columbia Metropolitan Airport
    "DAY": (39.902375, -84.219375),  # Dayton International Airport
    "FAT": (36.776194, -119.718306),  # Fresno Yosemite International Airport
    "GRR": (42.880833, -85.522806),  # Gerald R. Ford International Airport, Grand Rapids
    "BTV": (44.471861, -73.153278),  # Burlington International Airport
    "ITO": (19.721375, -155.048469),  # Hilo International Airport
    "COS": (38.805805, -104.700778),  # Colorado Springs Airport
    "LEX": (38.036389, -84.605833),  # Blue Grass Airport, Lexington
    "TYS": (35.805813, -83.989815),  # McGhee Tyson Airport, Knoxville
    "LGB": (33.817722, -118.151611),  # Long Beach Airport
    "ISP": (40.795194, -73.100222),  # Long Island MacArthur Airport
    "CID": (41.884694, -91.710806),  # The Eastern Iowa Airport, Cedar Rapids
}

MONGODB_URI = "mongodb+srv://rkhatta1:hacklytics%401@trueroute.tuuhm.mongodb.net/"
DATABASE_NAME = "trueroute_primary"
COLLECTION_NAME = "flights_raw"

OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast"