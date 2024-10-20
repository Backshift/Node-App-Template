module.exports = {
    capture_all_with_pattern: function(text, pattern){
        if(text == null){
            return
        }
        // returns text from matched pattern
        const regex = new RegExp(pattern);
        const matches = text.match(regex);
        return matches;
    }
}