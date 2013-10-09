(function ($) {

$.fn.printme = function (beforePrint) {
    return this.each(function () {
        var container = $(this);

        var hidden_IFrame = $('<iframe />').attr({
            width: '1px',
            height: '1px',
            display: 'none'
        }).appendTo(container);

        var myIframe = hidden_IFrame.get(0);

        var script_tag = myIframe.contentWindow.document.createElement("script");
        script_tag.type = "text/javascript";
        var script = myIframe.contentWindow.document.createTextNode('function Print(){ window.print(); }');
        script_tag.appendChild(script);

        myIframe.contentWindow.document.write(container.html());
        $.isFunction(beforePrint) && beforePrint(myIframe.contentWindow.document);
        myIframe.contentWindow.document.body.appendChild(script_tag);

        myIframe.contentWindow.Print();
        setTimeout(function (){
            hidden_IFrame.remove();
        }, 1000);
    });
};
})(jQuery);
