
// Load JSON-encoded data from the server using a GET HTTP request //

function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'http://agl-developer-test.azurewebsites.net/people.json', true );
        xobj.onreadystatechange = () => {
                if (xobj.readyState == 4 && xobj.status == "200") {
                    callback(xobj.responseText);
                }
        };
        xobj.send(null);
}

  //Self Invoke functions used and variable allocated to parse JSON string to object
  // created a custom function to get the array of all the cat list and assigned the variable as the parameter.

(function () {
    loadJSON(function(response)
     {
        var list_of_cats = JSON.parse(response);
        cats_array_list(list_of_cats);
    });
})();


function cats_array_list(list_of_cats)
{

     // Get all the gender (male and female) using filter and map functions.
    var gens = list_of_cats.map(function (cat_owner)

      {
          return cat_owner.gender
      }).filter(function (value, index, self)

                        {
                            return self.indexOf(value) === index
                        } );
    // Created loop to select gender for pets
    for (var i = 0; i < gens.length; i++)
    {

            //Create element based on the id
            document.getElementById('results').appendChild(document.createTextNode(gens[i]));
            // Select the list of owners based on gender //
            // Select the list of pets using map function //
            // Select the list of cats and get it's names using the filter function //
            //Sort the names alphabetically of the cats using Reduce function and sort function //
              var pets = list_of_cats.filter(function(cat_owner)
              {
                return cat_owner.gender === gens[i]

              } )
              .map(function(cat_owner)
                {
                    if( cat_owner.pets !== null )

                        return cat_owner.pets.filter(function (pet)

                         {

                           return pet.type === 'Cat'

                         }).map(function (cats_name)

                          {
                            return cats_name.name
                          });

                }).reduce((a, b) => a.concat(b), []).sort();


              // Print the list of cats in alphabetical order //
           Print_List_Of_Cats(pets);
      }
}

function Print_List_Of_Cats(pets) {

	if (pets.length < 1)

   return "No Data Present, Please check the JSON File" /*If no information is present or pets.length is null*/

    var Cats_gender = document.createElement('ul');

        for (var i = 0, l = pets.length; i < l; i++)
         {

            if ( pets[i] !== undefined ) {
                var  final_list_of_cats = document.createElement('li');
                    final_list_of_cats.appendChild(document.createTextNode(pets[i]));
                    Cats_gender.appendChild(final_list_of_cats);
            }

        }
        document.getElementById('results').appendChild(Cats_gender);
}
