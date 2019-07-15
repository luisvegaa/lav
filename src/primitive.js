/**
 * @file [modulo]{@link module:primitive} de Lav que conforma el primitive.
 */
/**
 * @module primitive
 * @desc elementos de Lav.primitive 
 */
(function(global, factoryPrimitive){
	"use strict";
	
	/** @global */
	global.Lav = factoryPrimitive(global);
	
	/** @export */
	if(typeof module === 'object'){
		module.exports = global.Lav;
	}
	
})( ('global', eval)('this'), function( global ){
	"use strict";
	const
		{ Function,
		  Object,
		  Symbol, Buffer,
		  String, Array, Map,
		  Number, Boolean,
		  Promise, Date,
		  Error, TypeError,
		  Math } = global,

		{ slice, push } =  Array.prototype,

		aListTemp = [],

		/** @const {String} */
		sListClasses = "Function|Array|String|Date|Number|Boolean",

		/** @const {String} */
		sPromiseStatus = "pending|resolved|rejected",

		/** @const {RegExp} */
		reStringDivisor = /\|/,

		/**
		 * @function
		 * 
		 * @memberof module:primitive
		 */
		addTemp = vValue =>
			aListTemp.push(vValue) -1,

		/**
		 * @function
		 * 
		 * @memberof module:primitive
		 */
		getTemp = iIndex =>
			aListTemp[iIndex],
			
		/**
		 * @function
		 */
		setTemp = (iIndex, vValue) =>
			( aListTemp[iIndex] = vValue, iIndex ),

		/**
		 * @function
		 */
		removeTemp = (iIndex) =>
			delete aListTemp[iIndex],

		/**
		 * @function
		 *
		 * @memberof module:primitive
		 */
		isInteger = Number.isInteger || function(vValue){
			return typeof vValue === 'number' && 
				isFinite(vValue) && 
				Math.floor(vValue) === vValue;
		},

		/**
		 * @function
		 * @param {value}	valor a comprobar si es función.
		 *
		 * @example
		 * Lav.primitive.isFunction( function(){} )
		 * // return true
		 *
		 * @memberof module:primitive
		 */
		isFunction = (vValue) =>
			typeof vValue === "function",
		
		/**
		 * @function
		 *
		 * @memberof module:primitive
		 */
		isArray = Array.isArray || function(vValue){
			return Object.prototype
				.toString.call(vValue) === '[object Array]';
		},

		/**
		 * @function
		 *
		 * @memberof module:primitive
		 */
		isDate = vValue =>
			vValue instanceof Date,

		/**
		 * @function
		 *
		 * @memberof module:primitive
		 */
		typeString = vValue =>
			typeof vValue === "string",

		/**
		 * @function
		 *
		 * @memberof module:primitive
		 */
		instanceOfString = vValue =>
			vValue instanceof String,

		/**
		 * @function
		 *
		 * @memberof module:primitive
		 */
		isString = vValue =>
			typeString(vValue) || instanceOfString(vValue),

		/**
		 * @function
		 *
		 * @memberof module:primitive
		 */
		instanceOfObject = vValue =>
			vValue instanceof Object,

		/**
		 * @function
		 *
		 * @memberof module:primitive
		 */
		isNull = (vValue) =>
			vValue === null,
		
		/**
		 * @function
		 *
		 * @memberof module:primitive
		 */
		isUndefined = (vValue) =>
			vValue === undefined,

		/**
		 * @function
		 *
		 * @memberof module:primitive
		 */
		isConstructor = (vValue, fnClass) =>
			vValue.constructor === fnClass,
		
		/**
		 * @function
		 *
		 * @memberof module:primitive
		 */
		isInstance = (vValue, fnClass) =>
			vValue instanceof fnClass,

		/**
		 * @function
		 *
		 * @memberof module:primitive
		 */
		isInstanceOrConstructor = (vValue, fnClass) =>
			isInstance(vValue, fnClass) ||
			isConstructor(vValue, fnClass),

		/**
		 * @function
		 *
		 * @memberof module:primitive
		 */
		useConstructor = (vValue, fnClass, bInstanceOf) => {
			if( isNull(vValue) || isUndefined(vValue) ){
				return false;
			}
			
			if( isFunction(fnClass) )
				return bInstanceOf ?
					isInstance(vValue, fnClass) :
					isConstructor(vValue, fnClass);
			
			return true;
		},

		/**
		 * @function
		 *
		 * @memberof module:base
		 */
		isPlainObject = (vValue) =>
			useConstructor(vValue, Object),

		/**
		 * @function
		 *
		 * @memberof module:primitive
		 */
		makeSwitch = function(mOptions){
			return function(sOption, ...aParams){
				var
					vValue =  mOptions.default;
				
				if( sOption in mOptions ){
					vValue = mOptions[sOption];
				}
		
				return isFunction(vValue) ?
					vValue.apply(this, aParams) : vValue;
			};
		},
			
		/**
		 * @function
		 *
		 * @memberof module:primitive
		 */
		valueSwitch = function( ...aParams ){
			var
				mOptions = aParams.pop();
		
			return makeSwitch(mOptions).apply(this, aParams);
		},

		/**
		 * @function
		 *
		 * @memberof module:primitive
		 */
		defineProperty = function(mOptions){
			var
				{ context, key } = mOptions;
			
			if( !instanceOfObject(context) )
				context = this;
			
			return Object.defineProperty(context, key, mOptions);
		},

		/**
		 * @function
		 *
		 * @memberof module:primitive
		 */
		defineProperties = function(mOptions){
			var
				{ context, keys } = mOptions;
			
			if( !instanceOfObject(context) )
				context = this;
			
			Object.defineProperties(context, keys);

			return context;
		},

		/**
		 *
		 * @function
		 * @param {value} prototype
		 * 
		 * @memberof module:primitive
		 */
		createObject = function(vPrototype){
			if( !instanceOfObject(vPrototype) ){
				vPrototype = this;
			}
			
			return Object.create(vPrototype);
		},

		/**
		 * @function
		 *
		 * @memberof module:primitive
		 */
		extend = (vObject, mExtensor) => {
			if( !instanceOfObject(vObject) )
				throw new TypeError("not object");
			
			Object.assign(vObject, mExtensor);

			return vObject;
		},

		/**
		 * @function
		 *
		 * @memberof module:primitive
		 */
		getKeys = (vContext, bAllProperties) => bAllProperties ?
			Object.getOwnPropertyNames(vContext) :
			Object.keys(vContext),

		/**
		 * @function
		 *
		 * @memberof module:primitive
		 */
		getKeyValues = (vContext, bAllProperties) =>
			getKeys(vContext, bAllProperties)
				.map(sKey => ({
					"key": sKey,
					"value": vContext[sKey]
				})),

		/**
		 * @function
		 *
		 * @memberof module:primitive
		 */
		each = (vObject, bKeyTypes, fnCallback) => {
			var aListItems;

			if( isFunction(bKeyTypes) ){
				fnCallback = bKeyTypes;
				bKeyTypes = false;
			}

			aListItems = getKeyValues(vObject, bKeyTypes);

			if(aListItems.length)
				for(let iItem = 0; iItem < aListItems.length;){
					let
						bContinue,
						mItem = aListItems[iItem];
					
					bContinue = fnCallback(mItem.key, mItem.value, vObject);
					
					if( bContinue === false ) break;

					iItem++;
				}

			return vObject;
		},

		/**
		 * 
		 * @function
		 *
		 * @memberof module:primitive
		 */
		map = (aList, fnCallback) => {
			var
				aResults = [];
			
			each(aList, (iKey, vValue) => {
				var
					bResult = fnCallback(vValue, iKey);

				aResults.push(aResults);

				return bResult;
			});

			return aResults;
		},
		
		/**
		 * @function
		 *
		 * @memberof module:primitive
		 */
		extendProperties = (vObject, mExtensor) => {
			var
				mKeys = {};
			
			if( !instanceOfObject(vObject) )
				throw new TypeError("not object");
			
			each(mExtensor, (sKey, vValue) => {
				mKeys[sKey] = {
					"enumerable": true,
					"value": vValue
				};
			});
			
			Object.defineProperties(vObject, mKeys);

			return vObject;
		},

		/**
		 * @function
		 *
		 * @memberof module:primitive
		 */
		MixClass = function(Constructor, ...aFnExtensors){
			class MixClass extends Constructor{
				constructor(...aParams){
					super(...aParams);
				}
			}

			aFnExtensors = aFnExtensors.filter(isFunction);
			aFnExtensors.forEach(fnExtensor => {
				var
					oPrototype = MixClass.prototype;
				
				each(fnExtensor, true, (key, value) => {
					if( isFunction(value) && !MixClass.hasOwnProperty(key) )
						defineProperty({
							"key": key,
							"context": MixClass,
							"value": value
						});
				});
				
				each(fnExtensor.prototype, true, (key, value) => {
					if( isFunction(value) && !oPrototype.hasOwnProperty(key) )
						defineProperty({
							"key": key,
							"context": oPrototype,
							"value": value
						});
				});
			});
		
			return MixClass;
		},

		/**
		 *
		 * @class
		 * @name XBase
		 * 
		 * 
		 */
		XBase = class XBase{

			/**
			 * @method
			 * 
			 * @memberof module:primitive~XBase
			 */
			static getNativeConstructor(vValue){
				var
					sInstanceClass;

				if( isNull(vValue) || isUndefined(vValue) )
					throw new TypeError("type not valid.");

				sInstanceClass = sListClasses
					.split(reStringDivisor)
					.find( sClass =>
						isInstanceOrConstructor(vValue, global[sClass])
					);

				return global[ sInstanceClass ] || Object;
			}

			/**
			 * @method
			 * 
			 * @memberof module:primitive~XBase
			 */
			static isInstance(vValue){
				return vValue instanceof XBase;
			}

			/**
			 * @method
			 * 
			 * @memberof module:primitive~XBase
			 */
			static useMethods(vValue){
				var
					bSubMethod = XBase.isInstance(vValue);

				if( !bSubMethod && useConstructor(vValue) )
					each(XBase.prototype, true, ( sMethod, fnMethod ) => {
						bSubMethod = isFunction(fnMethod) ?
							isFunction( vValue[sMethod] ) : true;
		
						return bSubMethod;
					});

				return bSubMethod;
			}

			/**
			 * @method
			 * 
			 * @memberof module:primitive~XBase
			 */
			static parse(vValue){
				return valueSwitch(typeof vValue, {
					"string": () => new XString(vValue),
					"number": () =>  new XNumber(vValue),
					"boolean": () => new XBoolean(vValue),
					"function": () => new XFunction(vValue),
					"default": () => {
						if( isArray(vValue) ){
							return new XArray(vValue);
						}else if( isDate(vValue) ){
							return new XDate(vValue);
						}

						return vValue;
					}
				});
			}

			/**
			 * @method
			 *
			 * @param {*} value
			 * @param {function} constructor
			 * @param {boolean} useNew
			 * 
			 * @memberof module:primitive~XBase
			 */
			static toNative(vValue, fnClass, bUseNew){
				if( isFunction(vValue) )
					return vValue;
				
				if( isArray(vValue) )
					return slice.call(vValue);

				if( XBase.useMethods(vValue) )
					vValue = vValue.value;

				if( isFunction(fnClass) )
					return bUseNew ?
						new fnClass(vValue) : fnClass(vValue);

				return vValue;
			}

			/**
			 *
			 * @method
			 * 
			 * @param {*} vObject 
			 * @param {*} mExtensor
			 * 
			 * @memberof module:primitive~XBase
			 */
			extend(vObject, mExtensor){
				if( !isPlainObject(mExtensor) ){
					mExtensor = vObject;
					vObject = this;
				}
				
				return extend(vObject, mExtensor);
			}

			/**
			 *
			 * @method
			 * 
			 * @param {list} options 
			 * 
			 * @memberof module:primitive~XBase
			 */
			defineProperty(mOptions){
				delete mOptions.context;
				
				return defineProperty.apply(this, arguments);
			}

			/**
			 *
			 * @method
			 * 
			 * @param {*} vObject 
			 * @param {*} mExtensor 
			 */
			extendProperties(vObject, mExtensor){
				if( !isPlainObject(mExtensor) ){
					mExtensor = vObject;
					vObject = this;
				}
				
				return extendProperties(vObject, mExtensor);
			}
			
			/**
			 *
			 * @method
			 * 
			 * @param {*} mKeys 
			 */
			defineProperties(mKeys){
				var
					mOptions = {};
					
				mOptions.context = this;
				mOptions.keys = mKeys;
				
				return defineProperties(mOptions);
			}
			
			/**
			 * @method
			 * 
			 * @param {*} prototype 
			 */
			createObject(vPrototype){
				return createObject.call(this, vPrototype);
			}
			
			/**
			 * @method
			 * 
			 * @param {boolean} keyTypes 
			 * @param {function} callback 
			 */
			each(bKeyTypes, fnCallback){
				return each(this, bKeyTypes, fnCallback);
			}

			/**
			 * @method
			 *  
			 * @param {*} vMethod 
			 * @param  {...any} aParams 
			 */
			execute(vMethod, ...aParams){
				
				if( isString(vMethod) )
					vMethod = this[vMethod];
				
				if( !isFunction(vMethod) )
					throw new TypeError("metodo no valido");
				
				return XBase.parse( vMethod.apply(this, aParams) );
			}


			/**
			 * @method
			 */
			x( ...aParams ){
				return this.execute( ...aParams );
			}

		},

		/**
		 * Extencion de la clase nativa Function.
		 * Genera Funciones anonimas de contexto global.
		 * 
		 * @class
		 * @name XFunction
		 * 
		 */
		XFunction = class XFunction extends MixClass(Function, XBase){

			/**
			 * 
			 * @param {*} vParam 
			 * @param {String} sScript 
			 * @param {Object} mOptions 
			 */
			constructor(vParam, sScript, mOptions){
				var
					fnCallback,
					aParams = [];

				mOptions = mOptions || {};

				if( isArray(vParam) ){
					aParams = vParam;
				}else if( isString(vParam) ){
					if( !isString(sScript) ){
						sScript = vParam;
					}else{
						aParams = vParam.slipt(",")
					}
				}

				sScript = isString(sScript) ?
					sScript.toString() : "";
				
				fnCallback = isFunction(vParam) ?
					vParam : new Function(aParams, sScript);
				
				super(aParams, `
					var
						self = arguments.callee;
						
					return self.callback.apply(this, arguments);`);

				this.defineProperty({
					"key": "callback",
					"value": fnCallback
				});
			}

		},

		/**
		 * la clase permite crear un Map encapsulado
		 * que se usa para guardar parametros privados.
		 *
		 * @class
		 * @name XCapsule
		 * 
		 */
		XCapsule = class XCapsule extends XFunction{
			
			constructor(){
				var
					fnCapsule,
					mCapsule = new Map,
					aListConstants = [];

				function setter(vKey, vValue, bConst){
					if( aListConstants.indexOf(vKey) >= 0 )
						throw new TypeError("constante ya declarada.");

					if(bConst)
						aListConstants.push(vKey);
					
					mCapsule.set(vKey, vValue);

					return fnCapsule;
				}

				super(function(fnCallback){
					fnCallback.call(this || fnCapsule, fnCapsule);
				});

				fnCapsule = this;

				this.defineProperties({
					"set": {
						"enumerable": true,
						"value": setter
					},
					"get": {
						"enumerable": true,
						"value": vKey => mCapsule.get(vKey)
					},
					"has": {
						"enumerable": true,
						"value": vKey => mCapsule.has(vKey)
					},
				});
			}

			/**
			 * 
			 * @param {*} aParams 
			 * @param {*} sScript 
			 */
			run(aParams, sScript){
				return this(aParams, sScript);
			}
			
			/**
			 * 
			 * @param {*} vKey 
			 * @param {*} vValue 
			 */
			constant(vKey, vValue){
				return this.set(vKey, vValue, true);
			}
		},

		/**
		 * Extencion de la clase nativa Object.
		 * 
		 * @class
		 * @name XObject
		 * 
		 */
		XObject = class XObject extends XBase{

			constructor(mExtensor){
				super();
				XObject.initializarObject(this, mExtensor);
			}

			static initializarObject(oContext, mExtensor){
				if( !oContext.capsule ){
					defineProperty({
						"context": oContext,
						"key": "capsule",
						"value": new XCapsule
					});
					
					if( isPlainObject(mExtensor) ){
						extend(oContext, mExtensor);
					}
				}
			}

		},

		/**
		 * Extencion de la clase nativa Array.
		 * 
		 * @class
		 * @name XArray
		 * 
		 */
		XArray = class XArray extends MixClass(Array, XBase){

			constructor(vValue){
				super();

				if(arguments.length === 1)
					if( isString(vValue) || instanceOfObject(vValue) ){
						this.pushByArray(slice.call(vValue));

						return;
					}

				push.apply(this, arguments);
			}
	
			get(vKey){
				vKey = Number(vKey);
				
				return isInteger(vKey) ?
					this[vKey] : null;
			}

			pushByArray(aList){
				return push.apply(this, aList);
			}

		},

		/**
		 * Extencion de la clase nativa String.
		 * 
		 * @class
		 * @name XString
		 * 
		 */
		XString = class XString extends MixClass(String, XBase, XObject){

			constructor(vValue, bObjectString){
				if(bObjectString){
					vValue = Object.prototype
						.toString.call(vValue);
				}else if( isArray(vValue) ){
					vValue = vValue.join("");
				}
				
				super(vValue);
				this.constructor.initializarObject(this);

				this.capsule.constant("value", vValue);
				this.capsule.constant("initValue", vValue);
			}

			/**
			 * 
			 * @param {String} value 
			 * @param {RegExp} divider 
			 * @param {Number} end 
			 */
			static toArray(sValue, reDivider, iEnd){
				return String(sValue).split(reDivider, iEnd);
			}

			/**
			 * @property {string}
			 */
			static get empty(){
				return "";
			}

			/**
			 * @property {string}
			 */
			get value(){
				return this.capsule.get("value");
			}

			/**
			 * @property {string}
			 */
			get value(){
				return this.capsule.get("initValue");
			}

			equals(vValue){
				return String(this) === String(vValue);
			}
		
			toArray(reDivider, iEnd){
				return XString.toArray(this, reDivider, iEnd);
			}

			test(reTesting){
				return RegExp(reTesting).test(this);
			}
		
		},

		/**
		 * @class
		 * @name XDate
		 */
		XDate = class XDate extends MixClass(Date, XBase){
			constructor( ...aParams ){
				super( ...aParams );
			}



		},

		/**
		 * @class
		 * @name XNumber
		 */
		XNumber = class XNumber extends MixClass(Number, XBase, XObject){
			constructor(vValue){
				super(vValue);

				this.constructor.initializarObject(this);

				this.capsule.constant(value, vValue);
			}

			get value(){
				return this.capsule.get(value);
			}


		},

		/**
		 * @class
		 * @name XBoolean
		 */
		XBoolean = class XBoolean extends MixClass(Boolean, XBase){
			
			constructor(vValue){
				vValue = XBoolean.toNative(vValue);
				super(vValue);
				this.defineProperty({
					"key": value,
					"value": vValue
				});
			}

			static parse(vValue){
				if( vValue instanceof XBoolean )
					vValue = vValue.value;
				
				return Boolean(vValue);
			}

			static toNative(vValue){
				return super.toNative(vValue, Boolean);
			}

			static not(vValue){
				return !super.toNative(vValue, Boolean);
			}

			static isTrue(vValue){
				return vValue === true;
			}

			static isFalse(vValue){
				return vValue === false;
			}

			not(){
				return !this.value;
			}

			or( ...aList ){
				if( !this.value )
					if( aList.find(XBoolean.toNative) )
						return true;

				return this.value;
			}

			and( ...aList ){
				if( this.value )
					return !XBoolean.isFalse( aList.find(XBoolean.not) );

				return this.value;
			}

			nand( ...aParams ){
				return !this.and( ...aParams );
			}

			nor( ...aParams ){
				return !this.or( ...aParams );
			}



			/*xor( ...aParams ){
				var
					bIsValid = true,
					bValue = this.value;
				
				each(aParams, iKey => {
					var
						bParam = this.constructor.parse( aParams[iKey] );
					
					return bIsValid = bValue === bParam;
				});

				return new XBoolean(bIsValid);
			}*/

		},

		/**
		 * @function
		 */
		test = (reValidator, sValue) =>
			isString(sValue) && RegExp(reValidator).test(sValue),

		/**
		 * @function
		 */
		parseBase64 = isFunction(global.atob) ? atob :
			(sValue) => new Buffer
				.from(sValue, 'base64').toString('utf8'),
		
		/**
		 * @function
		 */
		toBase64 = isFunction(global.btoa) ? btoa :
			(sValue) => new Buffer
				.from(sValue, 'utf8').toString('base64'),

		identity = x => x,

		reTypeConstructor = /^\[object (.+)\]$/,
		reActionPromise = /^(all|race|resolve|reject)$/,
		reBase64 =  /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,

		/**
		 * @function
		 */
		isActionPromise = (sAction) =>
			test(reActionPromise, sAction),

		/**
		 * @function
		 */
		isBase64 = (sValue) =>
			test(reBase64, sValue),

		get = "get",
		set = "set",
		key = "key",
		value = "value",
		enumerable = "enumerable",

		mLibraries = new Map,

		keyGet = ["private key Get"],
		keySet = ["private key Set"],
		keyValue = ["private key Value"];

	/**
	 * @function
	 *
	 * @memberof module:primitive
	 */
	function globalEval(sScript){
		return ('fn', global.eval)(sScript);
	}

	/**
	 * @function
	 *
	 * @memberof module:primitive
	 */
	function type(vValue){
		if( isNull(vValue) )
			return "null";

		return typeof vValue;
	}

	/**
	 * @function
	 * @param {value}	valor a comprobar si es boolean.
	 *
	 * @example
	 * Lav.primitive.isBoolean( false )
	 * // return true
	 *
	 * @memberof module:primitive
	 */
	function isBoolean(vValue){
		return typeof vValue === "boolean";
	}

	/**
	 * @function
	 *
	 * @memberof module:primitive
	 */
	function isIgnore(vValue){
		return vValue instanceof LavIgnore;
	}

	/**
	 * @function
	 *
	 * @memberof module:primitive
	 */
	function isGlobal(vValue){
		return vValue === global;
	}

	/**
	 * @function
	 *
	 * @memberof module:primitive
	 */
	function validSelf(oSeft){
		return instanceOfObject(oSeft) &&
			!( isGlobal(oSeft) || isIgnore(oSeft) );
	}

	/**
	 * @function
	 *
	 * @memberof module:primitive
	 */
	function ignoreSelf(oSeft){
		return !validSelf(oSeft);
	}
	
	/**
	 * @function
	 *
	 * @memberof module:base
	 */
	function isPromise(vValue){
		return useConstructor(vValue, Promise);
	}
	
	/**
	 * @function
	 */
	function keyIn(sKey, vValue){
		return sKey in vValue;
	}

	/**
	 * 
	 * @function
	 * @param {string} name
	 * 
	 */
	function require(sName){
		return mLibraries.get(sName);
	}
	
	/**
	 * 
	 * @function
	 * @param {string} name
	 * @param {object} content
	 * 
	 */
	function define(sName, vContent){
		if( !mLibraries.has(sName) )
			mLibraries.set(sName, vContent);
		
		return mLibraries.get(sName);
	}

	/**
	 * 
	 * @function
	 * @param {string} key
	 * @param {value} value
	 * @param {boolean} subMethod
	 * 
	 * @memberof module:primitive
	 */
	function declare(sKey, vValue, bSubMethod){
		var
			oContext = this;
		
		if( !validSelf(oContext) )
			oContext = {};

		if( !isBoolean(bSubMethod) || bSubMethod )
			oContext.declare = declare;

		oContext[sKey] = vValue;

		return oContext;
	}
	
	/**
	 * @function
	 *
	 * @memberof module:primitive
	 */
	function parseArray(vValue, iInit, iEnd){
		vValue = vValue || {};
		
		return slice.call(vValue, iInit, iEnd);
	}
	
	/**
	 * @function
	 *
	 * @memberof module:primitive
	 */
	function parseFunction(vValue){
		return isFunction(vValue) ?
			vValue : identity;
	}
	
	/**
	 * @function
	 */
	function clonePromise(vDefered){
		return new Promise((fnResolve, fnReject) => {
			if( !instanceOfObject(vDefered) )
				throw new TypeError("not valid value."); 

			if( !isFunction(vDefered.then) )
				throw new TypeError(".then not is function.");

			vDefered.then(fnResolve, fnReject);
		});
	}

	/**
	 * @function
	 */
	function parsePromise(vAction, vContent){
		if(vAction)
			if( isFunction(vAction) ){
				return new Promise(vAction);
			}else if( isActionPromise(vAction) ){
				return Promise[vAction](vContent);
			}else{
				return clonePromise(vAction);
			}
		
		return new Promise((fnResolve, fnReject) => {
			if( validSelf(this) ){
				this.fireResolve = fnResolve;
				this.fireReject = fnReject;

				return;
			}

			throw new TypeError("type action or self not valid");
		});
	}
	
	/**
	 * 
	 * @function
	 * @param {value} action
	 * @param {value} content
	 *
	 * @returns {promise} 
	 */
	function promiseStatus(vAction, vContent){
		var
			vValue = null,
			nStatus = 0,
			pDefered = parsePromise
				.call(this, vAction, vContent);

		pDefered
			.then( vResult => ( nStatus = 1, vResult ) )
			.catch( oError => ( nStatus = 2, oError ) )
			.then( vResult => vValue = vResult );

		defineProperties({
			
			"context": pDefered,

			"keys":{

				"value": declare(enumerable, true) 
					.declare(get, () => vValue ),
				
				"status": declare(enumerable, true) 
					.declare(get, () => nStatus ),
	
				"statusText": declare(enumerable, true) 
					.declare(get, () => {
						return new XString(sPromiseStatus)
							.x("toArray", reStringDivisor).get(nStatus);
					}),
		
				"isPending":  declare(enumerable, true)
					.declare(get, () => nStatus === 0 ),
		
				"isResolved": declare(enumerable, true) 
					.declare(get, () => nStatus === 1 ),
		
				"isRejected": declare(enumerable, true) 
					.declare(get, () => nStatus === 2 ),
		
			}
		
		});

		return pDefered;
	}

	/**
	 * @function
	 * @param {array} params	lista de parametros
	 * @param {function} with	funcion a ejecutar
	 * 
	 * @memberof module:primitive
	 */
	function run(aParams, fnWith){
		if( isFunction(aParams) ){
			fnWith = aParams;
			aParams = [];
		}
		
		aParams = new XArray(aParams);
		aParams.push(this);
		
		return parseFunction(fnWith)
			.apply(this, aParams);
	}
	
	/**
	 * 
	 * @class
	 * 
	 */
	class LavPrimitive extends XObject{
		
		constructor(mExtensor){
			super(mExtensor);
		}
		
		/**
		 * @method
		 */
		run(aParams, fnWith){
			return run.apply(this, arguments);
		}
		
	}


	/**
	 * @class
	 */
	class LavEventEmitter extends LavPrimitive{
		
		constructor(oContext, aListEvents){
			const
				mEvents = new Map;
				
			super();
			
			this.capsule(({ set }) => {
				set(keyEvents, mEvents);
				set(keyContext, oContext);
			});
		}
		
		/**
		 * @method
		 */
		on(sEvent, fnListener){
			var
				mEvents = this.capsule.get(keyEvents);
			
			if( !isFunction(fnListener) )
				throw new Error("listener not funcion.");
			
			if( !mEvents.has(sEvent) ){
				mEvents.set(sEvent, []);
			}
			
			mEvents.get(sEvents).push(fnListener);
		}
		
		/**
		 * @method
		 */
		emit(sEvent){
			var
				aParams = parseArray(arguments, 1),
				mEvents = this.capsule.get(keyEvents);
					
			if( !mEvents.has(sEvent) ){
				mEvents.get(sEvent)
					.slice().reverse()
					.forEach( fnListener => {
						fnListener.apply(this.context, aParams);
					});
			}
		}
		
	}
	
	/**
	 * cualquier objeto creado por esta clase, sera ignorado en los metodos dinamicos
	 * 
	 * @class
	 */
	class LavIgnore extends LavPrimitive{
		constructor(mExtensor){
			super(mExtensor);
		}
	}
	
	/**
	 *
	 * @class
	 *
	 * @property {promise} promise
	 */
	class LavDefered extends LavPrimitive{
	
		/**
		 * @constructs
		 * @param {promise|function} action
		 */
		constructor(vAction, vContent){
			var
				pDefered;
				
			super();
			
			pDefered = parsePromise
				.call(this, vAction, vContent);
			
			this.capsule.set(keyPromise, pDefered);
		}
		
		/**
		 * @property {promise}
		 */
		get promise(){
			return this.capsule.get(keyPromise);
		}
		
		/**
		 * @property {defered}
		 */
		get defered(){
			return new LavDefered( this.promise );
		}
		
		/**
		 * @method
		 */
		then(){
			return Promise.prototype
				.then.apply(this.promise, arguments);
		}
		
		/**
		 * @method
		 */
		catch(){
			return Promise.prototype
				.catch.apply(this.promise, arguments);
		}
		
		/**
		 * @method
		 */
		finally(fnOnFinally){
			return this.then(fnOnFinally, fnOnFinally);
		}
		
		/**
		 * @method
		 */
		sub(fnCallback, vContext){
			return LavDefered.sub(this, fnCallback, vContext);
		}
		
		/**
		 * @method
		 * @static
		 */
		static sub(pDefered, fnCallback, vContext){
			return pDefered.then(function(vValue){
				return new Promise( fnCallback.bind(vContext, vValue) );
			});	
		}
	}

	/**
	 * 
	 * @class
	 * 
	 */
	class LavPrimitiveSelector extends LavPrimitive{
		
		constructor(vValue, mOptions){
			mOptions = createObject.call({}, mOptions);
			
			super();
			
			if( !isFunction(mOptions.get) )
				mOptions.get = () => this.value;
				
			if( !isFunction(mOptions.set) )
				mOptions.set = (vValue) =>
					this.value = vValue;
			
			if( !isFunction(Symbol) )
				this.defineProperty({
					"key": Symbol.toPrimitive,
					"value": (sType) =>
						this.get(sType)
				});
				
			this.capsule(({ set, get }) => {
				set(keyGet, mOptions.get);
				set(keySet, mOptions.set);
				set(keyValue, vValue);
			});
		}
		
		/**
		 * @property {value}	value.
		 */
		get value(){
			return this.capsule.get(keyValue);
		}
		
		set value(vValue){
			return this.capsule.set(keyValue, vValue);
		}
		
		/**
		 * @property {boolean}	retorna si es nulo. 
		 */
		get isNull(){
			return isNull(this.value);
		}
		
		/**
		 * @method 
		 */
		get(){
			return this.capsule
				.get(keyGet).apply(this, arguments);
		}
		
		/**
		 * @method 
		 */
		set(){
			this.capsule
				.get(keySet).apply(this, arguments);
			
			return this;
		}
		
		/**
		 * @method
		 */
		equals(vValue){
			return this.value === vValue;
		}
		
	}

	/**
	 * 
	 * @class
	 */
	class LavPrimitiveString extends LavPrimitiveSelector{
		
		constructor(){
			super();
		}
		
		/**
		 * @method
		 */
		toString(){
			return this.value;
		}
		
	}
	
	define("Lav/XFunction", XFunction);
	define("Lav/XCapsule", XCapsule);
	define("Lav/XObject", XObject);
	define("Lav/XArray", XArray);
	define("Lav/XString", XString);
	define("Lav/XDate", XDate);
	define("Lav/XNumber", XNumber);
	define("Lav/Primitive", LavPrimitive);
	define("Lav/Primitive/Ignore", LavIgnore);
	define("Lav/Primitive/Selector", LavPrimitiveSelector);
	define("Lav/Primitive/Selector/String", LavPrimitiveString);

	/**
	 * @class
	 */
	return new class Lav extends LavIgnore{
		
		constructor(){
			super();
		}

		/**
		 * @property {object}
		 * @memberof Lav
		 */
		get temp(){
			return defineProperties({
				"context": new XArray( aListTemp ),
				"keys": {
					"add": declare(value, addTemp),
					"get": declare(value, getTemp),
					"set": declare(value, setTemp),
					"remove": declare(value, removeTemp)
				}
			});
		}

		set temp(vValue){
			return addTemp(vValue);
		}
		
		/**
		 * @property {object}
		 * @memberof Lav
		 */
		get primitive(){
			return new LavIgnore({
				MixClass, XBase,
				XFunction, XObject, XArray, XString, XDate, XNumber, XBoolean,

				LavPrimitive,
				LavPrimitiveSelector,
				LavPrimitiveString,
				LavIgnore,

				get, set, key, value, enumerable,

				addTemp, getTemp, setTemp, removeTemp,
				
				isNull, isUndefined, useConstructor,
				ignoreSelf,

				makeSwitch, valueSwitch,
				
				keyIn,

				clonePromise, parsePromise,
				promiseStatus,

				declare, 
				defineProperties, defineProperty, each, extend,

				isBase64,
				
			});
		}
	
	};
});