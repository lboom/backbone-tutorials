
$(document).ready( function () {

    var Counter = Backbone.Model.extend({
        defaults : {"value" : 0},
        urlRoot : "/counter"
    });
    
    var counterModel1 = new Counter({id : 1});

    Counter.prototype.inc = function () {
        var val = this.get("value");
        this.set("value", val+1);
        this.save();
    }      
    
    counterModel1.fetch();

var CounterView = Backbone.View.extend({
        stamp: '',
        render: function () {
            var val = this.model.get("value");
            var btn = '<button>Increment</button>';
            var syncDate = '<p> Sync event: ' + this.stamp + '</p>';
            this.$el.html('<p>'+val+'</p>' + btn + syncDate);
        },
        initialize: function () {
            this.model.on("change", this.render, this);
            this.model.on("sync", this.syn, this);
        },
        events : {
            'click button' : 'increment'
        },
        increment : function () {
            this.model.inc();
        },
        syn: function() {
            this.stamp = Date.now();
            this.render();
        }
    });
    
    var counterView1 = new CounterView({model : counterModel1});
    
    counterView1.render();
    
    $("#counterdiv").append(counterView1.$el);
    
});
