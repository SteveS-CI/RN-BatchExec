export default StartErrors = {
  None: "No Errors",
  BatchInProgress: "Another batch (stage) is already in progress at this location.",
  DependNotSatisfied: "Cannot continue batch until dependent stage(s) have completed.",
  EquipmentNotPresent: "Required equipment not present.",
  EquipmentDirty: "Equipment dirty (incompatible product).",
  EquipmentUnserviceable:   "Equipment is unserviceable.",
  LocationUnavailable: "Location is unavailable.",
  LocationDirty: "Location is dirty.",
  LocationNonFunctional: "Location is out of order.",
  ComponentsNotDispensed: "Components have not been dispensed."
}

export function GetBatchStartErrors(value) {
  return "Batch start errors"
}