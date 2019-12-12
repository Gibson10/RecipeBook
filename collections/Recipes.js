import SimpleSchema from 'simpl-schema';


Recipes=new Mongo.Collection('recipes');
Recipes.allow({
    insert:function(userId,doc){
        return !!userId;
    },
    update :function(userId, doc){
        return !!userId;
    },
    remove:function(userId, doc){
    return !!userId;
    }
})


Ingredient=new SimpleSchema({
    name:{
        type:String
    },
    amount:{
        type:String
    },
});
RecipeSchema=new SimpleSchema({
name:{
  type:String,
  label:"Name"
},
description:{
    type:String,
    label:"Description"

},
ingredients: {
    type: Array,
   },
   'ingredients.$':{
    type: Ingredient
   },
   isMenu:{
       type:Boolean,
       defaultValue:false,
       optional:true,
   },
author: {
    type:String,
    label: "Author",
    autoValue:function(){
        return this.userId
    }
    },
createdAt:{
    type:Date,
    label:"Created At",
    autoValue:function(){
            return new Date()
        }
    },

});


Meteor.methods({
    toggleMenuItem:function(id,currentState){
        Recipes.update(id,{
            $set:{isMenu: !currentState}
        });
    },
    deleteRecipe:function(id){
        Recipes.remove(id);
    }
})

Recipes.attachSchema(RecipeSchema);