
/*
jasmine-fixture 1.0.3
Makes injecting HTML snippets into the DOM easy & clean!
site: https://github.com/searls/jasmine-fixture
*/

(function() {
  var createHTMLBlock;

  (function($) {
    var jasmineFixture, originalAffix, originalInject, originalJasmineFixture, root, _;
    root = this;
    originalJasmineFixture = root.jasmineFixture;
    originalInject = root.inject;
    originalAffix = root.affix;
    _ = function(list) {
      return {
        inject: function(iterator, memo) {
          var item, _i, _len, _results;
          _results = [];
          for (_i = 0, _len = list.length; _i < _len; _i++) {
            item = list[_i];
            _results.push(memo = iterator(memo, item));
          }
          return _results;
        }
      };
    };
    root.jasmineFixture = function($) {
      var $whatsTheRootOf, applyAttributes, defaultConfiguration, defaults, init, injectContents, isReady, isString, itLooksLikeHtml, rootId, tidyUp;
      $.fn.affix = root.affix = function(selectorOptions) {
        var $top;
        $top = null;
        _(selectorOptions.split(/[ ](?=[^\]]*?(?:\[|$))/)).inject(function($parent, elementSelector) {
          var $el;
          if (elementSelector === ">") return $parent;
          $el = createHTMLBlock($, elementSelector).appendTo($parent);
          $top || ($top = $el);
          return $el;
        }, $whatsTheRootOf(this));
        return $top;
      };
      $whatsTheRootOf = function(that) {
        if (that.jquery != null) {
          return that;
        } else if ($('#jasmine_content').length > 0) {
          return $('#jasmine_content');
        } else {
          return $('<div id="jasmine_content"></div>').appendTo('body');
        }
      };
      afterEach(function() {
        return $('#jasmine_content').remove();
      });
      isReady = false;
      rootId = "specContainer";
      defaultConfiguration = {
        el: "div",
        cssClass: "",
        id: "",
        text: "",
        html: "",
        defaultAttribute: "class",
        attrs: {}
      };
      defaults = $.extend({}, defaultConfiguration);
      $.jasmine = {
        inject: function(arg, context) {
          var $toInject, config, parent;
          if (isReady !== true) init();
          parent = (context ? context : $("#" + rootId));
          $toInject = void 0;
          if (itLooksLikeHtml(arg)) {
            $toInject = $(arg);
          } else {
            config = $.extend({}, defaults, arg, {
              userString: arg
            });
            $toInject = $("<" + config.el + "></" + config.el + ">");
            applyAttributes($toInject, config);
            injectContents($toInject, config);
          }
          return $toInject.appendTo(parent);
        },
        configure: function(config) {
          return $.extend(defaults, config);
        },
        restoreDefaults: function() {
          return defaults = $.extend({}, defaultConfiguration);
        },
        noConflict: function() {
          root.jasmineFixture = originalJasmineFixture;
          root.inject = originalInject;
          root.affix = originalAffix;
          return this;
        }
      };
      $.fn.inject = function(html) {
        return $.jasmine.inject(html, $(this));
      };
      applyAttributes = function($html, config) {
        var attrs, key, _results;
        attrs = $.extend({}, {
          id: config.id,
          "class": config["class"] || config.cssClass
        }, config.attrs);
        if (isString(config.userString)) {
          attrs[config.defaultAttribute] = config.userString;
        }
        _results = [];
        for (key in attrs) {
          if (attrs[key]) {
            _results.push($html.attr(key, attrs[key]));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };
      injectContents = function($el, config) {
        if (config.text && config.html) {
          throw "Error: because they conflict, you may only configure inject() to set `html` or `text`, not both! \n\nHTML was: " + config.html + " \n\n Text was: " + config.text;
        } else if (config.text) {
          return $el.text(config.text);
        } else {
          if (config.html) return $el.html(config.html);
        }
      };
      itLooksLikeHtml = function(arg) {
        return isString(arg) && arg.indexOf("<") !== -1;
      };
      isString = function(arg) {
        return arg && arg.constructor === String;
      };
      init = function() {
        $("body").append("<div id=\"" + rootId + "\"></div>");
        return isReady = true;
      };
      tidyUp = function() {
        $("#" + rootId).remove();
        return isReady = false;
      };
      $(function($) {
        return init();
      });
      afterEach(function() {
        return tidyUp();
      });
      return $.jasmine;
    };
    if ($) {
      jasmineFixture = root.jasmineFixture($);
      return root.inject = root.inject || jasmineFixture.inject;
    }
  })(jQuery);

  createHTMLBlock = (function() {
    var bindData, bindEvents, parseAttributes, parseClasses, parseContents, parseEnclosure, parseReferences, parseVariableScope, regAttr, regAttrDfn, regAttrs, regCBrace, regClass, regClasses, regData, regDatas, regEvent, regEvents, regExclamation, regId, regReference, regTag, regTagNotContent, regZenTagDfn;
    createHTMLBlock = function($, ZenObject, data, functions, indexes) {
      var ZenCode, arr, block, blockAttrs, blockClasses, blockHTML, blockId, blockTag, blocks, el, el2, els, forScope, indexName, inner, len, obj, origZenCode, paren, result, ret, zc, zo;
      if ($.isPlainObject(ZenObject)) {
        ZenCode = ZenObject.main;
      } else {
        ZenCode = ZenObject;
        ZenObject = {
          main: ZenCode
        };
      }
      origZenCode = ZenCode;
      if (indexes === undefined) indexes = {};
      if (ZenCode.charAt(0) === "!" || $.isArray(data)) {
        if ($.isArray(data)) {
          forScope = ZenCode;
        } else {
          obj = parseEnclosure(ZenCode, "!");
          obj = obj.substring(obj.indexOf(":") + 1, obj.length - 1);
          forScope = parseVariableScope(ZenCode);
        }
        while (forScope.charAt(0) === "@") {
          forScope = parseVariableScope("!for:!" + parseReferences(forScope, ZenObject));
        }
        zo = ZenObject;
        zo.main = forScope;
        el = $();
        if (ZenCode.substring(0, 5) === "!for:" || $.isArray(data)) {
          if (!$.isArray(data) && obj.indexOf(":") > 0) {
            indexName = obj.substring(0, obj.indexOf(":"));
            obj = obj.substr(obj.indexOf(":") + 1);
          }
          arr = ($.isArray(data) ? data : data[obj]);
          zc = zo.main;
          if ($.isArray(arr) || $.isPlainObject(arr)) {
            $.map(arr, function(value, index) {
              var next;
              zo.main = zc;
              if (indexName !== undefined) indexes[indexName] = index;
              if (!$.isPlainObject(value)) {
                value = {
                  value: value
                };
              }
              next = createHTMLBlock($, zo, value, functions, indexes);
              if (el.length !== 0) {
                return $.each(next, function(index, value) {
                  return el.push(value);
                });
              }
            });
          }
          if (!$.isArray(data)) {
            ZenCode = ZenCode.substr(obj.length + 6 + forScope.length);
          } else {
            ZenCode = "";
          }
        } else if (ZenCode.substring(0, 4) === "!if:") {
          result = parseContents("!" + obj + "!", data, indexes);
          if (result !== "undefined" || result !== "false" || result !== "") {
            el = createHTMLBlock($, zo, data, functions, indexes);
          }
          ZenCode = ZenCode.substr(obj.length + 5 + forScope.length);
        }
        ZenObject.main = ZenCode;
      } else if (ZenCode.charAt(0) === "(") {
        paren = parseEnclosure(ZenCode, "(", ")");
        inner = paren.substring(1, paren.length - 1);
        ZenCode = ZenCode.substr(paren.length);
        zo = ZenObject;
        zo.main = inner;
        el = createHTMLBlock($, zo, data, functions, indexes);
      } else {
        blocks = ZenCode.match(regZenTagDfn);
        block = blocks[0];
        if (block.length === 0) return "";
        if (block.indexOf("@") >= 0) {
          ZenCode = parseReferences(ZenCode, ZenObject);
          zo = ZenObject;
          zo.main = ZenCode;
          return createHTMLBlock($, zo, data, functions, indexes);
        }
        block = parseContents(block, data, indexes);
        blockClasses = parseClasses($, block);
        if (regId.test(block)) blockId = regId.exec(block)[1];
        blockAttrs = parseAttributes(block, data);
        blockTag = (block.charAt(0) === "{" ? "span" : "div");
        if (ZenCode.charAt(0) !== "#" && ZenCode.charAt(0) !== "." && ZenCode.charAt(0) !== "{") {
          blockTag = regTag.exec(block)[1];
        }
        if (block.search(regCBrace) !== -1) blockHTML = block.match(regCBrace)[1];
        blockAttrs = $.extend(blockAttrs, {
          id: blockId,
          "class": blockClasses,
          html: blockHTML
        });
        el = $("<" + blockTag + ">", blockAttrs);
        el.attr(blockAttrs);
        el = bindEvents(block, el, functions);
        el = bindData(block, el, data);
        ZenCode = ZenCode.substr(blocks[0].length);
        ZenObject.main = ZenCode;
      }
      if (ZenCode.length > 0) {
        if (ZenCode.charAt(0) === ">") {
          if (ZenCode.charAt(1) === "(") {
            zc = parseEnclosure(ZenCode.substr(1), "(", ")");
            ZenCode = ZenCode.substr(zc.length + 1);
          } else if (ZenCode.charAt(1) === "!") {
            obj = parseEnclosure(ZenCode.substr(1), "!");
            forScope = parseVariableScope(ZenCode.substr(1));
            zc = obj + forScope;
            ZenCode = ZenCode.substr(zc.length + 1);
          } else {
            len = Math.max(ZenCode.indexOf("+"), ZenCode.length);
            zc = ZenCode.substring(1, len);
            ZenCode = ZenCode.substr(len);
          }
          zo = ZenObject;
          zo.main = zc;
          els = $(createHTMLBlock($, zo, data, functions, indexes));
          els.appendTo(el);
        }
        if (ZenCode.charAt(0) === "+") {
          zo = ZenObject;
          zo.main = ZenCode.substr(1);
          el2 = createHTMLBlock($, zo, data, functions, indexes);
          $.each(el2, function(index, value) {
            return el.push(value);
          });
        }
      }
      ret = el;
      return ret;
    };
    bindData = function(ZenCode, el, data) {
      var datas, i, split;
      if (ZenCode.search(regDatas) === 0) return el;
      datas = ZenCode.match(regDatas);
      if (datas === null) return el;
      i = 0;
      while (i < datas.length) {
        split = regData.exec(datas[i]);
        if (split[3] === undefined) {
          $(el).data(split[1], data[split[1]]);
        } else {
          $(el).data(split[1], data[split[3]]);
        }
        i++;
      }
      return el;
    };
    bindEvents = function(ZenCode, el, functions) {
      var bindings, fn, i, split;
      if (ZenCode.search(regEvents) === 0) return el;
      bindings = ZenCode.match(regEvents);
      if (bindings === null) return el;
      i = 0;
      while (i < bindings.length) {
        split = regEvent.exec(bindings[i]);
        if (split[2] === undefined) {
          fn = functions[split[1]];
        } else {
          fn = functions[split[2]];
        }
        $(el).bind(split[1], fn);
        i++;
      }
      return el;
    };
    parseAttributes = function(ZenBlock, data) {
      var attrStrs, attrs, i, parts;
      if (ZenBlock.search(regAttrDfn) === -1) return undefined;
      attrStrs = ZenBlock.match(regAttrDfn);
      attrs = {};
      i = 0;
      while (i < attrStrs.length) {
        parts = regAttr.exec(attrStrs[i]);
        attrs[parts[1]] = "";
        if (parts[3] !== undefined) {
          attrs[parts[1]] = parseContents(parts[3], data);
        }
        i++;
      }
      return attrs;
    };
    parseClasses = function($, ZenBlock) {
      var classes, clsString, i;
      ZenBlock = ZenBlock.match(regTagNotContent)[0];
      if (ZenBlock.search(regClasses) === -1) return undefined;
      classes = ZenBlock.match(regClasses);
      clsString = "";
      i = 0;
      while (i < classes.length) {
        clsString += " " + regClass.exec(classes[i])[1];
        i++;
      }
      return $.trim(clsString);
    };
    parseContents = function(ZenBlock, data, indexes) {
      var html;
      if (indexes === undefined) indexes = {};
      html = ZenBlock;
      if (data === undefined) return html;
      while (regExclamation.test(html)) {
        html = html.replace(regExclamation, function(str, str2) {
          var begChar, fn, val;
          begChar = "";
          if (str.indexOf("!for:") > 0 || str.indexOf("!if:") > 0) return str;
          if (str.charAt(0) !== "!") {
            begChar = str.charAt(0);
            str = str.substring(2, str.length - 1);
          }
          fn = new Function("data", "indexes", "var r=undefined;" + "with(data){try{r=" + str + ";}catch(e){}}" + "with(indexes){try{if(r===undefined)r=" + str + ";}catch(e){}}" + "return r;");
          val = unescape(fn(data, indexes));
          return begChar + val;
        });
      }
      html = html.replace(/\\./g, function(str) {
        return str.charAt(1);
      });
      return unescape(html);
    };
    parseEnclosure = function(ZenCode, open, close, count) {
      var index, ret;
      if (close === undefined) close = open;
      index = 1;
      if (count === undefined) count = (ZenCode.charAt(0) === open ? 1 : 0);
      if (count === 0) return;
      while (count > 0 && index < ZenCode.length) {
        if (ZenCode.charAt(index) === close && ZenCode.charAt(index - 1) !== "\\") {
          count--;
        } else {
          if (ZenCode.charAt(index) === open && ZenCode.charAt(index - 1) !== "\\") {
            count++;
          }
        }
        index++;
      }
      ret = ZenCode.substring(0, index);
      return ret;
    };
    parseReferences = function(ZenCode, ZenObject) {
      ZenCode = ZenCode.replace(regReference, function(str) {
        var fn;
        str = str.substr(1);
        fn = new Function("objs", "var r=\"\";" + "with(objs){try{" + "r=" + str + ";" + "}catch(e){}}" + "return r;");
        return fn(ZenObject, parseReferences);
      });
      return ZenCode;
    };
    parseVariableScope = function(ZenCode) {
      var forCode, rest, tag;
      if (ZenCode.substring(0, 5) !== "!for:" && ZenCode.substring(0, 4) !== "!if:") {
        return undefined;
      }
      forCode = parseEnclosure(ZenCode, "!");
      ZenCode = ZenCode.substr(forCode.length);
      if (ZenCode.charAt(0) === "(") return parseEnclosure(ZenCode, "(", ")");
      tag = ZenCode.match(regZenTagDfn)[0];
      ZenCode = ZenCode.substr(tag.length);
      if (ZenCode.length === 0 || ZenCode.charAt(0) === "+") {
        return tag;
      } else if (ZenCode.charAt(0) === ">") {
        rest = "";
        rest = parseEnclosure(ZenCode.substr(1), "(", ")", 1);
        return tag + ">" + rest;
      }
      return undefined;
    };
    regZenTagDfn = /([#\.\@]?[\w-]+|\[([\w-!?=:"']+(="([^"]|\\")+")? {0,})+\]|\~[\w$]+=[\w$]+|&[\w$]+(=[\w$]+)?|[#\.\@]?!([^!]|\\!)+!){0,}(\{([^\}]|\\\})+\})?/i;
    regTag = /(\w+)/i;
    regId = /#([\w-!]+)/i;
    regTagNotContent = /((([#\.]?[\w-]+)?(\[([\w!]+(="([^"]|\\")+")? {0,})+\])?)+)/i;
    regClasses = /(\.[\w-]+)/g;
    regClass = /\.([\w-]+)/i;
    regReference = /(@[\w$_][\w$_\d]+)/i;
    regAttrDfn = /(\[([\w-!]+(="?([^"]|\\")+"?)? {0,})+\])/ig;
    regAttrs = /([\w-!]+(="([^"]|\\")+")?)/g;
    regAttr = /([\w-!]+)(="?(([^"\]]|\\")+)"?)?/i;
    regCBrace = /\{(([^\}]|\\\})+)\}/i;
    regExclamation = /(?:([^\\]|^))!([^!]|\\!)+!/g;
    regEvents = /\~[\w$]+(=[\w$]+)?/g;
    regEvent = /\~([\w$]+)=([\w$]+)/i;
    regDatas = /&[\w$]+(=[\w$]+)?/g;
    regData = /&([\w$]+)(=([\w$]+))?/i;
    return createHTMLBlock;
  })();

}).call(this);

var readFixtures = function() {
  return jasmine.getFixtures().proxyCallTo_('read', arguments);
};

var preloadFixtures = function() {
  jasmine.getFixtures().proxyCallTo_('preload', arguments);
};

var loadFixtures = function() {
  jasmine.getFixtures().proxyCallTo_('load', arguments);
};

var appendLoadFixtures = function() {
  jasmine.getFixtures().proxyCallTo_('appendLoad', arguments);
};

var setFixtures = function(html) {
  jasmine.getFixtures().proxyCallTo_('set', arguments);
};

var appendSetFixtures = function() {
  jasmine.getFixtures().proxyCallTo_('appendSet', arguments);
};

var sandbox = function(attributes) {
  return jasmine.getFixtures().sandbox(attributes);
};

var spyOnEvent = function(selector, eventName) {
  jasmine.JQuery.events.spyOn(selector, eventName);
};

jasmine.getFixtures = function() {
  return jasmine.currentFixtures_ = jasmine.currentFixtures_ || new jasmine.Fixtures();
};

jasmine.Fixtures = function() {
  this.containerId = 'jasmine-fixtures';
  this.fixturesCache_ = {};
  this.fixturesPath = 'spec/javascripts/fixtures';
};

jasmine.Fixtures.prototype.set = function(html) {
  this.cleanUp();
  this.createContainer_(html);
};

jasmine.Fixtures.prototype.appendSet= function(html) {
  this.addToContainer_(html)
}

jasmine.Fixtures.prototype.preload = function() {
  this.read.apply(this, arguments);
};

jasmine.Fixtures.prototype.load = function() {
  this.cleanUp();
  this.createContainer_(this.read.apply(this, arguments));
};

jasmine.Fixtures.prototype.appendLoad = function() {
  this.addToContainer_(this.read.apply(this, arguments));
}

jasmine.Fixtures.prototype.read = function() {
  var htmlChunks = [];

  var fixtureUrls = arguments;
  for(var urlCount = fixtureUrls.length, urlIndex = 0; urlIndex < urlCount; urlIndex++) {
    htmlChunks.push(this.getFixtureHtml_(fixtureUrls[urlIndex]));
  }

  return htmlChunks.join('');
};

jasmine.Fixtures.prototype.clearCache = function() {
  this.fixturesCache_ = {};
};

jasmine.Fixtures.prototype.cleanUp = function() {
  jQuery('#' + this.containerId).remove();
};

jasmine.Fixtures.prototype.sandbox = function(attributes) {
  var attributesToSet = attributes || {};
  return jQuery('<div id="sandbox" />').attr(attributesToSet);
};

jasmine.Fixtures.prototype.createContainer_ = function(html) {
  var container;
  if(html instanceof jQuery) {
    container = jQuery('<div id="' + this.containerId + '" />');
    container.html(html);
  } else {
    container = '<div id="' + this.containerId + '">' + html + '</div>'
  }
  jQuery('body').append(container);
};

jasmine.Fixtures.prototype.addToContainer_ = function(html){
  var container = jQuery('body').find('#'+this.containerId).append(html);
  if(!container.length){
    this.createContainer_(html);
  }
}

jasmine.Fixtures.prototype.getFixtureHtml_ = function(url) {
  if (typeof this.fixturesCache_[url] === 'undefined') {
    this.loadFixtureIntoCache_(url);
  }
  return this.fixturesCache_[url];
};

jasmine.Fixtures.prototype.loadFixtureIntoCache_ = function(relativeUrl) {
  var url = this.makeFixtureUrl_(relativeUrl);
  var request = new XMLHttpRequest();
  request.open("GET", url + "?" + new Date().getTime(), false);
  request.send(null);
  this.fixturesCache_[relativeUrl] = request.responseText;
};

jasmine.Fixtures.prototype.makeFixtureUrl_ = function(relativeUrl){
  return this.fixturesPath.match('/$') ? this.fixturesPath + relativeUrl : this.fixturesPath + '/' + relativeUrl;
};

jasmine.Fixtures.prototype.proxyCallTo_ = function(methodName, passedArguments) {
  return this[methodName].apply(this, passedArguments);
};


jasmine.JQuery = function() {};

jasmine.JQuery.browserTagCaseIndependentHtml = function(html) {
  return jQuery('<div/>').append(html).html();
};

jasmine.JQuery.elementToString = function(element) {
  var domEl = $(element).get(0)
  if (domEl == undefined || domEl.cloneNode)
    return jQuery('<div />').append($(element).clone()).html();
  else
    return element.toString();
};

jasmine.JQuery.matchersClass = {};

(function(namespace) {
  var data = {
    spiedEvents: {},
    handlers:    []
  };

  namespace.events = {
    spyOn: function(selector, eventName) {
      var handler = function(e) {
        data.spiedEvents[[selector, eventName]] = e;
      };
      jQuery(selector).bind(eventName, handler);
      data.handlers.push(handler);
    },

    wasTriggered: function(selector, eventName) {
      return !!(data.spiedEvents[[selector, eventName]]);
    },

    wasPrevented: function(selector, eventName) {
      return data.spiedEvents[[selector, eventName]].isDefaultPrevented();
    },

    cleanUp: function() {
      data.spiedEvents = {};
      data.handlers    = [];
    }
  }
})(jasmine.JQuery);

(function(){
  var jQueryMatchers = {
    toHaveClass: function(className) {
      return this.actual.hasClass(className);
    },

    toHaveCss: function(css){
      for (var prop in css){
        if (this.actual.css(prop) !== css[prop]) return false
      }
      return true
    },

    toBeVisible: function() {
      return this.actual.is(':visible');
    },

    toBeHidden: function() {
      return this.actual.is(':hidden');
    },

    toBeSelected: function() {
      return this.actual.is(':selected');
    },

    toBeChecked: function() {
      return this.actual.is(':checked');
    },

    toBeEmpty: function() {
      return this.actual.is(':empty');
    },

    toExist: function() {
      return $(document).find(this.actual).length;
    },

    toHaveAttr: function(attributeName, expectedAttributeValue) {
      return hasProperty(this.actual.attr(attributeName), expectedAttributeValue);
    },

    toHaveProp: function(propertyName, expectedPropertyValue) {
      return hasProperty(this.actual.prop(propertyName), expectedPropertyValue);
    },

    toHaveId: function(id) {
      return this.actual.attr('id') == id;
    },

    toHaveHtml: function(html) {
      return this.actual.html() == jasmine.JQuery.browserTagCaseIndependentHtml(html);
    },

    toContainHtml: function(html){
      var actualHtml = this.actual.html()
      var expectedHtml = jasmine.JQuery.browserTagCaseIndependentHtml(html)
      return (actualHtml.indexOf(expectedHtml) >= 0)
    },

    toHaveText: function(text) {
      var trimmedText = $.trim(this.actual.text());
      if (text && jQuery.isFunction(text.test)) {
        return text.test(trimmedText);
      } else {
        return trimmedText == text;
      }
    },

    toHaveValue: function(value) {
      return this.actual.val() == value;
    },

    toHaveData: function(key, expectedValue) {
      return hasProperty(this.actual.data(key), expectedValue);
    },

    toBe: function(selector) {
      return this.actual.is(selector);
    },

    toContain: function(selector) {
      return this.actual.find(selector).length;
    },

    toBeDisabled: function(selector){
      return this.actual.is(':disabled');
    },

    toBeFocused: function(selector) {
      return this.actual.is(':focus');
    },

    // tests the existence of a specific event binding
    toHandle: function(eventName) {
      var events = this.actual.data("events");
      return events && events[eventName].length > 0;
    },

    // tests the existence of a specific event binding + handler
    toHandleWith: function(eventName, eventHandler) {
      var stack = this.actual.data("events")[eventName];
      var i;
      for (i = 0; i < stack.length; i++) {
        if (stack[i].handler == eventHandler) {
          return true;
        }
      }
      return false;
    }
  };

  var hasProperty = function(actualValue, expectedValue) {
    if (expectedValue === undefined) {
      return actualValue !== undefined;
    }
    return actualValue == expectedValue;
  };

  var bindMatcher = function(methodName) {
    var builtInMatcher = jasmine.Matchers.prototype[methodName];

    jasmine.JQuery.matchersClass[methodName] = function() {
      if (this.actual
          && (this.actual instanceof jQuery
             || jasmine.isDomNode(this.actual))) {
          this.actual = $(this.actual);
          var result = jQueryMatchers[methodName].apply(this, arguments)
          var element;      	
          if (this.actual.get && (element = this.actual.get()[0]) && !$.isWindow(element) && element.tagName !== "HTML") 
            this.actual = jasmine.JQuery.elementToString(this.actual)
        return result;
      }

      if (builtInMatcher) {
        return builtInMatcher.apply(this, arguments);
      }

      return false;
    };
  };

  for(var methodName in jQueryMatchers) {
    bindMatcher(methodName);
  }
})();

beforeEach(function() {
  this.addMatchers(jasmine.JQuery.matchersClass);
  this.addMatchers({
    toHaveBeenTriggeredOn: function(selector) {
      this.message = function() {
        return [
          "Expected event " + this.actual + " to have been triggered on " + selector,
          "Expected event " + this.actual + " not to have been triggered on " + selector
        ];
      };
      return jasmine.JQuery.events.wasTriggered($(selector), this.actual);
    }
  });
  this.addMatchers({
    toHaveBeenPreventedOn: function(selector) {
      this.message = function() {
        return [
          "Expected event " + this.actual + " to have been prevented on " + selector,
          "Expected event " + this.actual + " not to have been prevented on " + selector
        ];
      };
      return jasmine.JQuery.events.wasPrevented(selector, this.actual);
    }
  });
});

afterEach(function() {
  jasmine.getFixtures().cleanUp();
  jasmine.JQuery.events.cleanUp();
});
window.context = window.describe;
window.xcontext = window.xdescribe;
describe("THI.Routers.Main", function() {

  var router;
  var subject = THI.Routers.Main;
  var views   = THI.Views;

  beforeEach(function() {
    router = new subject();
  });

  describe("rendering pages", function() {
    var view;
    
    beforeEach(function() {
      view = new views.Home();
      view.template = Handlebars.compile("<p class='template-stub'></p>");
      router.container = affix("#page > p.message");
      router._renderPage(view);
    });

    it("emptys out whatever was previously in the container", function() {
      expect(router.container).not.toContain("p.message");
    });

    it("appends the views element to the container", function() {
      expect(router.container).toContain("div > p.template-stub");
    });
  });

  describe("routing", function() {
    beforeEach(function() {
      try {
        Backbone.history.start();
      } catch (e) {
        // whee
      }
      spyOn(router, '_renderPage');
    });

    describe("welcoming the user", function() {
      beforeEach(function() {
        router.navigate("oops/", true);
      });

      it("renders the welcome view", function() {
        expect(router._renderPage).toHaveBeenCalledWith(jasmine.any(views.Home));
      });
    });
  });

});
describe("THI", function() {
  it("exists", function() {
    expect(window.THI).toBeDefined();
  });
});
describe("THI.Views", function() {
  
  var subject = THI.Views;
  
  describe("Page", function() {
    
    var page, pageElement;
    
    beforeEach(function() {
      pageElement = affix("#my-page");
      page = new subject.Page({ el: pageElement });
      page.template = Handlebars.compile("<p class='template-stub'>My Template</p>");
    });
    
    describe("#render", function() {
      beforeEach(function() {
        page.render();        
      });
      
      it("renders a template into the views element", function() {
        expect(pageElement).toContain("p.template-stub");
      });
    });
    
  });
  
});