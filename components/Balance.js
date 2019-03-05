import React, { Component } from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { GestureHandler } from 'expo';
import i18n from 'i18n-js';
// import { State } from 'react-native-gesture-handler';
import { scale, verticalScale, FontSizes } from '../constants/Layout';
import NexaColours from '../constants/NexaColours';
import ModalMessage from './ModalMessage';

const { PanGestureHandler, TapGestureHandler, State } = GestureHandler;

const styles = StyleSheet.create({
  balanceInfo: {
    color: NexaColours.Blue,
    marginTop: verticalScale(4),
    marginHorizontal: scale(8),
    fontSize: FontSizes.standard,
  },
  balanceOuter: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    backgroundColor: NexaColours.GreyUltraLight,
    marginHorizontal: scale(8),
    marginVertical: verticalScale(4),
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    borderColor: NexaColours.GreyDarkest,
    borderRadius: scale(12),
    borderWidth: scale(3),
    minWidth: '50%',
  },
  balanceReading: {
    color: NexaColours.GreyDarkest,
    fontSize: FontSizes.balance,
    fontFamily: 'euro-demi',
  },
  uom: {
    marginLeft: scale(8),
    marginTop: scale(4),
    fontSize: FontSizes.standard,
    fontFamily: 'euro-demi',
  },
  limitInfo: {
    borderColor: NexaColours.GreyDarkest,
    borderRadius: scale(8),
    borderWidth: scale(1),
    flexDirection: 'column',
    padding: scale(4),
    marginRight: scale(8),
  },
  limitText: {
    fontSize: FontSizes.smallest,
  },
  barContainer: {
    flexDirection: 'column',
    marginTop: verticalScale(4),
    marginHorizontal: scale(8),
    backgroundColor: NexaColours.GreyUltraLight,
    height: verticalScale(32),
    borderWidth: StyleSheet.hairlineWidth,
  },
  bar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: verticalScale(32),
  },
  limit: {
    position: 'absolute',
    top: verticalScale(8),
    height: verticalScale(16),
    backgroundColor: NexaColours.Black,
    width: scale(1),
  },
  target: {
    position: 'absolute',
    top: 0,
    height: verticalScale(32),
    backgroundColor: NexaColours.Black,
    width: scale(1),
  },
  indicator: {
    alignSelf: 'center',
    borderRadius: scale(8),
    borderColor: NexaColours.Black,
    borderWidth: scale(1),
    padding: scale(4),
    marginLeft: scale(4),
  },
});

export default class Balance extends Component {
  static defaultProps = {
    balanceSource: null,
    decimalPlaces: 3,
    scaleFactor: 1,
    zeroOffset: 0,
    tareOffset: 0,
    showBalReading: false,
    target: 0,
    lowerLimit: 0,
    upperLimit: 0,
  };

  static propTypes = {
    balanceName: PropTypes.string.isRequired,
    balanceSource: PropTypes.string,
    balanceMax: PropTypes.number.isRequired, // maximum scale capacity
    balanceMode: PropTypes.oneOf([0, 1, 2]).isRequired,
    target: PropTypes.number, // measurement target
    lowerLimit: PropTypes.number, // measurement lower limit
    upperLimit: PropTypes.number, // measurement upper limit
    decimalPlaces: PropTypes.number, // decimal places to display
    balanceUOM: PropTypes.string.isRequired, // balance units of measure (zero/tare)
    displayUOM: PropTypes.string.isRequired, // display units of measure
    scaleFactor: PropTypes.number, // conversion factor (e.g. Kg -> L)
    zeroOffset: PropTypes.number,
    tareOffset: PropTypes.number,
    showBalReading: PropTypes.bool, // show the actual balance reading (for development only)
  };

  constructor(props) {
    super(props);
    this.state = {
      scaleValue: 0,
      rawScale: 0,
      physBarPos: 0,
      stable: true,
      readToggle: false,
      error: null,
    };
    this.active = false; // when false DO NOT make changes to state
  }

  componentDidMount() {
    const { balanceSource } = this.props;
    this.locale = i18n.currentLocale();
    this.formats = i18n.translations[this.locale].formats;
    this.interactive = balanceSource == null;
    this.reCalc();
    this.makeFormatFunc();
    this.connectSocket();
  }

