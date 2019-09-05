import _classCallCheck from"@babel/runtime/helpers/classCallCheck";import _createClass from"@babel/runtime/helpers/createClass";import _possibleConstructorReturn from"@babel/runtime/helpers/possibleConstructorReturn";import _getPrototypeOf from"@babel/runtime/helpers/getPrototypeOf";import _inherits from"@babel/runtime/helpers/inherits";var _jsxFileName="/Users/mnshkv/develop/opensource/popupNavigation/lib/components/navigation/pop_up.next.js";import React,{Component}from'react';import{Animated,StyleSheet,View,Dimensions,Easing}from'react-native';import{PanGestureHandler,NativeViewGestureHandler,State,TapGestureHandler}from'react-native-gesture-handler';var _Dimensions$get=Dimensions.get('window'),width=_Dimensions$get.width,height=_Dimensions$get.height;var EPSILON=1e-9;var easeIn=Easing.bezier(0.42,0,1,1,EPSILON);var easeOut=Easing.bezier(0,0,0.58,1,EPSILON);var easeInOut=Easing.bezier(0.42,0,0.58,1,EPSILON);var def=Easing.bezier(0.25,0.1,0.25,1,EPSILON);var PopUp=function(_Component){_inherits(PopUp,_Component);function PopUp(props){var _this;_classCallCheck(this,PopUp);_this=_possibleConstructorReturn(this,_getPrototypeOf(PopUp).call(this,props));_this.masterdrawer=React.createRef();_this.drawer=React.createRef();_this.drawerheader=React.createRef();_this.scroll=React.createRef();_this.scrollV=React.createRef();_this._onHeaderHandlerStateChange=function(_ref){var nativeEvent=_ref.nativeEvent;if(nativeEvent.oldState===State.BEGAN){_this._lastScrollY.setValue(0);}_this._onHandlerStateChange({nativeEvent:nativeEvent});};_this.snapTo=function(value){Animated.timing(_this._translateYOffset,{duration:250,toValue:value,easing:def,useNativeDriver:_this.props.nativeDriver}).start(function(){_this.setState({lastSnap:value});});};_this._onHandlerStateChange=function(_ref2){var nativeEvent=_ref2.nativeEvent;if(nativeEvent.oldState===State.ACTIVE){var velocityY=nativeEvent.velocityY,translationY=nativeEvent.translationY;translationY-=_this._lastScrollYValue;var dragToss=0.05;var endOffsetY=_this.state.lastSnap+translationY+dragToss*velocityY;var destSnapPoint=_this.props.snapPoints[0];for(var i=0;i<_this.props.snapPoints.length;i++){var snapPoint=_this.props.snapPoints[i];var distFromSnap=Math.abs(snapPoint-endOffsetY);if(distFromSnap<Math.abs(destSnapPoint-endOffsetY)){destSnapPoint=snapPoint;}}_this.setState({lastSnap:destSnapPoint});_this._translateYOffset.extractOffset();_this._translateYOffset.setValue(translationY);_this._translateYOffset.flattenOffset();_this._dragY.setValue(0);Animated.spring(_this._translateYOffset,{velocity:velocityY,tension:68,friction:12,toValue:destSnapPoint,useNativeDriver:_this.props.nativeDriver}).start(function(){if(_this.state.lastSnap===_this.props.snapPoints[_this.props.snapPoints.length-1]){_this.props.dismiss();}});}};var START=props.snapPoints[0];var AFTER_START=props.snapPoints[1];var END=props.snapPoints[props.snapPoints.length-1];_this.state={lastSnap:END,bounces:props.bounces};_this._lastScrollYValue=props._lastScrollYValue;_this._lastScrollY=props._lastScrollY;_this._onRegisterLastScroll=Animated.event([{nativeEvent:{contentOffset:{y:_this._lastScrollY}}}],{useNativeDriver:props.nativeDriver});_this._lastScrollY.addListener(function(_ref3){var value=_ref3.value;_this._lastScrollYValue=value;if(value<=20){_this.setState({bounces:false});}else{_this.setState({bounces:true});}});_this._dragY=props._dragY;_this._onGestureEvent=Animated.event([{nativeEvent:{translationY:_this._dragY}}],{useNativeDriver:props.nativeDriver});_this._reverseLastScrollY=Animated.multiply(new Animated.Value(-1),_this._lastScrollY);_this._translateYOffset=props._translateYOffset;_this._translateY=Animated.add(_this._translateYOffset,Animated.add(_this._dragY,_this._reverseLastScrollY)).interpolate({inputRange:[START,END],outputRange:[START,END],extrapolate:'clamp'});_this._radius=Animated.add(_this._translateYOffset,Animated.add(_this._dragY,_this._reverseLastScrollY)).interpolate({inputRange:[START,AFTER_START/12],outputRange:[0,props.cornerRadius],extrapolate:'clamp'});return _this;}_createClass(PopUp,[{key:"componentDidMount",value:function componentDidMount(){}},{key:"render",value:function render(){var _this2=this;return React.createElement(TapGestureHandler,{maxDurationMs:100000,ref:this.masterdrawer,maxDeltaY:this.state.lastSnap-this.props.snapPoints[0],__source:{fileName:_jsxFileName,lineNumber:153}},React.createElement(View,{style:{position:'absolute',width:width,height:height,top:0,left:0,right:0,bottom:0},pointerEvents:"box-none",__source:{fileName:_jsxFileName,lineNumber:157}},React.createElement(Animated.View,{style:{width:width,height:height,transform:[{translateY:this._translateY}]},__source:{fileName:_jsxFileName,lineNumber:158}},React.createElement(PanGestureHandler,{ref:this.drawer,simultaneousHandlers:[this.scroll,this.masterdrawer],shouldCancelWhenOutside:false,onGestureEvent:this._onGestureEvent,onHandlerStateChange:this._onHandlerStateChange,__source:{fileName:_jsxFileName,lineNumber:166}},React.createElement(Animated.View,{style:[styles.container,this.props.animateBorder&&{overflow:'hidden',borderTopLeftRadius:this._radius,borderTopRightRadius:this._radius},!this.props.animateBorder&&{overflow:'hidden',borderTopLeftRadius:this.props.cornerRadius,borderTopRightRadius:this.props.cornerRadius}],__source:{fileName:_jsxFileName,lineNumber:172}},React.createElement(NativeViewGestureHandler,{ref:this.scroll,waitFor:this.masterdrawer,simultaneousHandlers:this.drawer,__source:{fileName:_jsxFileName,lineNumber:187}},React.createElement(Animated.ScrollView,{ref:function ref(_ref4){_this2.scrollV=_ref4;},style:this.props.scrollStyle,bounces:this.state.bounces,contentContainerStyle:{minWidth:width,minHeight:height},onScrollBeginDrag:this._onRegisterLastScroll,scrollEventThrottle:16,__source:{fileName:_jsxFileName,lineNumber:191}},this.props.renderContent())))))));}}]);return PopUp;}(Component);export{PopUp as default};PopUp.defaultProps={bounces:true,nativeDriver:true,animateBorder:false,cornerRadius:20};var styles=StyleSheet.create({container:{flex:1},header:{backgroundColor:'red'}});
//# sourceMappingURL=pop_up.next.js.map