// 📍 Dindigul Bus Route Configuration

export const dindigul_buses = {
  "26": {
    name: "Bus 26",

    // ✅ STEP 1 → OR LOGIC (ANY ONE STOP TRUE)
    stops: [
      { name: "Stop1", lat: 10.375628, lng: 77.994400, radius: 200 },
      { name: "Stop2", lat: 10.380505, lng: 78.002640, radius: 200 },
      { name: "Stop3", lat: 10.387577, lng: 78.012452, radius: 200 },
      { name: "Stop4", lat: 10.381355, lng: 78.004075, radius: 200 },
      { name: "Stop5", lat: 10.379401, lng: 77.999047, radius: 200 },
      { name: "Stop6", lat: 10.384194, lng: 77.975455, radius: 200 },
      { name: "Stop7", lat: 10.384783, lng: 77.964514, radius: 200 }, 
      { name: "Stop8", lat: 10.371258, lng: 77.953701, radius: 200 },
      { name: "Stop9", lat: 10.365490, lng: 77.970519, radius: 200 },
      { name: "Stop10", lat: 10.366420, lng: 77.979526, radius: 200 }
    ],

    // ✅ STEP 2 → SEQUENTIAL CHECKPOINTS
    checkpoints: [
      { name: "Zone1", lat: 10.347305, lng: 77.987733, radius: 200 },
      { name: "Zone2", lat: 10.342511, lng: 77.992242, radius: 200 },
      { name: "Zone3", lat: 10.333922, lng: 77.998602, radius: 200 },
      { name: "Zone4", lat: 10.324591, lng: 78.006109, radius: 200 },
      { name: "Zone5", lat: 10.312601, lng: 78.021866, radius: 200 },
      { name: "Zone6", lat: 10.298139, lng: 78.032313, radius: 200 },
      { name: "Zone7", lat: 10.284550, lng: 78.066634, radius: 200 },
      { name: "Zone8", lat: 10.266161, lng: 78.093340, radius: 200 },
      { name: "Zone9", lat: 10.256516, lng: 78.127773, radius: 200 },
      { name: "Zone10", lat: 10.244509, lng: 78.149713, radius: 200 }
    ]
  },

  "32": {
    name: "Bus 32",

    stops: [
      { name: "Stop101", lat: 10.528194, lng: 77.936253, radius: 200 },
      { name: "Stop102", lat: 10.517396, lng: 77.935080, radius: 200 },
      { name: "Stop103", lat: 10.490901, lng: 77.946025, radius: 200 },
      { name: "Stop104", lat: 10.470180, lng: 77.947889, radius: 200 },
      { name: "Stop105", lat: 10.455504, lng: 77.948456, radius: 200 },
      { name: "Stop106", lat: 10.443444, lng: 77.952333, radius: 200 },
      { name: "Stop107", lat: 10.435901, lng: 77.954948, radius: 200 },
      { name: "Stop108", lat: 10.434968, lng: 77.955118, radius: 200 },
      { name: "Stop109", lat: 10.438150, lng: 77.953624, radius: 200 },
      { name: "Stop110", lat: 10.431648, lng: 77.954113, radius: 200 },
      { name: "Stop111", lat: 10.411591, lng: 77.959079, radius: 200 },
      { name: "Stop112", lat: 10.404452, lng: 77.959290, radius: 200 },
      { name: "Stop113", lat: 10.387522, lng: 77.963824, radius: 200 },
      { name: "Stop114", lat: 10.381455, lng: 77.988180, radius: 200 }
    ],

    checkpoints: [
      { name: "Zonem1", lat: 10.347305, lng: 77.987733, radius: 200 },
      { name: "Zonem2", lat: 10.342511, lng: 77.992242, radius: 200 },
      { name: "Zonem3", lat: 10.333922, lng: 77.998602, radius: 200 },
      { name: "Zonem4", lat: 10.324591, lng: 78.006109, radius: 200 },
      { name: "Zonem5", lat: 10.312601, lng: 78.021866, radius: 200 },
      { name: "Zonem6", lat: 10.298139, lng: 78.032313, radius: 200 },
      { name: "Zonem7", lat: 10.284550, lng: 78.066634, radius: 200 },
      { name: "Zonem8", lat: 10.266161, lng: 78.093340, radius: 200 },
      { name: "Zonem9", lat: 10.256516, lng: 78.127773, radius: 200 },
      { name: "Zonem10", lat: 10.244509, lng: 78.149713, radius: 200 }
    ]
  }
};