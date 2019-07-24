import React, { PureComponent } from 'react'
// import SplashScreen from 'react-native-splash-screen'
import { persist } from '../../index'

class Landing extends PureComponent {
    componentDidMount() {
        persist(this.init)
    }

    init = () => {
        this.props.navigation.navigate('Main')
        // splash come off
        // SplashScreen.hide()
    }

    render() {
        return null
    }
}

export default Landing
