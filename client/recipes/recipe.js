Template.Recipe.onCreated(function(){
  this.editMode=new ReactiveVar(false);
//   this.editMode.set(false);   
})

Template.Recipe.helpers({
    updateRecipeId: function(){
        return this._id
    },
    editMode:function(){
        return Template.instance().editMode.get();
    }
})

Template.Recipe.events({
    'click .toggle-menu': function(){
        console.log(this.isMenu);
        console.log(this._id);

        Meteor.call("toggleMenuItem",this._id, this.isMenu);
    },
    'click .fa-trash':function(){
        console.log(this._id);

        Meteor.call('deleteRecipe', this._id);
    },
    // 'click .fa-pencil' :function(){
    //     Session.set('editMode',!Session.get('editMode'));

    // }
    'click .fa-pencil' :function(event, template){
        template.editMode.set(!template.editMode.get());

    }
})