var Counter = Backbone.Model.extend({
    defaults : {"value" : 0}
});

var CounterView = Backbone.View.extend({
    render: function () {
        var val = this.model.get("value");
        var incBtn = '<button id = "inc">Increment</button>';
        var decBtn = '<button id = "dec">Decrement</button>';
        var clBtn = '<button id = "cl">Clear</button>';
        this.$el.html('<p>'+val+'</p>' + incBtn + decBtn + clBtn);
    }
});

// make some globals for testing
var counterModel;
var counterView;
$(document).ready( function () {
    counterModel = new Counter();

    counterView = new CounterView({model : counterModel});
    counterView.render();
    
    counterModel.on("change", function () {
        counterView.render();
    });

    // helper for button handlers
    var changeCounter = function(val) {
        var currVal = counterView.model.get("value");
        counterView.model.set("value", currVal + val);
    }
    
    // event handler increment button
    counterView.$el.on("click","#inc", function () {
        changeCounter(1);
    });

    // event handler decrement button
    counterView.$el.on("click", "#dec", function () {
        var currVal = counterView.model.get("value");
        if (currVal !== 0) {
            changeCounter(-1);
        }
    });

    // event handler clear button
    counterView.$el.on("click", "#cl", function () {
        counterView.model.set("value", 0);
    });
    
    $("#counterdiv").append(counterView.$el);

});
