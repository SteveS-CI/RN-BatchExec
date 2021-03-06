import PropTypes from 'prop-types';

export const HeaderProps = PropTypes.shape({
  caption: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired
});

export const IngredientProps = PropTypes.shape({
  id: PropTypes.number,
  lineNumber: PropTypes.number.isRequired,
  materialCode: PropTypes.string.isRequired,
  materialName: PropTypes.string.isRequired,
  componentType: PropTypes.string,
  quantity: PropTypes.string.isRequired,
  status: PropTypes.string
});

export const WeighingProps = PropTypes.shape({
  id: PropTypes.number,
  weighingNumber: PropTypes.number.isRequired,
  weighingType: PropTypes.string,
  netWeight: PropTypes.string.isRequired,
  dispensedDate: PropTypes.string,
  used: PropTypes.bool,
  scanned: PropTypes.bool.isRequired,
  component: IngredientProps.isRequired
});

export const WeighProps = PropTypes.shape({
  id: PropTypes.number,
  weighingNumber: PropTypes.number.isRequired,
  weighingType: PropTypes.string,
  netWeight: PropTypes.string.isRequired,
  dispensedDate: PropTypes.string,
  scanned: PropTypes.bool.isRequired
});

export const ComponentProps = PropTypes.shape({
  id: PropTypes.number,
  lineNumber: PropTypes.number.isRequired,
  materialCode: PropTypes.string.isRequired,
  materialName: PropTypes.string.isRequired,
  componentType: PropTypes.string,
  quantity: PropTypes.string.isRequired,
  status: PropTypes.string,
  weighings: PropTypes.arrayOf(WeighProps)
});

export const EquipmentProps = PropTypes.shape({
  category: PropTypes.string.isRequired,
  model: PropTypes.string,
  serial: PropTypes.string
});

export const DeviationProps = PropTypes.shape({
  comment: PropTypes.string,
  severity: PropTypes.oneOf(['None', 'Minor', 'Major', 'Critical']),
  reference: PropTypes.string
});

export const ListHeaderProps = PropTypes.shape({
  caption: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  flex: PropTypes.number,
  align: PropTypes.oneOf(['left', 'center', 'right'])
});

export const PostDataProps = PropTypes.shape({
  batchID: PropTypes.Integer,
  procID: PropTypes.Integer,
  location: PropTypes.String,
  input: PropTypes.String,
  deviation: DeviationProps
});

export const ValidationProps = PropTypes.shape({
  upper: PropTypes.String,
  lower: PropTypes.String,
  increment: PropTypes.String,
  minLength: PropTypes.String,
  maxLength: PropTypes.String,
  choices: PropTypes.String,
  regExp: PropTypes.String
});

export const EntryProps = PropTypes.shape({
  name: PropTypes.String,
  index: PropTypes.Integer,
  label: PropTypes.String,
  suffix: PropTypes.String,
  entryType: PropTypes.String,
  entryTypeEnum: PropTypes.Integer,
  validation: ValidationProps,
  value: PropTypes.String
});
