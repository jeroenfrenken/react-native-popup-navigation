import _extends from"@babel/runtime/helpers/extends";import _classCallCheck from"@babel/runtime/helpers/classCallCheck";import _createClass from"@babel/runtime/helpers/createClass";import _possibleConstructorReturn from"@babel/runtime/helpers/possibleConstructorReturn";import _getPrototypeOf from"@babel/runtime/helpers/getPrototypeOf";import _inherits from"@babel/runtime/helpers/inherits";var _jsxFileName="/Users/mnshkv/develop/opensource/popupNavigation/lib/components/navigation/pop_up.js";import React,{Component,useRef}from'react';import{Animated,StyleSheet,View,Dimensions}from'react-native';import{PanGestureHandler,NativeViewGestureHandler,State,TapGestureHandler}from'react-native-gesture-handler';var _Dimensions$get=Dimensions.get('window'),width=_Dimensions$get.width,height=_Dimensions$get.height;export var BottomSheet=function(_Component){_inherits(BottomSheet,_Component);function BottomSheet(props){var _this;_classCallCheck(this,BottomSheet);_this=_possibleConstructorReturn(this,_getPrototypeOf(BottomSheet).call(this,props));_this.masterdrawer=React.createRef();_this.drawer=React.createRef();_this.drawerheader=React.createRef();_this.scroll=React.createRef();_this.scrollV=React.createRef();_this._onHeaderHandlerStateChange=function(_ref){var nativeEvent=_ref.nativeEvent;if(nativeEvent.oldState===State.BEGAN){_this._lastScrollY.setValue(0);}_this._onHandlerStateChange({nativeEvent:nativeEvent});};_this.snapTo=function(value){Animated.spring(_this._translateYOffset,{tension:68,friction:12,toValue:value,useNativeDriver:_this.props.nativeDriver}).start(function(){_this.setState({lastSnap:value});});};_this._onHandlerStateChange=function(_ref2){var nativeEvent=_ref2.nativeEvent;if(nativeEvent.oldState===State.ACTIVE){var velocityY=nativeEvent.velocityY,translationY=nativeEvent.translationY;translationY-=_this._lastScrollYValue;var dragToss=0.05;var endOffsetY=_this.state.lastSnap+translationY+dragToss*velocityY;var destSnapPoint=_this.props.snapPoints[0];for(var i=0;i<_this.props.snapPoints.length;i++){var snapPoint=_this.props.snapPoints[i];var distFromSnap=Math.abs(snapPoint-endOffsetY);if(distFromSnap<Math.abs(destSnapPoint-endOffsetY)){destSnapPoint=snapPoint;}}_this.setState({lastSnap:destSnapPoint});_this._translateYOffset.extractOffset();_this._translateYOffset.setValue(translationY);_this._translateYOffset.flattenOffset();_this._dragY.setValue(0);Animated.spring(_this._translateYOffset,{velocity:velocityY,tension:68,friction:12,toValue:destSnapPoint,useNativeDriver:_this.props.nativeDriver}).start(function(){});setTimeout(function(){if(destSnapPoint>=_this.props.snapPoints[_this.props.snapPoints.length-1]-50){_this.props.dismiss();}},150);}};var START=props.snapPoints[0];var AFTER_START=props.snapPoints[1];var END=props.snapPoints[props.snapPoints.length-1];_this.state={lastSnap:START,bounces:props.bounces};_this._lastScrollYValue=0;_this._lastScrollY=new Animated.Value(0);_this._onRegisterLastScroll=Animated.event([{nativeEvent:{contentOffset:{y:_this._lastScrollY}}}],{useNativeDriver:props.nativeDriver});_this._lastScrollY.addListener(function(_ref3){var value=_ref3.value;_this._lastScrollYValue=value;if(value<=20){_this.setState({bounces:false});}else{_this.setState({bounces:true});}});_this._dragY=new Animated.Value(0);_this._onGestureEvent=Animated.event([{nativeEvent:{translationY:_this._dragY}}],{useNativeDriver:props.nativeDriver});_this._reverseLastScrollY=Animated.multiply(new Animated.Value(-1),_this._lastScrollY);_this._translateYOffset=new Animated.Value(END);_this._translateY=Animated.add(_this._translateYOffset,Animated.add(_this._dragY,_this._reverseLastScrollY)).interpolate({inputRange:[START,END],outputRange:[START,END],extrapolate:'clamp'});_this._radius=Animated.add(_this._translateYOffset,Animated.add(_this._dragY,_this._reverseLastScrollY)).interpolate({inputRange:[START,AFTER_START/2],outputRange:[0,props.corderRadius],extrapolate:'clamp'});return _this;}_createClass(BottomSheet,[{key:"componentDidMount",value:function componentDidMount(){this.snapTo(this.props.snapPoints[0]);}},{key:"render",value:function render(){var _this2=this;return React.createElement(TapGestureHandler,{maxDurationMs:100000,ref:this.masterdrawer,maxDeltaY:this.state.lastSnap-this.props.snapPoints[0],__source:{fileName:_jsxFileName,lineNumber:143}},React.createElement(View,{style:StyleSheet.absoluteFillObject,pointerEvents:"box-none",__source:{fileName:_jsxFileName,lineNumber:147}},React.createElement(Animated.View,{style:{width:width,height:height,transform:[{translateY:this._translateY}]},__source:{fileName:_jsxFileName,lineNumber:148}},React.createElement(PanGestureHandler,{ref:this.drawer,simultaneousHandlers:[this.scroll,this.masterdrawer],shouldCancelWhenOutside:false,onGestureEvent:this._onGestureEvent,onHandlerStateChange:this._onHandlerStateChange,__source:{fileName:_jsxFileName,lineNumber:156}},React.createElement(Animated.View,{style:[styles.container,this.props.animateBorder&&{overflow:'hidden',borderTopLeftRadius:this._radius,borderTopRightRadius:this._radius},!this.props.animateBorder&&{overflow:'hidden',borderTopLeftRadius:this.props.corderRadius,borderTopRightRadius:this.props.corderRadius}],__source:{fileName:_jsxFileName,lineNumber:162}},React.createElement(NativeViewGestureHandler,{ref:this.scroll,waitFor:this.masterdrawer,simultaneousHandlers:this.drawer,__source:{fileName:_jsxFileName,lineNumber:177}},React.createElement(Animated.ScrollView,{ref:function ref(_ref4){_this2.scrollV=_ref4;},style:this.props.scrollStyle,bounces:this.state.bounces,onScrollBeginDrag:this._onRegisterLastScroll,scrollEventThrottle:16,__source:{fileName:_jsxFileName,lineNumber:181}},this.props.renderContent())))))));}}]);return BottomSheet;}(Component);BottomSheet.defaultProps={bounces:true,nativeDriver:true,animateBorder:false,corderRadius:20};var BottomSheetContainer=function(_Component2){_inherits(BottomSheetContainer,_Component2);function BottomSheetContainer(){var _getPrototypeOf2;var _this3;_classCallCheck(this,BottomSheetContainer);for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}_this3=_possibleConstructorReturn(this,(_getPrototypeOf2=_getPrototypeOf(BottomSheetContainer)).call.apply(_getPrototypeOf2,[this].concat(args)));_this3.bottomSheet=React.createRef();_this3.snapTo=function(value){_this3.bottomSheet.snapTo(value);};return _this3;}_createClass(BottomSheetContainer,[{key:"render",value:function render(){var _this4=this;return React.createElement(View,{style:[styles.container,{position:'absolute',top:0,left:0}],__source:{fileName:_jsxFileName,lineNumber:215}},React.createElement(BottomSheet,_extends({ref:function ref(_ref5){_this4.bottomSheet=_ref5;}},this.props,{__source:{fileName:_jsxFileName,lineNumber:216}})));}}]);return BottomSheetContainer;}(Component);export{BottomSheetContainer as default};var styles=StyleSheet.create({container:{flex:1}});
//# sourceMappingURL=pop_up.js.map