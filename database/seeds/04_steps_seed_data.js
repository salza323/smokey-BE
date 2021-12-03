exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('steps')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('steps').insert([
        {
          id: 1,
          recipe_id: '1',
          step_number: '1',
          step_temperature_in_fahrenheit: '275',
          step_instruction:
            'Season pork butt with 50/50 blend kosher salt & 16 mesh caf ground pepper',
        },
        {
          id: 2,
          recipe_id: '1',
          step_number: '2',
          step_temperature_in_fahrenheit: '275',
          step_instruction:
            'Put pork butt in smoker until internal reaches 165',
        },
        {
          id: 3,
          recipe_id: '1',
          step_number: '3',
          step_temperature_in_fahrenheit: '300',
          step_instruction: 'Wrap pork butt in foil, increase temp to 300',
        },
        {
          id: 4,
          recipe_id: '1',
          step_number: '4',
          step_temperature_in_fahrenheit: '0',
          step_instruction:
            'Once internal reaches 205, remove from smoker let rest 1 hour.',
        },
        {
          id: 5,
          recipe_id: '1',
          step_number: '5',
          step_temperature_in_fahrenheit: '0',
          step_instruction: 'Shread and go to town.',
        },
        {
          id: 6,
          recipe_id: '2',
          step_number: '1',
          step_temperature_in_fahrenheit: '250',
          step_instruction:
            'Season brisket with 50/50 blend kosher salt & 16 mesh caf ground pepper',
        },
        {
          id: 7,
          recipe_id: '2',
          step_number: '2',
          step_temperature_in_fahrenheit: '250',
          step_instruction: 'Put in smoker and hope for best',
        },
        {
          id: 8,
          recipe_id: '2',
          step_number: '3',
          step_temperature_in_fahrenheit: '0',
          step_instruction:
            'Remove from smoker at 205 internal temp. Let rest for one hour.',
        },
        {
          id: 9,
          recipe_id: '2',
          step_number: '4',
          step_temperature_in_fahrenheit: '0',
          step_instruction: 'Slice and go to town.',
        },
        {
          id: 10,
          recipe_id: '3',
          step_number: '1',
          step_temperature_in_fahrenheit: '250',
          step_instruction:
            'Season tri tip with 50/50 blend kosher salt & 16 mesh caf ground pepper',
        },
        {
          id: 11,
          recipe_id: '3',
          step_number: '2',
          step_temperature_in_fahrenheit: '250',
          step_instruction: 'Put in smoker and hope for best',
        },
        {
          id: 12,
          recipe_id: '3',
          step_number: '3',
          step_temperature_in_fahrenheit: '0',
          step_instruction:
            'Remove from smoker at 205 internal temp. Let rest for one hour.',
        },
        {
          id: 13,
          recipe_id: '3',
          step_number: '4',
          step_temperature_in_fahrenheit: '0',
          step_instruction: 'Slice and go to town.',
        },
      ]);
    });
};
