
# WordList

##### WordList is a website for learning a new language, more precisely to help you memorize some words.

##### While you are listening, reading, or watching, some words that you don't know yet will appear, use the website to add these words and revise them.

### [Features](/WordList.txt)

### Stack
    Language: Typescript
    Framework: Next 13
    Styles: Styled-Components
    Database: MongoDB, mongoose, typegoose.
    Queries: Graphql - Apollo
    Global state: Redux
    Authentication: JWT
    Tests: Cypress, vitest, react-testing-library, supertest-graphql
    Linting: Eslint

### Preview
![Authentication](https://github.com/Rafael-Cesario/WordList/assets/88716893/976eecef-e0f1-4e40-b4ac-3d6a470354b7)
![List](https://github.com/Rafael-Cesario/WordList/assets/88716893/74d8a275-5259-4d3e-988e-dfff4c6ee688)
![Home](https://github.com/Rafael-Cesario/WordList/assets/88716893/818e88e5-a434-4084-8c8f-a4947a0e2f4f)
![Wordlist](https://github.com/Rafael-Cesario/WordList/assets/88716893/775ad128-0411-4f18-b285-a7ff54a55b11)
![Question](https://github.com/Rafael-Cesario/WordList/assets/88716893/c2709f85-e8e0-48b5-b37c-1ca4a5a95ff8)




### How to run the project in dev environment
###### You will need mongoDB installed.

##### Clone the repository, and enter the wordList folder

        git clone https://github.com/Rafael-Cesario/WordList
        cd wordList
        
##### There are two folders inside wordList, Frontend and Backend

##### Backend
		cd Backend
		${packageManager} install

##### Inside backend folder create a .env with the following properties
###### This will start mongoDB on localhost
###### SECRET is a string, a SHA256 hash you  can use this link to create a hash: https://emn178.github.io/online-tools/sha256.html
		DATABASE="mongodb://127.0.0.1:27017/WordList"
		SECRET="${secret hash for the jwt Token}"
		
##### Backend is ready
		${packageManager} run dev

##### Frontend
###### Open another terminal instance to run the frontend server.
		cd Frontend
		${packageManager} install

##### Inside the folder we need to create a .env.local with the following property
		//.env.local
		NEXT_PUBLIC_URI_DATABASE="http://localhost:4000/"

##### Frontend is ready
		${packageManager} run dev
