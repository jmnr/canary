
/**
 * Let's build an ORM
 * 
 * Part 3 - validate the data
 * 
 * Sometimes before you insert some data in your database you 
 * want to check if the satisfy some kind of model you predefined.
 * 
 * Usually you can reach this task by defining a validation object
 * that defines the type of each key.
 * 
 * E.g.
 */

var validateUser = {
    name: {
        type: 'string',
        required: true
    },
    age: {
        type: 'number'
    }
};

/**
 * This is satisfied if the object passed is:
 */
 
var user_one = {
    name: "Steve",
    age: 54
};

var user_two = {
    name: "Bar",
    age: 25
};

/**
 * In this cases instead the object is rejected:
 */

var user_three = {
    age: "Foo"
};

var user_four = {
    name: 45
};

var user_five = {
    name: "Foo",
    age: "Bar"
};

var toBeChecked = [user_one, user_two, user_three, user_four, user_five];

var validate = function (user, validator) {
    var valKeys = Object.keys(validator);
    
    if (!validator){console.log("Passed with no validation"); return true;}
    
    for (var i = 0; i < valKeys.length; i++) {
        if(validator[valKeys[i]].required && !user[valKeys[i]]){
            console.log("req");
            return false;
        } else if (user[valKeys[i]]) {
            if(typeof user[valKeys[i]] !== validator[valKeys[i]].type) {
                console.log("type");
                return false;
            }
        }
    }
    console.log("match");
    return true;
};

for(var i = 0; i < toBeChecked.length; i++) {
    console.log(validate(toBeChecked[i], validateUser));
}
    
// and so on...