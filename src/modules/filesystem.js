module.exports = {
    updateJSONFile: (fname, properties) => {
        const fs = require('fs');
        // Read the existing JSON data from the file
        fs.readFile(fname, 'utf8', (err, data) => {
          if (err) {
            console.error('Error reading JSON file:', err);
            return;
          }
          try {
            // Parse the JSON data
            const jsonData = JSON.parse(data);
            // Modify the data (for example, update a specific property)
            // jsonData.someProperty = 'Updated Value';
            for(p in properties){
                jsonData[p] = properties[p]
            }
            // Convert the modified data back to JSON
            const updatedData = JSON.stringify(jsonData, null, 2);
            // Write the updated JSON data back to the file
            fs.writeFile(fname, updatedData, 'utf8', (err) => {
              if (err) {
                console.error('Error writing JSON file:', err);
              } else {
                // console.log('JSON file updated successfully.');
              }
            });
          } catch (parseError) {
            console.error('Error parsing JSON data:', parseError);
          }
        });
    }
}