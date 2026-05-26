// utils/distance.js

/**
 * Calculate distance between two coordinates in meters (Haversine formula)
 */
export function getDistance(lat1, lon1, lat2, lon2) {
  // ❌ Handle invalid inputs
  if (
    lat1 == null || lon1 == null ||
    lat2 == null || lon2 == null
  ) {
    console.warn("⚠️ Invalid coordinates:", { lat1, lon1, lat2, lon2 });
    return Infinity;
  }

  const R = 6371e3; // Earth radius in meters

  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) *
      Math.cos(φ2) *
      Math.sin(Δλ / 2) *
      Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  return distance; // in meters
}

/**
 * Convert degrees → radians
 */
function toRad(value) {
  return (value * Math.PI) / 180;
}