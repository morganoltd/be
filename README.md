# Welcome to the PlayNighter documentation!

![LOGO](https://firebasestorage.googleapis.com/v0/b/graminator.appspot.com/o/GAMES%2Fhorizon_forbidden_west%2FZrzut%20ekranu%202023-03-3%20o%2003.35.30.png?alt=media&token=77426b67-18c9-4d5b-912a-3788775bf143)

Here you have access to all the code used in our application. All main code was created by admin [FLaMeREVENGE](https://github.com/FLaMeREVENGE). The repository must be kept private so no one else but team members can access it.

### How to start work?
First, download the [GitHub Desktop](https://desktop.github.com/) apps. It makes it easier to work on our code and make commits, browse branches, save changes in stash, reject changes made, implement changes from other users.

> You will also need a code editor - [Visual Studio Code](https://code.visualstudio.com/)

### What should I do with Github Desktop?
At first you'll notice that our main project is called `main`. This is the branch that will eventually be published on the internet. However, to avoid conflicts, you will work on your own branch:
1. On the [GRAMINATOR](https://github.com/FLaMeREVENGE/GRAMINATOR) repository page, click the green **"<> Code"** button, select the **"Open with Desktop Github"** option
2. Follow the directions and clone the repository to your computer.
3. When you open the **"Current Branch - main"** tab in **"Branches"** select the **"New Branch"** option.
4. Give it a name and choose that the branch should be based on the main branch (usually it does it automatically so you won't have to select it)
5. Finally, you can select **"Open in Visual Studio Code"** and start working

### What is Visual Studio Code?
_VSC_ is a text editor over which you will write your code. The most important thing that VSC has is the terminal inside the program, so you will be able to easily run applications

### Launch applications
When you open VSC with your new branch based on main, you can change every code in every file. We will start by launching the website from the Frontend side:
1. In the root directory of the application (i.e. the folder you cloned to your computer), open the integrated terminal and issue the command:
```
npm install
```

> if you encounter problems for the first time, you may not have `npm` installed globally on your computer.

2. Once you have installed package.json, you can run the application locally:
```
npm run dev
```
the page should appear on the page: [http://localhost:3000/](http://localhost:3000/)

### Launch the API
Now let's move on to the backend. Now it intersects our `graphql` folder:
1. Issue the command in the root directory:
```
nodemon graphql/server.js
```

> if you encounter problems for the first time, you may not have installed `node` and `nodemon` globally on your computer.

2. Your API should be at [http://localhost:4000/graphql](http://localhost:4000/graphql)

### Making changes to the code
Once you start working with the code and make the first changes to it, you can see them in the Github Desktop application under **"Changes"**. What if you decide to commit changes to your branch:
1. You choose which changes in which files you want to send to the source code on Github (selects everything by default)
2. Enter **"Summary"** which is the title of the changes you are making. Possibly also a description.
3. You press the **"Commit to main"** button. And that's how you created your first so-called Commit.
4. However, in order to make changes and send them to the source code, you still need to wash the **"Push origin"** option and only then will you finally make changes

### Other functionalities
Sometimes another user may make changes to a branch, and then if you want to make those changes to your code, you can choose the **"Pull origin"** feature.

### Important information
When you finish your branch, at some point the admin will want to commit your changes from your branch to the main branch. However, remember that **only he can commit these changes to the main branch**.
