# json-quiz

Make your very own custom BuzzFeed style quiz! Just add json!

## Running the example

Take the example quiz yourself to see how it works / what it looks like!

```
npm install
npm start
open http://localhost:3000
```

The example requires node 4.0 or higher. 

There is also a working example at [https://jpc.io/json-quiz](https://jpc.io/json-quiz)

### How does it work?

The entire quiz is driven by a hard-coded example json found in `src/fetchQuizJson.js` - which is the only file that needs to be edited to create a custom quiz.

Each question has a `questions.answers.score` object that controls how many "points" toward a given answer is awarded for choosing that answer. When all the questions have a selected answer, it calculates which answer has the most points and displays that as your result.  

## Changing the example

Likely, you are interested in customizing the quiz to your liking. Luckily, the entire application's structure is configurable with a single json object.

The only code you have to implement yourself is `src/fetchQuizJson.js` - you'll update the existing `FetchQuizJson.fetch` method to resolve a promise of your own quiz! By using promises instead of returning the json directly, it should be flexible whether you want to hard code a quiz (as in the example) or fetch a json document from the web. 

### The structure of the json

The json has following fields:

| Property | Type | Description |
| -------- | ---- | ----------- |
| title | string | The title of the entire quiz (displayed at the top) |
| header_image | string | The link to the background image of the header |
| questions | array | The list of `question` objects |
| questions.text | string | The prompt for the question |
| questions.answers | array | The list of answer options to this question |
| questions.answers.text | string | The text of the answer |
| questions.answers.image | string | The url of an image that represents the answer |
| questions.answers.score | object | An object containing `answer.id` / points awarded mappings |
| answers | array | The list of `answer` objects |
| answers.id | string | The id representing this answer (used for scoring) |
| answers.title | string | The header description for the answer |
| answers.description | string | The body description for the answer (WARNING: may contain html) |

Here is a simple example. Please take some time to examine the structure and make sure it makes sense how each property will be used.

```
{
    'title': 'Find out whether you answer "yes" or "no" to these questions',
    'header_image': 'https://jpc.io/r/YouCantHandle.gif',
    'questions': [
        {
            'text': 'What do you think?',
            'selected_answer': null,
            'answers': [
                {
                    'text': 'Maybe',
                    'image': 'https://jpc.io/r/ThinkingBackAndForth.gif',
                    'score': {
                        'yes': 10,
                        'no': 10
                    }
                },
                {
                    'text': 'No',
                    'image': 'https://jpc.io/r/Nope.gif',
                    'score': {
                        'yes': 0,
                        'no': 10
                    }
                }
            ]
        },
        {
            'text': 'Yes or no?',
            'selected_answer': null,
            'answers': [
                {
                    'text': 'No',
                    'image': 'https://jpc.io/r/No.gif',
                    'score': {
                        'yes': 0,
                        'no': 10
                    }
                },
                {
                    'text': 'Yes',
                    'image': 'https://jpc.io/r/Yesss.gif',
                    'score': {
                        'yes': 10,
                        'no': 0
                    }
                }
            ]
        }
    ],
    'answers': [
        {
            'id': 'yes',
            'title': 'Answer yes',
            'description': 'The yes description.'
        },
        {
            'id': 'no',
            'title': 'Answer no',
            'description': 'The "no" description contains <b>html</b>'
        }
    ]
}
``` 

## Security

WARNING: I've decided to make it possible to inject html into your `answers.description`. I think it makes it more fun to allow people to include images, formatting, and clickable links. 

But this is also dangerous (try adding some spicy salsa to the taco in the [example](https://jpc.io/json-quiz) to see what I mean). Be aware of this and make sure you trust the quiz json that you're consuming! 