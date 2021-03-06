(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("React")) : factory(root["React"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	var React = __webpack_require__(1);
	var Header = __webpack_require__(2);
	var Table = __webpack_require__(3);

	var noop = function () {
	};

	var CalendarWidget = React.createClass({displayName: "CalendarWidget",
	    isWithinRange: function (date) {
	        var lowerBound = this.state.range[0];
	        var upperBound = this.state.range[1];

	        return lowerBound <= date && date <= upperBound;
	    },
	    rangeLimitedDate: function (date) {
	        if (date > this.state.range[1]) {
	            date = this.state.range[1];
	        } else if (date < this.state.range[0]) {
	            date = this.state.range[0];
	        }

	        return date;
	    },
	    getInitialState: function () {
	        var today = new Date();
	        var selectedDate = null;
	        var date = today;
	        var range = this.props.range || [];
	        // TODO: Consider if we'll actually need to use new Date(-8640000000000000)
	        range[0] = range[0] || new Date(0);
	        range[1] = range[1] || new Date(8640000000000000);
	        range[0] = new Date(range[0].getFullYear(), range[0].getMonth(), range[0].getDate());
	        range[1] = new Date(range[1].getFullYear(), range[1].getMonth(), range[1].getDate());
	        return {
	            callbacks: {
	                onDaySelect: this.props.onDaySelect || noop
	            },
	            selectedDate: selectedDate,
	            today: today,
	            date: date,
	            range: range
	        }
	    },
	    render: function () {
	        var self = this;
	        var updateDate = function (year, month, day) {
	            var existingYear = self.state.date.getFullYear();
	            var existingMonth = self.state.date.getMonth();
	            var existingDay = self.state.date.getDate();

	            var date = new Date(year == null ? existingYear : year, month == null ? existingMonth : month, day == null ? existingDay : day);
	            date = self.rangeLimitedDate(date);

	            self.setState({
	                date: date
	            });
	        };

	        var resetToToday = function () {
	            self.setState({
	                date: self.state.today
	            });
	        };

	        var onDaySelect = function (date) {
	            if (!self.isWithinRange(date)) {
	                return;
	            }

	            self.setState({
	                date: date,
	                selectedDate: date
	            });
	            self.state.callbacks.onDaySelect(date);
	        };

	        return (
	            React.createElement("div", {style: {textAlign: "center", display:"inline-block", border: "1px solid black"}}, 
	                React.createElement(Header, {date: this.state.date, updateDate: updateDate, resetToToday: resetToToday, 
	                        range: this.state.range}), 
	                React.createElement(Table, {date: this.state.date, today: this.state.today, selectedDate: this.state.selectedDate, 
	                       onDaySelect: onDaySelect, range: this.state.range})
	            )
	        );
	    }
	});

	module.exports = CalendarWidget;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var React = __webpack_require__(1);

	// TODO: Determine where to put the logic to determine if the month navigation button should be disabled / grayed out.
	var Header = React.createClass({displayName: "Header",
	    render: function () {
	        var month = this.props.date.getMonth();
	        var year = this.props.date.getFullYear();

	        var styles = {
	            valid: {
	                cursor: "pointer"
	            },
	            invalid: {
	                color: "#d3d3d3",
	                cursor: "not-allowed"
	            }
	        };

	        var previousYear = this.props.updateDate.bind(this, year - 1, month, null);
	        var previousMonth = this.props.updateDate.bind(this, year, month - 1, null);
	        var nextYear = this.props.updateDate.bind(this, year + 1, month, null);
	        var nextMonth = this.props.updateDate.bind(this, year, month + 1, null);

	        return (
	            React.createElement("div", null, 
	                /* TODO: Add some sort of selection when month / year are clicked? */
	                React.createElement("div", {className: "calendar-year-month", 
	                     style: {backgroundColor: "#0066ff", color: "white", borderBottom: "1px solid black"}}, 
	                    months[month] + " " + year
	                ), 
	                React.createElement("div", {className: "calendar-navigation"}, 
	                    React.createElement("div", {className: "calendar-year-prev", 
	                         style: {display: "inline-block", float: "left", cursor: "pointer", marginLeft: "2px"}, 
	                         onClick: previousYear}, "«"
	                    ), 
	                    React.createElement("div", {className: "calendar-month-prev", 
	                         style: {display: "inline-block", float: "left", cursor: "pointer", marginLeft: "4px"}, 
	                         onClick: previousMonth}, "‹"
	                    ), 

	                    React.createElement("div", {className: "calendar-today", 
	                         onClick: this.props.resetToToday, 
	                         style: {display: "inline-block", cursor: "pointer"}}, 
	                        "Today"
	                    ), 

	                    React.createElement("div", {className: "calendar-year-next", 
	                         style: {display: "inline-block", float: "right", cursor: "pointer", marginRight: "2px"}, 
	                         onClick: nextYear}, "»"
	                    ), 

	                    React.createElement("div", {className: "calendar-month-next", 
	                         style: {display: "inline-block", float: "right", cursor: "pointer", marginRight: "4px"}, 
	                         onClick: nextMonth}, "›"
	                    )


	                )
	            )
	        );
	    }
	});

	module.exports = Header;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(1);
	var classNames = __webpack_require__(4);

	// https://cs.uwaterloo.ca/~alopez-o/math-faq/node73.html
	var dayOfWeekForFirstDateInMonth = function (month, year) {
	    var date = new Date(year, month, 1);
	    return date.getDay();
	};

	var styles = {
	    otherMonth: {
	        color: "#d3d3d3"
	    },
	    today: {
	        boxShadow: "inset 0px 0px 1px red",
	        cursor: "pointer"
	    },
	    selected: {
	        backgroundColor: "#ccccff",
	        cursor: "pointer"
	    },
	    default: {
	        cursor: "pointer"
	    },
	    outOfRange: {
	        backgroundColor: "#e3e3e3",
	        cursor: "not-allowed"
	    }
	};

	var Table = React.createClass({displayName: "Table",
	    isWithinRange: function (date) {
	        var lowerBound = this.props.range[0];
	        var upperBound = this.props.range[1];

	        return lowerBound <= date && date <= upperBound;
	    },
	    isToday: function (year, month, day) {
	        var today = this.props.today;
	        return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
	    },
	    isSelected: function (year, month, day) {
	        var selectedDate = this.props.selectedDate;
	        if (!selectedDate) {
	            return false;
	        } else {
	            return selectedDate.getFullYear() === year && selectedDate.getMonth() === month && selectedDate.getDate() === day;
	        }
	    },
	    render: function () {
	        var month = this.props.date.getMonth();
	        var year = this.props.date.getFullYear();
	        var startingDayOfWeek = dayOfWeekForFirstDateInMonth(month, year);
	        var day = 1 - startingDayOfWeek;
	        var tableRows = [];
	        tableRows.push(
	            React.createElement("tr", {key: "daysOfWeek", style: {fontWeight: "bold"}}, 
	                React.createElement("td", {key: "Sunday"}, "S"), 
	                React.createElement("td", {key: "Monday"}, "M"), 
	                React.createElement("td", {key: "Tuesday"}, "T"), 
	                React.createElement("td", {key: "Wednesday"}, "W"), 
	                React.createElement("td", {key: "Thursday"}, "T"), 
	                React.createElement("td", {key: "Friday"}, "F"), 
	                React.createElement("td", {key: "Saturday"}, "S")
	            ));
	        for (var x = 0; x < 6; x++) {
	            var tableCols = [];
	            for (var y = 0; y < 7; y++) {
	                var stylesToApply = ["default"];
	                if (!this.isWithinRange(new Date(year, month, day))) {
	                    stylesToApply.push("outOfRange");
	                }

	                if (this.isToday(year, month, day)) {
	                    stylesToApply.push("today");
	                }

	                if (this.isSelected(year, month, day)) {
	                    stylesToApply.push("selected");
	                }

	                if (new Date(year, month, day).getMonth() !== month) {
	                    stylesToApply.push("otherMonth");
	                }

	                var style = {};
	                for (var styleNumber = 0; styleNumber < stylesToApply.length; styleNumber++) {
	                    var currentStyle = styles[stylesToApply[styleNumber]];
	                    for (var attribute in currentStyle) {
	                        style[attribute] = currentStyle[attribute];
	                    }
	                }

	                var displayDay = new Date(year, month, day).getDate();
	                tableCols.push(React.createElement("td", {key: "col_" + y, 
	                                   className:  classNames({today: this.isToday(year, month, day), selected: this.isSelected(year,month, day)}), 
	                                   style: style, 
	                                   onClick: this.props.onDaySelect.bind(this, new Date(year, month, day))}, displayDay));
	                day++;
	            }
	            tableRows.push(React.createElement("tr", {key: "row_" + x}, tableCols));
	        }
	        return (
	            React.createElement("table", {style: {marginLeft: "auto", marginRight: "auto", textAlign: "center"}}, 
	                React.createElement("tbody", null, 
	                tableRows
	                )
	            )
	        );
	    }
	});

	module.exports = Table;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = '';

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes += ' ' + arg;
				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}

			return classes.substr(1);
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ }
/******/ ])
});
;