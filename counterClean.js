var Counter = Backbone.Model.extend({
    defaults : {"value" : 0},
    inc: function() {
        var val = this.get("value");
        this.set("value", val + 1);       
    },
    dec: function() {
        var val = this.get("value");
        if (val !== 0) {
            this.set("value", val - 1);
        }
    }
});

var CounterView = Backbone.View.extend({
    render: function () {
        var val = this.model.get("value");
        var incBtn = '<button id = "inc">Increment</button>';
        var decBtn = '<button id = "dec">Decrement</button>';
        this.$el.html('<p>'+val+'</p>' + incBtn + decBtn);
    },
    initialize: function () {
        this.model.on("change", this.render, this);
    },
    events : {
        'click #inc' : 'increment',
        'click #dec' : 'decrement'
    },
    increment : function () {
        this.model.inc();
    },
    decrement : function () {
        this.model.dec();
    }
});



$(document).ready( function () {
    var counterModel1 = new Counter();
    var counterModel2 = new Counter();
    
    var counterView1 = new CounterView({model : counterModel1});
    var counterView2 = new CounterView({model : counterModel2});
    
    counterView1.render();
    counterView2.render();
    
    $("#counterdiv").append(counterView1.$el);
    $("#counterdiv").append(counterView2.$el);
});
