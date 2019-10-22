import React from 'react';
import Svg, { Path, G, TSpan, Text } from 'react-native-svg';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import axios from 'axios';
import {
    StyleSheet,
    View,
    Text as RNText,
    Dimensions,
    Animated,
    AsyncStorage,
    Alert,
} from 'react-native';
import * as d3Shape from 'd3-shape';
import color from 'randomcolor';
import { snap } from '@popmotion/popcorn';
import Axios from 'axios';
const { width } = Dimensions.get('screen');
const numberOfSegments = 6;
const wheelSize = width * 0.95;
const fontSize = 26;
const oneTurn = 360;
const angleBySegment = oneTurn / numberOfSegments;
const angleOffset = angleBySegment / 2;
const knobFill = color({ hue: 'purple' });


const makeWheel = () => {
    const data = Array.from({ length: numberOfSegments }).fill(1);
    const arcs = d3Shape.pie()(data);
    const Prices = ['5', 'ZONK', '10', 'ZONK', '20', 'ZONK'];
    const colors = ['#ffae0d', '#68c900', '#ffae0d', '#68c900', '#ff4747', '#68c900'];

    return arcs.map((arc, index) => {
        const instance = d3Shape
            .arc()
            .padAngle(0.01)
            .outerRadius(width / 2)
            .innerRadius(20);

        return {
            path: instance(arc),
            color: colors[index],
            value: Prices[index],
            fontWeight: 'bold',
            centroid: instance.centroid(arc)
        };
    });
};

export default class App extends React.Component {
    _wheelPaths = makeWheel();
    _angle = new Animated.Value(0);
    angle = 0;

