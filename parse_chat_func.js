const { identifier } = require("@babel/types");

let sentence_in = "14:24:32 Customer Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent I received it at 12:24:48, ut blandit lectus."

function timeValidation(strTime) {
    var timeFormat = /^(?:1[0-2]|0?[0-9]):[0-5][0-9]\s?(?:am|pm)?/;
    return timeFormat.test(strTime);
}

function validate_sentences(array){
    // remove empty strings
    array = array.filter(e =>  e);

    console.log(array)

    var temp = [],
    i = 0,
    string;
    
    while (i < array.length) {
        temp.push(array.slice(i, i += 2).join(''));
    }

    string = temp.join('|');
    console.log(string);

    return temp;

}

function parse_chat_func(str_in, split_type = "") {

    if (split_type == "date"){
        // split by hours with a regex and mantain it
        new_line_split = str_in.split(/(\d+\:\d+\:\d+\s)/g)
        new_line_split = validate_sentences(new_line_split);
    }else {
        new_line_split = str_in.split('\n');
    }
    
    final_array = [];
    let i = 0;
    // process each line
    for(let line of new_line_split){
        console.log('**'  + line);
        const string_array = line.split(" ");

        // get type param (if customer or simple agent)
        let type = string_array[1].toLowerCase();

        console.log('Type pre:', type);

        // set type
        if (!type.includes('agent') && !type.includes('customer')){
            console.log('ENTER')
            if (i%2==0){
                type = 'customer';
            } else {
                type='agent';
            }
        }

        // get index of ':' symbol in array
        let index_col = string_array.indexOf(':');

        let obj_out = {};

        // generate object
        console.log('Debug;', index_col)
        if (index_col>0){
            obj_out = create_data_srtuct(string_array[0], string_array.slice(0,index_col + 1).join(' '), string_array.slice(index_col +1).join(' ') , type )
        } else{
            obj_out = create_data_srtuct(string_array[0], string_array.slice(0, 2).join(' '), string_array.slice(2).join(' ') , type )
        }
        
        final_array.push(obj_out)

        i++;
    }
    
    return final_array;
}

function create_data_srtuct(date, mention, sentence, type){
    const obj_out = {date:date, mention:mention, sentence:sentence, type:type};
    return obj_out
}

console.log(parse_chat_func(sentence_in,'date'))



module.exports = parse_chat_func;