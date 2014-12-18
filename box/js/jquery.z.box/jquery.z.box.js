'use strict';
(function($, document, window) {
    var $Z = {};

    /* Init Local Variable $Z.box for box plugin */
    $Z.box = {};

    /* Init Local Variable $Z.box.factory for box plugin factory */
    $Z.box.factory = function(opts) {
        var _self = this;
        _self.options = $.extend($Z.box.factory.config.defaultOptions, opts);
        _self.boxElementsArray = false;

        var _factory = {
            init : function(){
                _factory.initBoxElements();
                _factory.initContent();
            },
            initBoxElements : function(){
                if(typeof $Z.box.factory.config.elements.wrap.element === 'undefined' || !$Z.box.factory.config.elements.wrap.element){
                    _factory.bindBoxElements();
                }
                _factory.initCloseBox();  
            },
            bindBoxElements : function(boxElement, boxParentElement){
                var isBoxElementWrap = false;
                if(typeof boxElement === 'undefined' || !boxElement){
                    boxElement = $Z.box.factory.config.elements.wrap;
                    isBoxElementWrap = true;
                }
                if(typeof boxParentElement === 'undefined' || !boxParentElement){
                    boxParentElement = $('body');
                }
                
                boxElement.settings.id = (boxElement.settings.class + '-' + Math.random() + '').replace('.','');
                boxElement.element = $('<div/>', {
                    id      : boxElement.settings.id,
                    class   : boxElement.settings.class
                });
                if(isBoxElementWrap){
                    boxElement.element.hide();
                }
                boxParentElement.prepend(boxElement.element);
                
                if(typeof boxElement.children !== 'undefined'){
                    for(var i in boxElement.children){
                        var boxChildElement = boxElement.children[i];
                        _factory.bindBoxElements(boxChildElement, boxElement.element);
                    }
                }
                return $Z.box.factory.config.elements;
            },
            bindBoxElementsArray : function(boxElement, boxElementKey, elementsArray){
                if(typeof boxElement === 'undefined' || !boxElement){
                    boxElement = $Z.box.factory.config.elements.wrap;
                }
                if(typeof boxElementKey === 'undefined' || !boxElementKey){
                    boxElementKey = 'wrap';
                }
                if(typeof elementsArray === 'undefined' || !elementsArray){
                    elementsArray = [];
                }
                elementsArray[boxElementKey] = boxElement;
                
                if(typeof boxElement.children !== 'undefined'){
                    for(var i in boxElement.children){
                        var boxChildElement = boxElement.children[i];
                        elementsArray = _factory.bindBoxElementsArray(boxChildElement, i, elementsArray);
                    }
                }
                return elementsArray;
            },
            getBoxElementsArray: function(){
                if(!_self.boxElementsArray){
                    _self.boxElementsArray = _factory.bindBoxElementsArray();
                }
                return _self.boxElementsArray;
            },
            getBoxElement : function(boxKey){
                var boxElementsArray = _factory.getBoxElementsArray();
                if(typeof boxElementsArray[boxKey] === 'undefined'){
                    return null;
                }
                return boxElementsArray[boxKey];
            },
            initCloseBox : function(){
                var _wrapBox = _factory.getBoxElement('wrap');
                if(!_wrapBox || typeof _wrapBox.element === 'undefined'){
                    console.log('Error : box not found');
                    return _self;
                }
                var _buttonClose = _factory.getBoxElement('buttonClose');
                if(!_buttonClose || typeof _buttonClose.element === 'undefined'){
                    console.log('Error : Close button not found');
                    return _self;
                }
                _buttonClose.element.click(function(){
                    if(typeof _self.options.beforeCloseBox === 'function'){
                        _self.options.beforeCloseBox(_self);
                    }
                    _wrapBox.element.hide(_self.options.display.effect);
                    if(typeof _self.options.afterCloseBox === 'function'){
                        _self.options.afterCloseBox(_self);
                    }
                });
                
                var _overlay = _factory.getBoxElement('overlay');
                if(!_overlay || typeof _overlay.element === 'undefined'){
                    console.log('Error : overlay box not found');
                    return _self;
                }
                _overlay.element.click(function(){
                    if(typeof _self.options.beforeCloseBox === 'function'){
                        _self.options.beforeCloseBox(_self);
                    }
                    _wrapBox.element.hide(_self.options.display.effect);
                    if(typeof _self.options.afterCloseBox === 'function'){
                        _self.options.afterCloseBox(_self);
                    }
                });
                
                var _overlayIn = _factory.getBoxElement('overlayIn');
                if(!_overlayIn || typeof _overlayIn.element === 'undefined'){
                    console.log('Error : overlay box not found');
                    return _self;
                }
                _overlayIn.element.click(function(){
                    if(typeof _self.options.beforeCloseBox === 'function'){
                        _self.options.beforeCloseBox(_self);
                    }
                    _wrapBox.element.hide(_self.options.display.effect);
                    if(typeof _self.options.afterCloseBox === 'function'){
                        _self.options.afterCloseBox(_self);
                    }
                });
                return _self;
            },
            initContent : function(){
                var _contentInBox = _factory.getBoxElement('contentWrapIn');
                if(!_contentInBox || typeof _contentInBox.element === 'undefined'){
                    console.log('Error : content box not found');
                    return false;
                }
                switch(_self.options.contentType){
                    case 'html'     : {
                            _contentInBox.element.html(_self.options.content);
                            break;
                    }
                    case 'inline'   : {
                            _contentInBox.element.html(_self.options.content);
                            break;
                    }
                    case 'iframe'   : {
                            _contentInBox.element.html(_self.options.content);
                            break;
                    }
                    case 'ajax'     : {
                            _contentInBox.element.html(_self.options.content);
                            break;
                    }
                    default : {
                            _contentInBox.element.html(_self.options.content);
                            break;
                    }
                }
            },
            open : function(){
                _factory.init();
                _factory.getBoxElement('wrap').element.show(_self.options.display.effect);
                $(document).scrollTop('0');
            },
            close : function(){
                _factory.init();
                _factory.getBoxElement('wrap').element.hide(_self.options.display.effect);
            }
        };
        _factory.open();
        
        /* Public acces methods */
        _self.open = function(){
            _factory.open();
            return _self;
        };
        _self.close = function(){
            _factory.close();
            return _self;
        };
        
        return _self;
    };
    
    
    $Z.box.factory.config = {};
    $Z.box.factory.config.elements = {
        wrap            : {
            settings        : {
                class           : 'zBox-wrap'
            },
            children            : {
                overlay     : {
                    settings        : {
                        class           : 'zBox-overlay'
                    },
                    children        : {
                        overlayIn       : {
                            settings        : {
                                class           : 'zBox-overlay-inner'
                            }
                        }
                    }
                },
                global              : {
                    settings            : {
                        class               : 'zBox-global'
                    },
                    children            : {
                        globalIn              : {
                            settings            : {
                                class               : 'zBox-global-inner'
                            },
                            children            : {
                                titleWrap               : {
                                    settings            : {
                                        class               : 'zBox-title-wrap'
                                    },
                                    children            : {
                                        titleWrapIn           : {
                                            settings            : {
                                                class               : 'zBox-title-wrap-inner'
                                            }
                                        }
                                    }
                                },
                                buttonClose         : {
                                    settings            : {
                                        class               : 'zBox-btn-close'
                                    }
                                },
                                contentWrap         : {
                                    settings            : {
                                        class               : 'zBox-content-wrap'
                                    },
                                    children            : {
                                        contentWrapIn         : {
                                            settings            : {
                                                class               : 'zBox-content-wrap-inner'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    /* Default base config options */
    /* @todo change the structure : reorganize by content types in first level */
    $Z.box.factory.config.defaultOptions = {
        content         : '',//Content URL, HTML, SELECTOR
        contentType     : 'html',//Values : html, inline, iframe, ajax
        display         : {
            effect          : 'fade'//Values : fade | @todo: add more effect
        },
        beforeOpenBox   : function(){},
        afterOpenBox    : function(){},
        beforeCloseBox  : function(){},
        afterCloseBox   : function(){}
    };

    /* Content type html */
    $Z.box.factory.typeHtml = function(opts){
        var _self = this;
        _self.factoryInstance = new $Z.box.factory(opts);
        return _self;
    };

    /* Content type inline */
    $Z.box.factory.typeInline = function(opts){
        var _self = this;
        opts.content = $(opts.content);

        if(typeof opts.contentPlaceHolder === 'undefined' || !opts.contentPlaceHolder){
            opts.contentPlaceHolder = $('<div/>',{
                id      : ('zBox-element-placeholder-' + Math.random()).replace('.',''),
                class   : 'zBox-element-placeholder',
                style   : 'display: none!important'
            });
        }
        opts.content.before(opts.contentPlaceHolder);

        opts.afterCloseBox = function(factory){
            factory.options.contentPlaceHolder.after(factory.options.content);
        };

        _self.factoryInstance = new $Z.box.factory(opts);
        return _self;
    };

    /* Content type iframe */
    $Z.box.factory.typeIframe = function(opts){
        var _self = this;
        var iframe = $('<iframe/>',{
            id      : ('zBox-iframe-' + Math.random()).replace('.',''),
            class   : 'zBox-iframe',
            src     : opts.content,
            style   : 'border: 0;width: 100%'
        });
        opts.content = iframe;

        _self.factoryInstance = new $Z.box.factory(opts);
        return _self;
    };

    /* Content type ajax */
    $Z.box.factory.typeAjax = function(opts){
        var _self = this;
        $.ajax({
            url     : opts.content,
            success : function(data){
                opts.content = data;
                _self.factoryInstance = new $Z.box.factory(opts);
            }
        });

        return _self;
    };

    /* Init Global aYaline Plugins Variable $.z  */
    if(typeof $.z === 'undefined'){
        $.z = {};
    }

    /* Init Global aYaline Box Plugin Variable $.z.box  */
    $.z.box = function(opts) {
        switch (opts.contentType){
            case 'html' : {
                return new $Z.box.factory.typeHtml(opts);
            }
            case 'inline' : {
                return new $Z.box.factory.typeInline(opts);
            }
            case 'iframe' : {
                return new $Z.box.factory.typeIframe(opts);
            }
            case 'ajax' : {
                return new $Z.box.factory.typeAjax(opts);
            }
            default : {
                return new $Z.box.factory.typeHtml(opts);
            }
        }
        return this;
    }
    
    /* Alias zBox*/
    $.zBox = $.z.box;

    /* Init Global aYaline jQuery Plugins Variable $.fn.z  */
    if(typeof $.fn.z === 'undefined'){
        $.fn.z = {};
    }

    /* Init Global aYaline jQuery Plugins Variable $.fn.z  */
    $.fn.z.box = function(opts){
        /* @todo: add code here */
        return this;
    };

})(jQuery, document, window) ;