  // This method is only used when dynamically changing the balance mode
  // currently only used on development screens
  componentDidUpdate(prevProps) {
    const {
      balanceSource,
      target,
      lowerLimit,
      upperLimit,
      balanceUOM,
      displayUOM,
      scaleFactor,
      decimalPlaces
    } = this.props;
    const { scaleValue } = this.state;
    if (prevProps.balanceSource !== balanceSource) {
      this.interactive = balanceSource === null;
      if (this.interactive) {
        this.disconnectSocket();
      } else {
        this.connectSocket();
      }
      this.reCalc();
      this.makeFormatFunc();
      this.setState({ physBarPos: this.scaleToPhys(scaleValue) });
    }
    // compare props
    if (
      prevProps.lowerLimit !== lowerLimit
      || prevProps.target !== target
      || prevProps.upperLimit !== upperLimit
      || prevProps.balanceUOM !== balanceUOM
      || prevProps.displayUOM !== displayUOM
      || prevProps.scaleFactor !== scaleFactor
      || prevProps.decimalPlaces !== decimalPlaces
    ) {
      this.reCalc();
      this.makeFormatFunc();
      this.setState({ physBarPos: this.scaleToPhys(scaleValue) });
    }
  }

  componentWillUnmount() {
    this.disconnectSocket();
  }

  getReading() {
    if (!this.active) {
      return { balanceValue: 0, readingValid: false };
    }
    const { stable } = this.state;
    const passed = this.inSpec();
    const { scaleValue } = this.state;
    const balanceValue = this.format(scaleValue);
    if (!passed) {
      this.setState({ error: 'Balance reading is out of range' });
    } else if (!stable) {
      this.setState({ error: 'Balance is unstable' });
    }
    const readingValid = stable && passed;
    return { balanceValue, readingValid };
  }

  socketReceive = (e) => {
    if (!this.active) return; // Ignore if no longer active
    const {
      balanceMode,
      zeroOffset,
      tareOffset,
      scaleFactor
    } = this.props;
    this.createTimeOut();
    const value = Number.parseFloat(e.data);
    let adjusted = value;
    if (balanceMode === 1) {
      // Tare mode: only adjust with zeroOffset
      adjusted = value - zeroOffset;
    }
    if (balanceMode === 2) {
      // Measure mode: adjust zeroOffset, tareOffset and scaleFactor
      adjusted = (value - zeroOffset - tareOffset) * scaleFactor;
    }
    const barVal = this.scaleToPhys(adjusted);
    const { readToggle } = this.state;
    this.setState({
      physBarPos: barVal,
      rawScale: value,
      scaleValue: adjusted,
      readToggle: !readToggle,
    });
  };

  timedOut = () => {
    this.removeTimeOut();
    if (!this.active) return;
    this.setState({ error: 'No response from balance' });
  };

  resume = () => {
    this.setState({ error: null });
    this.connectSocket();
  };

  onTapped = (e) => {
    const { state } = e.nativeEvent;
    if (state === State.END) {
      const adjustVal = e.nativeEvent.x < 50 ? 0 : this.target;
      const barVal = this.scaleToPhys(adjustVal);
      const { raw } = this.physToScale(barVal);
      this.setState({
        physBarPos: barVal,
        rawScale: raw,
        scaleValue: adjustVal,
      });
    }
  };

  onPan = (e) => {
    const { x } = e.nativeEvent;
    const { raw, scaled } = this.physToScale(x);
    this.setState({ physBarPos: x, rawScale: raw, scaleValue: scaled });
  };

  onLayout = (e) => {
    // physWidth = width of bar in device units
    this.physWidth = e.nativeEvent.layout.width;
    this.reCalc();
  };

  makeFormatFunc() {
    // Shortened format function
    const { decimalPlaces } = this.props;
    const options = {
      separator: this.formats.decimal,
      delimiter: this.formats.thousands,
      precision: decimalPlaces,
    };
    this.formatNumber = value => i18n.toNumber(value, options);
  }

  createTimeOut() {
    this.removeTimeOut();
    this.timeOut = setTimeout(this.timedOut, 5000);
  }

  removeTimeOut() {
    if (this.timeOut !== null) {
      clearTimeout(this.timeOut);
      this.timeOut = null;
    }
  }

  connectSocket() {
    // Web socket
    if (!this.interactive) {
      const { balanceSource } = this.props;
      this.socket = new WebSocket(`ws://${balanceSource}`);
      this.socket.addEventListener('message', e => this.socketReceive(e));
      this.socket.addEventListener('error', e => this.socketError(e));

      this.createTimeOut();
    }
    this.active = true;
  }

  disconnectSocket() {
    this.active = false;
    this.removeTimeOut();
    if (this.socket) {
      this.socket.close(1000);
      this.socket = null;
    }
  }

  // returns a number (0-7) for each limit combination lower/target/upper
  limitsToNumber() {
    const { target, lowerLimit, upperLimit } = this.props;
    const L = lowerLimit != null ? 1 : 0;
    const T = target != null ? 2 : 0;
    const U = upperLimit != null ? 4 : 0;
    return L + T + U;
  }

