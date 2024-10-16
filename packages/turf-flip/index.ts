import { coordEach } from "@turf/meta";
import { isObject, AllGeoJSON } from "@turf/helpers";
import { clone } from "@turf/clone";

/**
 * Takes input features and flips all of their coordinates from `[x, y]` to `[y, x]`.
 *
 * @function
 * @param {GeoJSON} geojson input features
 * @param {Object} [options={}] Optional parameters
 * @param {boolean} [options.mutate=false] allows GeoJSON input to be mutated (significant performance increase if true)
 * @returns {GeoJSON} a feature or set of features of the same type as `input` with flipped coordinates
 * @example
 * var serbia = turf.point([20.566406, 43.421008]);
 *
 * var saudiArabia = turf.flip(serbia);
 *
 * //addToMap
 * var addToMap = [serbia, saudiArabia];
 */
function flip<T extends AllGeoJSON>(
  geojson: T,
  options?: {
    mutate?: boolean;
  }
): T {
  // Optional parameters
  options = options || {};
  if (!isObject(options)) throw new Error("options is invalid");
  const mutate = options.mutate ?? false;

  if (!geojson) throw new Error("geojson is required");
  // ensure that we don't modify features in-place and changes to the
  // output do not change the previous feature, including changes to nested
  // properties.
  if (mutate === false || mutate === undefined) geojson = clone(geojson);

  coordEach(geojson, function (coord) {
    var x = coord[0];
    var y = coord[1];
    coord[0] = y;
    coord[1] = x;
  });
  return geojson;
}

export { flip };
export default flip;
