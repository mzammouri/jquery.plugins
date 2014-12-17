'use strict';
(function($) {
    var $aYa = {};

    /* Init Local Variable $aYa.box for box plugin */
    $aYa.box = {};

    /* Init Local Variable $aYa.box.factory for box plugin factory */
    $aYa.box.factory = function(opts) {
        var _self = this;
        var _options = $.extend({}, $aYa.box.factory.config.defaultOptions, opts);
        var _boxElementsArray = null;

        _self.options = _options;
        _self.boxElementsArray = _boxElementsArray;

        var _factory = {
            init : function(){
                _factory.initBoxElements();
                _factory.initContent();
            },
            initBoxElements : function(){
                if(typeof $aYa.box.factory.config.elements.wrap.element === 'undefined' || !$aYa.box.factory.config.elements.wrap.element){
                    _factory.bindBoxElements();
                }
                _factory.initCloseBox();  
            },
            bindBoxElements : function(boxElement, boxParentElement){
                var isBoxElementWrap = false;
                if(typeof boxElement === 'undefined' || !boxElement){
                    boxElement = $aYa.box.factory.config.elements.wrap;
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
                return $aYa.box.factory.config.elements;
            },
            bindBoxElementsArray : function(boxElement, boxElementKey, elementsArray){
                if(typeof boxElement === 'undefined' || !boxElement){
                    boxElement = $aYa.box.factory.config.elements.wrap;
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
                if(!_boxElementsArray){
                    _boxElementsArray = _factory.bindBoxElementsArray();
                }
                return _boxElementsArray;
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
                    if(typeof _options.beforeCloseBox === 'function'){
                        _options.beforeCloseBox(_self);
                    }
                    _wrapBox.element.hide(_options.display.effect);
                    if(typeof _options.afterCloseBox === 'function'){
                        _options.afterCloseBox(_self);
                    }
                });
                
                var _overlay = _factory.getBoxElement('overlay');
                if(!_overlay || typeof _overlay.element === 'undefined'){
                    console.log('Error : overlay box not found');
                    return _self;
                }
                _overlay.element.click(function(){
                    if(typeof _options.beforeCloseBox === 'function'){
                        _options.beforeCloseBox(_self);
                    }
                    _wrapBox.element.hide(_options.display.effect);
                    if(typeof _options.afterCloseBox === 'function'){
                        _options.afterCloseBox(_self);
                    }
                });
                
                var _overlayIn = _factory.getBoxElement('overlayIn');
                if(!_overlayIn || typeof _overlayIn.element === 'undefined'){
                    console.log('Error : overlay box not found');
                    return _self;
                }
                _overlayIn.element.click(function(){
                    if(typeof _options.beforeCloseBox === 'function'){
                        _options.beforeCloseBox(_self);
                    }
                    _wrapBox.element.hide(_options.display.effect);
                    if(typeof _options.afterCloseBox === 'function'){
                        _options.afterCloseBox(_self);
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
                switch(_options.contentType){
                    case 'html'     : {
                            _contentInBox.element.html(_options.content);
                            break;
                    }
                    case 'inline'   : {
                            _contentInBox.element.html(_options.content);
                            break;
                    }
                    case 'iframe'   : {
                            _contentInBox.element.html(_options.content);
                            break;
                    }
                    case 'ajax'     : {
                            _contentInBox.element.html(_options.content);
                            break;
                    }
                    default : {
                            _contentInBox.element.html(_options.content);
                            break;
                    }
                }
            },
            open : function(){
                _factory.init();
                _factory.getBoxElement('wrap').element.show(_options.display.effect);
                $(document).scrollTop('0');
            },
            close : function(){
                _factory.init();
                _factory.getBoxElement('wrap').element.hide(_options.display.effect);
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
    
    
    $aYa.box.factory.config = {};
    $aYa.box.factory.config.elements = {
        wrap            : {
            settings        : {
                class           : 'ayalinebox-wrap'
            },
            children            : {
                overlay     : {
                    settings        : {
                        class           : 'ayalinebox-overlay'
                    },
                    children        : {
                        overlayIn       : {
                            settings        : {
                                class           : 'ayalinebox-overlay-inner'
                            }
                        }
                    }
                },
                global              : {
                    settings            : {
                        class               : 'ayalinebox-global'
                    },
                    children            : {
                        globalIn              : {
                            settings            : {
                                class               : 'ayalinebox-global-inner'
                            },
                            children            : {
                                titleWrap               : {
                                    settings            : {
                                        class               : 'ayalinebox-title-wrap'
                                    },
                                    children            : {
                                        titleWrapIn           : {
                                            settings            : {
                                                class               : 'ayalinebox-title-wrap-inner'
                                            }
                                        }
                                    }
                                },
                                buttonClose         : {
                                    settings            : {
                                        class               : 'ayalinebox-btn-close'
                                    }
                                },
                                contentWrap         : {
                                    settings            : {
                                        class               : 'ayalinebox-content-wrap'
                                    },
                                    children            : {
                                        contentWrapIn         : {
                                            settings            : {
                                                class               : 'ayalinebox-content-wrap-inner'
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
    $aYa.box.factory.config.defaultOptions = {
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
    $aYa.box.factory.typeHtml = function(opts){
        var _self = this;
        _self.factoryInstance = new $aYa.box.factory(opts);
        return _self;
    };

    /* Content type inline */
    $aYa.box.factory.typeInline = function(opts){
        var _self = this;
        opts.content = $(opts.content);

        if(typeof opts.contentPlaceHolder === 'undefined' || !opts.contentPlaceHolder){
            opts.contentPlaceHolder = $('<div/>',{
                id      : ('ayalinebox-element-placeholder-' + Math.random()).replace('.',''),
                class   : 'ayalinebox-element-placeholder',
                style   : 'display: none!important'
            });
        }
        opts.content.before(opts.contentPlaceHolder);

        opts.afterCloseBox = function(factory){
            factory.options.contentPlaceHolder.after(factory.options.content);
        };

        _self.factoryInstance = new $aYa.box.factory(opts);
        return _self;
    };

    /* Content type iframe */
    $aYa.box.factory.typeIframe = function(opts){
        var _self = this;
        var iframe = $('<iframe/>',{
            id      : ('ayalinebox-iframe-' + Math.random()).replace('.',''),
            class   : 'ayalinebox-iframe',
            src     : opts.content,
            style   : 'border: 0;width: 100%'
        });
        opts.content = iframe;

        _self.factoryInstance = new $aYa.box.factory(opts);
        return _self;
    };

    /* Content type ajax */
    $aYa.box.factory.typeAjax = function(opts){
        var _self = this;
        $.ajax({
            url     : opts.content,
            success : function(data){
                opts.content = data;
                _self.factoryInstance = new $aYa.box.factory(opts);
            }
        });

        return _self;
    };

    /* Init Global aYaline Plugins Variable $.aYaline  */
    if(typeof $.aYaline === 'undefined'){
        $.aYaline = {};
    }

    /* Init Global aYaline Box Plugin Variable $.aYaline.box  */
    $.aYaline.box = function(opts) {
        switch (opts.contentType){
            case 'html' : {
                return new $aYa.box.factory.typeHtml(opts);
            }
            case 'inline' : {
                return new $aYa.box.factory.typeInline(opts);
            }
            case 'iframe' : {
                return new $aYa.box.factory.typeIframe(opts);
            }
            case 'ajax' : {
                return new $aYa.box.factory.typeAjax(opts);
            }
            default : {
                return new $aYa.box.factory.typeHtml(opts);
            }
        }
        return this;
    }

    /* Init Global aYaline jQuery Plugins Variable $.fn.aYaline  */
    if(typeof $.fn.aYaline === 'undefined'){
        $.fn.aYaline = {};
    }

    /* Init Global aYaline jQuery Plugins Variable $.fn.aYaline  */
    $.fn.aYaline.box = function(opts){
        /* @todo: add code here */
        return this;
    };

})(jQuery);