    state = {
        enabled: true,
        finished: false,
        winner: null,
        token: ''
    };

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                // We have data!!
                this.state.token = value;
            }
        } catch (error) {
            console.log(error);
            // Error retrieving data
        }
    };

    _updateScore() {
        const token = this.state.token;
        const point = this.state.winner;
        console.log(token);
        console.log(point);
        axios({
            url: 'http://localhost:3000/users/point',
            method: 'patch',
            headers: {
                token
            },
            data: {
                point
            }
        })
            .then(({ data }) => {
                console.log(data);
                Alert.alert(`Congratulation you got ${this.state.winner} points`, "", [{ text: 'Ok', onPress: this._handleAlertPress }]);
            })
            .catch(console.log);
    }

    _handleAlertPress = () => {
        this.props.navigation.navigate('HomeScreen');
    }

    componentDidMount() {
        this._retrieveData();
        this._angle.addListener(event => {
            if (this.state.enabled) {
                this.setState({
                    enabled: false,
                    finished: false
                });
            }

            this.angle = event.value;
        });
    }

    _getWinnerIndex = () => {
        const deg = Math.abs(Math.round(this.angle % oneTurn));
        // wheel turning counterclockwise
        if (this.angle < 0) {
            return Math.floor(deg / angleBySegment);
        }
        // wheel turning clockwise
        return (numberOfSegments - Math.floor(deg / angleBySegment)) % numberOfSegments;
    };

    _onPan = ({ nativeEvent }) => {
        if (nativeEvent.state === State.END) {
            const { velocityY } = nativeEvent;

            Animated.decay(this._angle, {
                velocity: velocityY / 1000,
                deceleration: 0.999,
                useNativeDriver: true
            }).start(() => {
                this._angle.setValue(this.angle % oneTurn);
                const snapTo = snap(oneTurn / numberOfSegments);
                Animated.timing(this._angle, {
                    toValue: snapTo(this.angle),
                    duration: 300,
                    useNativeDriver: true
                }).start(() => {
                    const winnerIndex = this._getWinnerIndex();
                    this.setState({
                        enabled: true,
                        finished: true,
                        winner: this._wheelPaths[winnerIndex].value
                    });
                });
                // do something here;
            });
        }
    };
    render() {
        return (
            <PanGestureHandler
                onHandlerStateChange={this._onPan}
                enabled={this.state.enabled}
            >
                <View style={styles.container}>
                    {this._renderSvgWheel()}
                    {this.state.finished && this.state.enabled && this._renderWinner()}
                </View>
            </PanGestureHandler>
        );
    }

    _renderKnob = () => {
        const knobSize = 30;
        [0, numberOfSegments]
        const YOLO = Animated.modulo(
            Animated.divide(
                Animated.modulo(Animated.subtract(this._angle, angleOffset), oneTurn),
                new Animated.Value(angleBySegment)
            ),
            1
        );
        return (
            <Animated.View
                style={{
                    width: knobSize,
                    height: knobSize * 2,
                    justifyContent: 'flex-end',
                    zIndex: 1,
                    transform: [
                        {
                            rotate: YOLO.interpolate({
                                inputRange: [-1, -0.5, -0.0001, 0.0001, 0.5, 1],
                                outputRange: ['0deg', '0deg', '35deg', '-35deg', '0deg', '0deg']
                            })
                        }
                    ]
                }}
            >
                <Svg
                    width={knobSize}
                    height={(knobSize * 100) / 57}
                    viewBox={`0 0 57 100`}
                    style={{ transform: [{ translateY: 8 }] }}
                >
                    <Path
                        d="M28.034,0C12.552,0,0,12.552,0,28.034S28.034,100,28.034,100s28.034-56.483,28.034-71.966S43.517,0,28.034,0z   M28.034,40.477c-6.871,0-12.442-5.572-12.442-12.442c0-6.872,5.571-12.442,12.442-12.442c6.872,0,12.442,5.57,12.442,12.442  C40.477,34.905,34.906,40.477,28.034,40.477z"
                        fill={knobFill}
                    />
                </Svg>
            </Animated.View>
        );
    };

    _renderWinner = () => {
        if (this.state.winner == 'ZONK') {
            Alert.alert(`Sorry you got nothing, better luck next time`, "", [{ text: 'Ok', onPress: this._handleAlertPress }])
        } else {
            this._updateScore();
        }
    };

    _renderSvgWheel = () => {
        return (
            <View style={styles.container}>
                <RNText style={{ fontWeight: 'bold', fontSize: 25, color: "#fff" }}>Test your luck !</RNText>
                {this._renderKnob()}
                <Animated.View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        borderRadius: 200,
                        borderWidth: 3,
                        borderColor: '#fff',
                        transform: [
                            {
                                rotate: this._angle.interpolate({
                                    inputRange: [-oneTurn, 0, oneTurn],
                                    outputRange: [`-${oneTurn}deg`, `0deg`, `${oneTurn}deg`]
                                })
                            }
                        ]
                    }}
                >
                    <Svg
                        width={wheelSize}
                        height={wheelSize}
                        viewBox={`0 0 ${width} ${width}`}
                        style={{ transform: [{ rotate: `-${angleOffset}deg` }] }}
                    >
                        <G y={width / 2} x={width / 2}>
                            {this._wheelPaths.map((arc, i) => {
                                const [x, y] = arc.centroid;
                                const number = arc.value.toString();

                                return (
                                    <G key={`arc-${i}`}>
                                        <Path d={arc.path} fill={arc.color} />
                                        <G
                                            rotation={(i * oneTurn) / numberOfSegments + angleOffset}
                                            origin={`${x}, ${y}`}
                                        >
                                            <Text
                                                x={x}
                                                y={y - 70}
                                                fill="white"
                                                textAnchor="middle"
                                                fontSize={fontSize}
                                            >
                                                {Array.from({ length: number.length }).map((_, j) => {
                                                    return (
                                                        <TSpan
                                                            x={x}
                                                            dy={fontSize}
                                                            key={`arc-${i}-slice-${j}`}
                                                        >
                                                            {number.charAt(j)}
                                                        </TSpan>
                                                    );
                                                })}
                                            </Text>
                                        </G>
                                    </G>
                                );
                            })}
                        </G>
                    </Svg>
                </Animated.View>
                <RNText style={{ fontWeight: 'bold', fontSize: 15, color: '#fff' }}>*swipe the wheel to play</RNText>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2ec79c',
        alignItems: 'center',
        justifyContent: 'center'
    },
    winnerText: {
        fontSize: 20,
        position: 'absolute',
        fontWeight: 'bold',
        color: '#fff',
        bottom: 30
    }
});