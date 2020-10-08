import React, { useState, useEffect, useRef } from 'react'
import { View, Dimensions, Animated, StatusBar } from 'react-native'
import PopUp from './pop_up'

const { width, height } = Dimensions.get('window')

const Navigator = (props) => {
  const [popUpScreen, setPopUpScreen] = useState(null)
  const background = new Animated.Value(0)
  const backgroundRef = useRef(background)
  let popupRef = useRef(React.createRef())

  const { pages } = props
  const initPage = pages.find(page => page.init) || pages[0]

  const scale = backgroundRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.9],
    extrapolate: 'clamp'
  })

  const border = backgroundRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 12],
    extrapolate: 'clamp',
  })

  const animateBackground = (value) => {
    Animated.spring(backgroundRef.current, {
      tension: 68,
      friction: 12,
      toValue: value,
      useNativeDriver: true
    }).start()
  }

  useEffect(() => {
    if (popUpScreen != null) {
      if (popUpScreen.props !== undefined && popUpScreen.props.hideBackground !== undefined && popUpScreen.props.hideBackground) return;
      animateBackground(1)
    } else {
      animateBackground(0)
    }
  }, [popUpScreen])

  present = (name, params = {}) => {
    const presentPage = pages.find(page => page.name === name)
    setPopUpScreen({ name: presentPage.name, props: { ...presentPage.props, ...params } })
  }

  dismiss = (animted = false) => {
    if (animted) {
      popupRef.current.snapTo(height)
    }

    setTimeout(() => {
      setPopUpScreen(null)
    }, animted ? 150 : 0)
    
  }

  renderInitPage = () => {
    return React.createElement(initPage.screen, { ...initPage.props, present, dismiss })
  }

  renderPopUp = () => {
    if (!popUpScreen) {
     return null 
    }

    const page = pages.find(p => p.name === popUpScreen.name)
    const firstSnapPoint = popUpScreen.props.firstSnapPoint ?? 0;

    const renderContent = () => {
      return React.createElement(page.screen, { ...popUpScreen.props, dismiss })
    }

    return (
      <View style={[{ flex: 1, position: 'absolute', top: 0, left: 0 }]}>
        {popUpScreen.props.hideBackground === undefined && (
          <StatusBar backgroundColor={'#000'} animated barStyle="light-content" />
        )}

        <PopUp
          ref={popupRef}
          firstSnapPoint={firstSnapPoint}
          snapPoints={page.snapPoints || [50, height]}
          renderContent={renderContent}
          dismiss={dismiss}
          scrollStyle={page.popupStyle}
        />
      </View>
    )
  }

  return (
    <View style={{ width, height, backgroundColor: '#000' }}>
      <StatusBar backgroundColor={'#fff'} animated barStyle="dark-content" />
      <Animated.View 
        style={{ 
          width, 
          height, 
          overflow: 'hidden',
          transform: [{ scale }],
          backgroundColor: '#fff',
          borderRadius: border
        }}
      >
        {renderInitPage()}
      </Animated.View>
      {renderPopUp()}
    </View>
  )
}

export default Navigator
