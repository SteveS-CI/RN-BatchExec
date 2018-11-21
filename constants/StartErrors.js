export default StartErrors = [
  "Another batch (stage) is already in progress at this location.",
  "Cannot continue batch until dependent stage(s) have completed.",
  "Required equipment not present.",
  "Equipment dirty (incompatible product).",
  "Equipment is unserviceable.",
  "Location is unavailable.",
  "Location is dirty.",
  "Location is out of order.",
  "Components have not been dispensed."
]

export function GetBatchStartErrors(value) {
  if (value==0) return "None"
  var ctr = 0
  var errors = ""
  for (ctr; ctr < 9; ctr++) {
    if ((2**ctr) & value) {
      errors = errors.concat(StartErrors[ctr], "\n")
    }
  } 
  return errors.trim()
}