  reCalc() {
    const {
      target,
      upperLimit,
      lowerLimit,
      scaleFactor,
      balanceMax
    } = this.props;

    this.forceCoarseScale = false;
    this.lowerPos = null;
    this.upperPos = null;
    this.targetPos = null;

    // split bar into 2 portions
    this.physThreshold = this.physWidth * 0.5;

    // Calculate scaleThreshold, coarseScale, fineScale,
    // depending on what limits were supplied
    // and the balanceMode value
    const comb = this.limitsToNumber();
    switch (comb) {
      case 0: // no limits set
        this.forceCoarseScale = true;
        this.coarseScale = this.physWidth / balanceMax;
        this.lower = -Number.MAX_VALUE;
        this.upper = Number.MAX_VALUE;
        this.target = target;
        break;
      case 2: // only target set
        this.forceCoarseScale = true;
        this.coarseScale = this.physWidth / (target * 1.3333);
        this.lower = -Number.MAX_VALUE;
        this.upper = Number.MAX_VALUE;
        this.target = target;
        break;
      case 1: // only lower
      case 4: // only upper
        this.forceCoarseScale = true;
        if (lowerLimit) {
          this.coarseScale = this.physWidth / (lowerLimit * 2);
          this.lower = lowerLimit;
          this.upper = Number.MAX_VALUE;
        } else {
          // upper
          this.coarseScale = this.physWidth / (upperLimit * 2);
          this.upper = upperLimit;
          this.lower = -Number.MAX_VALUE;
        }
        this.target = null;
        break;
      case 5: // upper and lower (no target)
      case 7: // ALL, upper, lower and target
      {
        const limitDiff = (upperLimit - lowerLimit) / scaleFactor;
        // scaleThreshold = scaled point at which resolution changes
        // i.e. values below will appear in the lower portion of the display bar
        // and values above this value will appear in the upper portion
        this.scaleThreshold = lowerLimit / scaleFactor - limitDiff / 2;

        // coarseScale = physical units per scale unit (lower graph portion)
        // fineScale = physical units per scale unit (upper graph portion)
        this.coarseScale = this.physThreshold / this.scaleThreshold;
        this.fineScale = (this.physWidth - this.physThreshold) / (limitDiff * 2);
        if (this.coarseScale > this.fineScale) {
          this.coarseScale = this.physWidth / (upperLimit / scaleFactor + limitDiff / 2);
          this.forceCoarseScale = true;
        }

        this.lower = lowerLimit;
        this.upper = upperLimit;
        this.target = target || null;

        break;
      }
      case 3: // lower and target
      {
        const tlDiff = target - lowerLimit;
        this.scaleThreshold = lowerLimit - tlDiff;
        this.coarseScale = this.physThreshold / this.scaleThreshold;
        this.fineScale = (this.physWidth - this.physThreshold) / (tlDiff * 4);
        if (this.coarseScale > this.fineScale) {
          this.coarseScale = this.physWidth / (tlDiff * 4);
          this.forceCoarseScale = true;
        }
        this.target = target;
        this.lower = lowerLimit;
        this.upper = Number.MAX_VALUE;
        break;
      }
      case 6: // upper and target
      {
        const utDiff = upperLimit - target;
        this.scaleThreshold = target - utDiff * 2;
        this.coarseScale = this.physThreshold / this.scaleThreshold;
        this.fineScale = (this.physWidth - this.physThreshold) / (utDiff * 4);
        if (this.coarseScale > this.fineScale) {
          this.coarseScale = this.physWidth / (utDiff * 4);
          this.forceCoarseScale = true;
        }
        this.target = target;
        this.upper = upperLimit;
        this.lower = -Number.MAX_VALUE;
        break;
      }
      default:
    }

    // physical position of lower limit
    this.lowerPos = lowerLimit != null ? this.scaleToPhys(lowerLimit) - 1 : null;
    // physical position of upper limit
    this.upperPos = upperLimit != null ? this.scaleToPhys(upperLimit) - 1 : null;
    // physical position of target
    this.targetPos = target != null ? this.scaleToPhys(target) - 1 : null;
  }

  // converts a (balance) value to a physical position
  scaleToPhys(value) {
    const { scaleFactor } = this.props;
    const scaled = value / scaleFactor;
    if (scaled < this.scaleThreshold || this.forceCoarseScale) {
      const phys = scaled * this.coarseScale;
      return phys;
    }
    const phys = (scaled - this.scaleThreshold) * this.fineScale + this.physThreshold;
    return phys;
  }

