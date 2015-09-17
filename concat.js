// concatenate text 

var TextBox = Backbone.Model.extend({
    defaults : {"text" : ''},
    // XXX some sort of text box will provide s
    concat: function(s) {
        var val = this.get("text");
        this.set("text", val + s);
    }
});

var TextView = Backbone.View.extend({
    render: function () {
        var val = this.model.get("text");
        var conBtn = '<button id = "con">Concatenate</button>';
        this.$el.html('<p>' +val+ '</p>' + conBtn);
    },
    initialize: function () {
        this.model.on("change", this.render, this);
    },
    events: {
        'click #con' : 'concatenate';
    },
    concatenate: function () {
        // XXX will need to pass a value to this
        //  grab it from a text box
        this.model.concat();
    }
});
