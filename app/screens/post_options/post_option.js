// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    StyleSheet,
    Text,
    Platform,
    TouchableHighlight,
    TouchableNativeFeedback,
    View,
} from 'react-native';

import copy from 'assets/images/post_menu/copy.png';
import edit from 'assets/images/post_menu/edit.png';
import emoji from 'assets/images/post_menu/emoji.png';
import flag from 'assets/images/post_menu/flag.png';
import link from 'assets/images/post_menu/link.png';
import pin from 'assets/images/post_menu/pin.png';
import trash from 'assets/images/post_menu/trash.png';

const icons = {
    copy,
    edit,
    emoji,
    flag,
    link,
    pin,
    trash,
};

export default class PostOption extends PureComponent {
    static propTypes = {
        destructive: PropTypes.bool,
        icon: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,
        text: PropTypes.string.isRequired,
    };

    render() {
        const {destructive, icon, onPress, text} = this.props;
        const image = icons[icon];

        const Touchable = Platform.select({
            ios: TouchableHighlight,
            android: TouchableNativeFeedback,
        });

        const touchableProps = Platform.select({
            ios: {
                underlayColor: 'rgba(0, 0, 0, 0.05)',
            },
            android: {
                background: TouchableNativeFeedback.Ripple( //eslint-disable-line new-cap
                    'rgba(0, 0, 0, 0.05)',
                    true,
                ),
            },
        });

        return (
            <View style={style.container} >
                <Touchable
                    onPress={onPress}
                    {...touchableProps}
                >
                    <View style={style.row}>
                        <View style={style.icon}>
                            <Image source={image}/>
                        </View>
                        <View style={style.textContainer}>
                            <Text style={[style.text, destructive ? style.destructive : null]}>
                                {text}
                            </Text>
                        </View>
                    </View>
                </Touchable>
                <View style={style.footer}/>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        height: 51,
        width: '100%',
    },
    destructive: {
        color: '#D0021B',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    icon: {
        alignItems: 'center',
        height: 50,
        justifyContent: 'center',
        width: 60,
    },
    textContainer: {
        justifyContent: 'center',
        flex: 1,
        height: 50,
        marginRight: 5,
    },
    text: {
        color: '#000000',
        fontSize: 16,
        lineHeight: 19,
        opacity: 0.9,
        letterSpacing: -0.45,
    },
    footer: {
        height: 1,
        marginLeft: 60,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0 ,0.2)',
    },
});