  // converts a physical position into a scale value (raw and scaled)
  physToScale(phys) {
    const { zeroOffset, tareOffset, scaleFactor } = this.props;
    const offset = phys;
    if (offset < this.physThreshold || this.forceCoarseScale) {
      const scaleValue = offset / this.coarseScale;
      const rawValue = scaleValue + zeroOffset + tareOffset;
      return { raw: rawValue, scaled: scaleValue * scaleFactor };
    }
    const scaleValue = (offset - this.physThreshold) / this.fineScale + this.scaleThreshold;
    const rawValue = scaleValue + zeroOffset + tareOffset;
    return { raw: rawValue, scaled: scaleValue * scaleFactor };
  }

  inSpec() {
    const { error, scaleValue } = this.state;
    if (error) {
      return false;
    }
    return (
      scaleValue >= this.lower && scaleValue <= this.upper
    );
  }

  format(value) {
    return this.formatNumber ? this.formatNumber(value) : '0';
  }

  render() {
    const {
      error,
      scaleValue,
      physBarPos,
      readToggle,
      rawScale
    } = this.state;
    const {
      balanceName,
      balanceMax,
      balanceMode,
      balanceUOM,
      displayUOM,
      target,
      lowerLimit,
      upperLimit,
      showBalReading
    } = this.props;
    const displayValue = this.format(scaleValue);
    const inSpec = this.inSpec();
    const barColor = inSpec ? NexaColours.Green : NexaColours.Red;

    const barWidth = physBarPos;
    const barStyle = StyleSheet.flatten([
      styles.bar,
      { width: barWidth, backgroundColor: barColor },
    ]);

    const balStyle = StyleSheet.flatten([
      styles.balanceOuter,
      { borderColor: barColor },
    ]);

    const lowerStyle = StyleSheet.flatten([
      styles.limit,
      { left: this.lowerPos },
    ]);
    const upperStyle = StyleSheet.flatten([
      styles.limit,
      { left: this.upperPos },
    ]);
    const targetStyle = StyleSheet.flatten([
      styles.target,
      { left: this.targetPos },
    ]);

    const indColor = readToggle ? NexaColours.Yellow : NexaColours.White;
    const indicatorStyle = StyleSheet.flatten([styles.indicator, { backgroundColor: indColor }]);

    const UOM = balanceMode === 2 ? displayUOM : balanceUOM;

    const messageText = error ? { title: 'Balance Error', message: error }
      : null;

    return (
      <View style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row' }}>
          {balanceName && (
            <Text style={styles.balanceInfo}>{balanceName}</Text>
          )}
          <Text style={styles.balanceInfo}>
            {balanceMax}
            {' '}
            {balanceUOM}
          </Text>
          <Text style={styles.balanceInfo}>
            {['Zero', 'Tare', 'Measure'][balanceMode]}
            {' '}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <TapGestureHandler
            onHandlerStateChange={this.onTapped}
            numberOfTaps={2}
            minPointers={1}
            enabled={this.interactive}
          >
            <View style={balStyle}>
              <Text style={styles.balanceReading}>{displayValue}</Text>
              <View style={{ flexDirection: 'column' }}>
                <View style={indicatorStyle} />
                <Text style={styles.uom}>{UOM}</Text>
              </View>
            </View>
          </TapGestureHandler>

          <View style={styles.limitInfo}>
            {upperLimit != null && (
              // eslint-disable-next-line react/jsx-one-expression-per-line
              <Text style={styles.limitText}>
                Upper:
                {' '}
                {this.format(upperLimit)}
              </Text>
            )}
            {target != null && (
              // eslint-disable-next-line react/jsx-one-expression-per-line
              <Text style={styles.limitText}>
                Target:
                {' '}
                {this.format(target)}
              </Text>
            )}
            {lowerLimit != null && (
              // eslint-disable-next-line react/jsx-one-expression-per-line
              <Text style={styles.limitText}>
                Lower:
                {' '}
                {this.format(lowerLimit)}
              </Text>
            )}
          </View>
        </View>

        <PanGestureHandler
          onGestureEvent={this.onPan}
          activeOffsetX={[0, 0]}
          enabled={this.interactive}
        >
          <View onLayout={this.onLayout} style={styles.barContainer}>
            <View style={barStyle} />
            {this.lowerPos && <View style={lowerStyle} />}
            {this.upperPos && <View style={upperStyle} />}
            {this.targetPos && <View style={targetStyle} />}
            {showBalReading && (
              <Text style={{ margin: scale(4), fontSize: FontSizes.standard }}>
                {this.format(rawScale)}
                {' '}
                {balanceUOM}
              </Text>
            )}
          </View>
        </PanGestureHandler>
        <ModalMessage messageText={messageText} onExit={this.resume} />
      </View>
    );
  }
}
