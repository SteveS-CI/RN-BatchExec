import React from 'react';
import SmallPropWindow from './SmallPropWindow';

const equipmentHeaders = [
  { caption: 'Category', source: 'category' },
  { caption: 'Model', source: 'model' },
  { caption: 'Serial No', source: 'serialNumber' },
];

componentHeaders = [
  { caption: 'Line', source: 'lineNumber' },
  { caption: 'Code', source: 'materialCode' },
  { caption: 'Name', source: 'materialName' },
  { caption: 'Quantity', source: 'quantity' },
];

weighingHeaders = [
  { caption: 'Weigh ID', source: 'id' },
  { caption: 'Code', source: 'materialCode' },
  { caption: 'Name', source: 'materialName' },
  { caption: 'Quantity', source: 'netWeight' },
];

export function EquipmentProps(equipment) {
  return (<SmallPropWindow title="Equipment" headers={equipmentHeaders} data={equipment} baseBackColor="Yellow" />);
}

export function ContainerProps(equipment) {
  return (<SmallPropWindow title="Container" headers={equipmentHeaders} data={equipment} baseBackColor="Yellow" />);
}

export function ComponentProps(component) {
  return (<SmallPropWindow title="Component" headers={componentHeaders} data={component} baseBackColor="Green" />);
}

export function WeighingProps(weighing) {
  // NOTE: Ordering of expansion is important as both weighing and component have id element
  const data = { ...weighing.component, ...weighing };
  return (<SmallPropWindow title="Weighing" headers={weighingHeaders} data={data} baseBackColor="Green" />);
}
